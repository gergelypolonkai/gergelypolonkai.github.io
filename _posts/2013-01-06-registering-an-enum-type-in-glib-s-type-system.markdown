---
layout:    post
title:     "Registering an enum type in GLib’s type system"
date:      2013-01-06 02:34:03
tags:      [c, development, glib]
permalink: /blog/2013/1/6/registering-an-enum-type-in-glib-s-type-system
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I faced a problem in my [GLib](https://developer.gnome.org/glib/) self-teaching
project, [wMUD](https://github.com/gergelypolonkai/wmud) today. I wanted to
register a signal for a `GObject`, whose handler should accept two `enum`
parameters for which I had to register a new `GEnum` type in the `GObject` type
system. However, the [documentation on this
feature](https://developer.gnome.org/gobject/unstable/gtype-non-instantiable.html)
(thanks for pointing out goes to hashem on `#gnome-hackers`) is not… uhm…
obvious. Making the long story short, I have checked with the `GIO` sources for
an example, and using that, I have created this small, working chunk:

{% gist 47794b6fb94484f8160b client-state.h %}

{% gist 47794b6fb94484f8160b client-state.c %}

Still, it can be made more perfect by using the
[glib-mkenums](http://developer.gnome.org/gobject/stable/glib-mkenums.html)
tool. I will read through the GLib Makefiles tomorrow for some hints on
this.

Edit: you can find the glib-mkenums solution [here]({% post_url 2014-08-16-registering-an-enum-type-in-glib-glib-mkenums-magic %}).
