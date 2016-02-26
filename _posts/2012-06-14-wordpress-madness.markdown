---
layout:    post
title:     "Wordpress madness"
date:      2012-06-14 06:40:12
tags:      [wordpress, ranting]
permalink: /blog/2012/6/14/wordpress-madness
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I’m a bit fed up that I had to install [MySQL](http://www.mysql.com/) on my
server to have [Wordpress](http://wordpress.org/) working, so I’ve Googled a
bit to find a solution for my pain. I found
[this](http://codex.wordpress.org/Using_Alternative_Databases). I don’t know when
this post was written, but I think it’s a bit out of date. I mean come on, PDO
is the part of PHP for ages now, and they say adding a DBAL to the dependencies
would be a project as large as (or larger than) WP itself. Well,
yes, but PHP is already a dependency, isn’t it? Remove it guys, it’s too
large!

Okay, to be serious… Having a heavily MySQL dependent codebase is a bad
thing in my opinion, and changing it is no easy task. But once it is done, it
would be a child’s play to keep it up to date, and to port WP to other
database backends. And it would be more than enough to call it 4.0, and
raising version numbers fast is a must nowadays (right, Firefox and Linux
Kernel guys?)
