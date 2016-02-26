---
layout: post
title: "Measuring code coverage with codecov for libtool projects"
author:
  name: "Gergely Polonkai"
  email: "gergely@polonkai.eu"
---

I have recently found [codecov][https://codecov.io/]; they offer free
services for public GitHub projects. As I have recently started writing
tests for my SWE-GLib project, I decided to give it a go. Things are not
this easy if you use GNU Autotools and libtool, though…

The problem here is that these tools generate output under `src/.libs/`
(given that your sources are under `src/`) and `gcov` has hard times
finding the coverage data files. Well, at least in the codecov
environment, it works fine on my machine.
