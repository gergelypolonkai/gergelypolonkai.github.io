---
layout:    post
title:     "PHP 5.4 released"
date:      2012-03-20 13:31:12+00:00
tags:      [php]
permalink: /blog/2012/3/20/php-5-4-released
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

After a long time of waiting, PHP announced 5.4 release on 1 March (also,
today they announced that they finally migrate to Git, which is sweet from my
point of view, but it doesn’t really matter).

About a year ago we became very agressive towards a developer who created our
internal e-learning system. Their database was very insecure, and they didn’t
really follow industry standards in many ways. Thus, we forced them to move
from Windows + Apache 2.0 + PHP 5.2 + MySQL 4.0 to Debian Linux 6.0 + Apache
2.2 + PHP 5.3 + MySQL 5.1. It was fun (well, from our point of view), as their
coders… well… they are not so good. The code that ran “smoothly” on the
old system failed at many points on the new one. So they code and code, and
write more code. And they still didn’t finish. And now 5.4 is here. Okay, I
know it will take some time to get into the Debian repositories, but it’s
here. And they removed `register_globals`, which will kill that funny code again
at so many points that they will soon get to rewrite the whole code to make it
work. And I just sit here in my so-much-comfortable chair, and laugh. Am I
evil?
