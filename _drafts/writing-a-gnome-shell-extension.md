---
layout: post
title: "Writing a GNOME Shell extension"
---

I could not find a good tutorial on how to write a GNOME Shell
extension. There is a so called step by step instruction list on how
to do it, but it has its flaws, including grammar and clearance. As I
wanted to create an extension for my SWE GLib library to show the
current position of some planets, I dug into existing (and working)
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

## Anatomy of an extension

The only thing you actually need is an `init()` function:

    function init(extensionMeta) {
        // Do whatever it takes to initialize your extension,
        // like initializing the translations.

        // Then return the controller object
        return new ExtensionController(extensionMeta);
    }

## Extension controller

So far so good, but what is this extension controller thing? It is an
object which is capable of managing your GNOME Shell extension. Whenever
the extension is loaded, its `enable()` method is called; when the
extension is unloaded, the `disable()` method gets called.

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

This controller will create a new instance of the `PlanetsExtension`
class and add it to the panel’s right side when loaded. Upon
unloading, the extension’s actor gets destroyed (which, as you will
see later, gets created behind the scenes, not directly by us),
together with the extension itself. Also, for safety measures, the
extension is set to `null`.

## The extension

The extension is a bit more tricky, as, for convenience reasons, it
should extend an existing panel widget type.

```
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

## Loading up the extension

Now with all the necessary import lines added:

    const PanelMenu = imports.ui.panelMenu;
    const St = imports.gi.St;
    const Clutter = imports.gi.Clutter;

The only thing to create now is the `metadata.json` file, which
contains compatibility information and, well, some meta data.

    {
        "shell-version": ["3.18"],
        "uuid": "planets@gergely.polonkai.eu",
        "name": "Planets",
        "description": "Display current planet positions"
    }

As soon as this file is ready, you can restart your Shell (press
Alt-F2 and enter the command `r`), and load the extension with
e.g. the GNOME Tweak Tool. You will see the Planets button on the
right. This little label showing the static text “Planets”, however,
is pretty boring, so let’s add some action.