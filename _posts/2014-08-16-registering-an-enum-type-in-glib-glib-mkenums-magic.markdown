---
layout:    post
title:     "Registering an enum type in GLib, glib-mkenums magic"
date:      2014-08-16T15:10:54Z
tags:      [development, c, glib]
permalink: /blog/2014/8/16/registering-an-enum-type-in-glib-glib-mkenums-magic
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

In [this
post](/blog/2013/1/6/registering-an-enum-type-in-glib-s-type-system) I said
I will get through the GLib Makefiles to add an enum type to GLib in a more
sophisticated way.

In my other project,
[SWE-GLib](https://github.com/gergelypolonkai/swe-glib) I already used this
method. The following two rules in `Makefile.am` create `gswe-enumtypes.h`
and `gswe-enumtypes.c`.

{% gist gergelypolonkai/1e2fdedb136de3ca67f0 Makefile %}

`$(GLIB_MKENUMS)` is set in `configure` with
`AC_PATH_PROG([GLIB_MKENUMS], [glib-mkenums])`.

This approach requires the GNU Autotools (you can get rid of it by changing
`$(GLIB_MKENUMS)` to the path to `glib-mkenums` binary), and two template
files, one for the header and one for the code. `$(gswe_enum_headers)`
contains a list of all the header files that have enum types defined
throughout the project.

{% gist gergelypolonkai/1e2fdedb136de3ca67f0 gswe-enumtypes.h %}

{% gist gergelypolonkai/1e2fdedb136de3ca67f0 gswe-enumtypes.c %}