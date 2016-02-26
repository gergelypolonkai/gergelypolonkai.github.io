---
layout:    post
title:     "SWE-GLib final release"
date:      2013-09-16 21:37:17
tags:      [development, astrology]
permalink: /blog/2013/9/16/swe-glib-final-release
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Few of you may know that I’m interested in astrology. About two months ago
I have decided to create an astrologers’ software for the GNOME desktop.
Since then, I have contacted Jean-André Santoni, who created a software
called [Astrognome](https://code.google.com/p/astrognome/) some years ago.
We exchanged some e-mails, and after several weeks of coding, I’m proud to
present [SWE-GLib](https://github.com/gergelypolonkai/swe-glib) 1.0.1. This
is “just” a library which wraps around [Swiss
Ephemeris](http://www.astro.com/swisseph/), creating a nice GLib-ish
interface around it. See the project page and the built-in GTK-Doc document
for more information.

The astrologer’s software I’m writing will be
[Astrognome](https://github.com/gergelypolonkai/astrognome) (thanks for
Jean-André for letting me use the name). It is currently in pre-alpha
status, but already utilizes SWE-GLib (it just can’t display the results
yet). If you happen to be interested in astrology and/or Astrognome, fork
the repository and contribute! You can also contact me (or open an
enhancement issue on GitHub) if you have any ideas.
