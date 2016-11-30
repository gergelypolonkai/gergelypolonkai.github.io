---
layout:    "post"
title:     "Add Python docstring to the beginning of anything in Emacs"
date:      2016-11-30 07:52:37
tags:      [development, python, emacs]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Now that I write Python code for a living, I write a lot of functions,
classes, and modules.  What I still tend to forget, and also find tedious,
is adding docstrings.  Unlike many developers, writing documentation is not
an enemy of mine, but it usually comes to my mind when I finish
implementation.  The procedure, roughly, is this:

* Decide where I am (in a function, in a class but not in one of its
  methods, or not inside such a block at all)
* Go to the beginning of the thing
* Insert `"""`
* Leave a blank line
* Insert `"""`

One of my mottos is if something takes more than one step and you have to do
it more than twice, you should automate it after the first time.  This puts
a small(ish) overhead on the second invocation (when you implement the
automation), but it usually worth the time.

Since I use Emacs for pretty much everything coding-related (and many more,
but that’s the topic of a different post), I wrote a small function to do it
for me.

{% gist gergelypolonkai/7b062a00d3b8a2555024521273cecfee python-docstring.el %}

There are still a lot of things to improve:

* it always inserts double quotes (althoug I couldn’t show a use-case when
single quotes are preferred)
* it doesn’t check for an existing docstring, just happily inserts a new one
(leaving the old one alone, but generating a syntax error this way)
* it would also be nice if I could jump to the beginning of a file even from
a class method.  I guess I will use prefix keys for that, but I’m not sure
yet.

You can bet I will implement these features, so check back soon for an
updated version!
