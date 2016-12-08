---
layout:    post
title:     "Slugify in Python 3"
date:      2016-12-08 12:54:19
tags:      [development, python]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Today I needed a function to create a slug (an ASCII-only representation of
a string).  I went Googling a bit, and found an
excellend [Flask snippet](http://flask.pocoo.org/snippets/5/).  Problem is,
it is designed for Python 2, so I came up with a Python 3 version.

{% gist gergelypolonkai/1866fd363f75f4da5f86103952e387f6 slugify.py %}

As I don’t really like the transliteration done in the first example
(e.g. converting ü to ue), I went with the second example.
