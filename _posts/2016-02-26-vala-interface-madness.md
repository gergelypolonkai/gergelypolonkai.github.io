---
layout:    post
title:     "Vala interface madness"
date:      2016-02-26 13:07:62
tags:      [vala, development]
published: true
author:
  name: "Gergely Polonkai"
  email: "gergely@polonkai.eu"
---

Although I have just started making it in C, I decided to move my
Matrix GLib SDK to Vala. First to learn a new language, and second
because it is much easier to write GObject based stuff with it.

For the first step I created a `.vapi` file from my existing sources,
so the whole SDK prototype was available for me in Vala.

I had a `MatrixEvent` class that implemented the `GInitable`
interface, and many others were subclassed `MatrixEvent`. For some
reason I don’t remember, I created the following header for one of the
event classes:

    public class MatrixPresenceEvent : GLib.Object, GLib.Initable {

This is nice and everything, but as I didn’t create an `init()` method
for `MatrixPresenceEvent`, it tried to use the one from the parent
class and somehow got into an infinite loop. The Vala transformer
(`valac`), however, doesn’t mention this.

Lessons learned: if you implement an interface on a subclass that is
implemented by the parent don’t forget to add the necessary functions
to the subclass.
