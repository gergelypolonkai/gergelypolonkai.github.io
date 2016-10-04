---
layout:    post
title:     "Emacs package to generate GObject boilerplate"
date:      2016-09-28 15:40:15
tags:      [gnome, development]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Before I started using Vala (and sometimes even after that) I often
needed to generate new classes based
on [GObject](https://developer.gnome.org/gobject/stable/).

If you have ever worked with GObject in C, you know how tedious it can
be. You need a pretty long boilerplate just to register your class,
and, if you want to be introspectable (and readable, actually), your
function names can grow really long.

To overcome this problem back in my ViM days, I used template files,
where I could replace class prefixes and names with a few keyboard
macros. As I never really dug into ViM scripting other than using some
plugins, I never got farther than
that. [Then came Emacs]({% post_url 2014-09-17-nyanmacs %}).

I use Emacs for about two years now very extensively, up to and
including GLib-based development. I tried the template approach, but
it felt to be a really poor experience, especially given that I made
my feet wet with Emacs Lisp. So I dug deeper, and created a package
for that.

![A screenshot of GobGen in action]({{ site_url }}/images/screenshot-gobgen.png)

GobGen has its own buffer with some widgets, a bit similar to
`customize`. You can enter the name of your new object and its parent,
specify some settings. Then you press Generate, and you are presented
with two new buffers, one for the `.c` and another for the `.h`
boilerplate.

There are a lot of things to do, actually. There is already an open
issue for creating a major mode for this buffer, and there are some
minor switches I’d like to add, but it is already usable. You can grab
it from [MELPA](https://melpa.org/#/gobgen) (my first package there;
woo!) or from
my [GitHub account](https://github.com/gergelypolonkai/gobgen.el).
