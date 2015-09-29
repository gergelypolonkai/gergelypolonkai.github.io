---
layout: post
title: "Writing a GNOME Shell extension"
---

I could not find a good tutorial on how to write a GNOME Shell
extension. There is a so called step by step
[instruction list](https://wiki.gnome.org/Projects/GnomeShell/Extensions/StepByStepTutorial)
on how to do it, but it has its flaws, including grammar and clearance.
As I wanted to create an extension for my SWE GLib library to display
the current position of some planets, I dug into existing (and working)
extensions’ source code and made up something. Comments welcome!

---

GNOME Shell extensions are written in JavaScript and are interpreted
by [GJS](https://wiki.gnome.org/action/show/Projects/Gjs). Using
introspected libraries from JavaScript is not a problem for me (see
SWE GLib’s
[Javascript example](https://github.com/gergelypolonkai/swe-glib/blob/master/examples/basic.js);
it’s not beautiful, but it’s working), but wrapping your head around
the Shell’s concept can take some time.

The Shell is a Clutter stage, and all the buttons (including the
top-right “Activities” button) are actors on this stage. You can add
practically anything to the Shell panel that you can add to a Clutter
stage.

The other thing to remember is the lifecycle of a Shell
extension. After calling `init()`, there are two ways forward: you
either use a so called extension controller, or plain old JavaScript
functions `enable()` and `disable()`; I will go on with the former
method for reasons discussed later.

If you are fine with the `enable()`/`disable()` function version, you
can ease your job with the following command:

```
gnome-shell-extension-tool --create-extension
```

This will ask you a few parameters and create the necessary files for
you. On what these parameters should look like, please come with me to
the next section.

## Placement and naming

Extensions reside under `$HOME/.local/share/gnome-shell/extensions`,
where each of them have its own directory. The directory name has to be
unique, of course; to achieve this, they are usually the same as the
UUID of the extension.

The UUID is a string of alphanumeric characters, with some extras added.
Generally, it should match this regular expression:
`^[-a-zA-Z0-9@._]+$`. The convention is to use the form
`extension-name@author-id`, e.g. `Planets@gergely.polonkai.eu`. Please
see
[this link](https://wiki.gnome.org/Projects/GnomeShell/Extensions/UUIDGuidelines)
for some more information about this.

## Anatomy of an extension

Extensions consist of two main parts, `metadata.json` and
`extension.js`.

The `metadata.json` file contains compatibility information and, well,
some meta data:

```json
{
    "shell-version": ["3.18"],
    "uuid": "planets@gergely.polonkai.eu",
    "name": "Planets",
    "description": "Display current planet positions"
}
```

Here, `shell-version` must contain all versions of GNOME Shell that is
known to load and display your extension correctly. You can insert minor
versions here, like I did, or exact version numbers, like `3.18.1`.

In the `extension.js` file, which contains the actual extension code,
the only thing you actually need is an `init()` function:

```javascript
function init(extensionMeta) {
    // Do whatever it takes to initialize your extension, like
    // initializing the translations. However, never do any widget
    // magic here yet.

    // Then return the controller object
    return new ExtensionController(extensionMeta);
}
```

## Extension controller

So far so good, but what is this extension controller thing? It is an
object which is capable of managing your GNOME Shell extension. Whenever
the extension is loaded, its `enable()` method is called; when the
extension is unloaded, you guessed it, the `disable()` method gets
called.

```javascript
function ExtensionController(extensionMeta) {
    return {
        extensionMeta: extensionMeta,
        extension: null,

        enable: function() {
            this.extension = new PlanetsExtension(this.extensionMeta);

            Main.panel.addToStatusArea("planets",
                                       this.extension,
                                       0, "right");
        },

        disable: function() {
            this.extension.actor.destroy();
            this.extension.destroy();

            this.extension = null;
        }
    }
}
```

This controller will create a new instance of the `PlanetsExtension`
class and add it to the panel’s right side when loaded. Upon
unloading, the extension’s actor gets destroyed (which, as you will
see later, gets created behind the scenes, not directly by us),
together with the extension itself. Also, for safety measures, the
extension is set to `null`.

## The extension

The extension is a bit more tricky, as, for convenience reasons, it
should extend an existing panel widget type.

```javascript
function PlanetsExtension(extensionMeta) {
    this._init(extensionMeta);
}

PlanetsExtension.prototype = {
    __proto__ = PanelMenu.Button.prototype,

    _init: function(extensionMeta) {
        PanelMenu.Button.prototype._init.call(this, 0.0);

        this.extensionMeta = extensionMeta;

        this.panelContainer = new St.BoxLayout({style_class: 'panel-box'});
        this.actor.add_actor(this.panelContainer);
        this.actor.add_style_class_name('panel-status-button');

        this.panelLabel = new St.Label({
            text: 'Loading',
            y_align: Clutter.ActorAlign.CENTER
        });

        this.panelContainer.add(this.panelLabel);
    }
};
```

Here we extend the Button class of panelMenu, so we will be able to do
some action upon activate.

The only parameter passed to the parent’s `_init()` function is
`menuAlignment`, with the value `0.0`, which is used to position the
menu arrow. (_Note: I cannot find any documentation on this, but it
seems that with the value `0.0`, a menu arrow is not added._)

The extension class in its current form is capable of creating the
actual panel button displaying the text “Loading” in its center.

## Loading up the extension

Now with all the necessary import lines added:

```javascript
// The PanelMenu module that contains Button
const PanelMenu = imports.ui.panelMenu;
// The St class that contains lots of UI functions
const St = imports.gi.St;
// Clutter, which is used for displaying everything
const Clutter = imports.gi.Clutter;
```

As soon as this file is ready, you can restart your Shell (press
Alt-F2 and enter the command `r`), and load the extension with
e.g. the GNOME Tweak Tool. You will see the Planets button on the
right. This little label showing the static text “Planets”, however,
is pretty boring, so let’s add some action.

## Adding some periodical change

Since the planets’ position continuously change, we should update our
widget every minute or so. Let’s patch our `_init()` a bit:

```javascript
this.last_update = 0;

MainLoop.timeout_add(1, Lang.bind(this, function() {
    this.last_update++;
    this.panelLabel.set_text("Update_count: " + this.last_update);
}))
```

This, of course, needs a new import line for `MainLoop` to become available:

```javascript
const MainLoop = imports.mainloop;
const Lang = imports.lang;
```

Now if you restart your Shell, your brand new extension will increase
its counter every second. This, however, presents some problems.

SWE GLib queries can sometimes be expensive, both in CPU and disk
operations, so updating our widget every second may present problems.
Also, planets don’t go **that** fast. We may update our timeout value
from `1` to `60` or something, but why don’t just give our user a chance
to set it?

## Introducing settings

Getting settings from `GSettings` is barely straightforward, especially
for software installed in a non-GNOME directory (which includes
extensions). To make our lives easier, I copied over a
[convenience library](https://github.com/projecthamster/shell-extension/blob/master/convenience.js)
from the [Hamster project](https://projecthamster.wordpress.com/)’s
extension, originally written by Giovanni Campagna. The relevant
function here is `getSettings()`:

```javascript
/**
 * getSettings:
 * @schema: (optional): the GSettings schema id
 *
 * Builds and return a GSettings schema for @schema, using schema files
 * in extensionsdir/schemas. If @schema is not provided, it is taken from
 * metadata['settings-schema'].
 */
function getSettings(schema) {
    let extension = ExtensionUtils.getCurrentExtension();

    schema = schema || extension.metadata['settings-schema'];

    const GioSSS = Gio.SettingsSchemaSource;

    // check if this extension was built with "make zip-file", and thus
    // has the schema files in a subfolder
    // otherwise assume that extension has been installed in the
    // same prefix as gnome-shell (and therefore schemas are available
    // in the standard folders)
    let schemaDir = extension.dir.get_child('schemas');
    let schemaSource;
    if (schemaDir.query_exists(null))
        schemaSource = GioSSS.new_from_directory(schemaDir.get_path(),
                                                 GioSSS.get_default(),
                                                 false);
    else
        schemaSource = GioSSS.get_default();

    let schemaObj = schemaSource.lookup(schema, true);
    if (!schemaObj)
        throw new Error('Schema ' + schema + ' could not be found for extension '
                        + extension.metadata.uuid + '. Please check your installation.');

    return new Gio.Settings({ settings_schema: schemaObj });
}
```

You can either incorporate this function into your `extension.js` file,
or just use `convenience.js` file like I (and the Hamster applet) did
and import it:

```javascript
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension;
const Convenience = Me.imports.convenience;
```

Now let’s create the settings definition. GSettings schema files are XML
files. We want to add only one settings for now, the refresh interval.

```xml
<?xml version="1.0" encoding="utf-8"?>
<schemalist>
    <schema id="org.gnome.shell.extensions.planets" path="/org/gnome/shell/extensions/planets/">
        <key name="refresh-interval" type="i">
            <default>30</default>
            <summary>Refresh interval of planet data</summary>
            <description>Interval in seconds. Sets how often the planet positions are recalculated. Setting this too low (e.g. below 30) may raise performance issues.</description>
        </key>
    </schema>
</schemalist>
```
you need to compile these settings with

    glib-compile-schemas --strict schemas/

Now let’s utilize this new setting. In the extension’s `_init()`
function, add the following line:

```javascript
this._settings = Convenience.getSettings();
```

And, for `getSettings()` to work correctly, we also need to extend our
`metadata.json` file:

```json
    "settings-schema": "planets"
```

After another restart (please, GNOME guys, add an option to reload
extensions!), your brand new widget will refresh every 30 seconds.

## Displaying the planet positions

## The settings panel

## Start an application
