---
layout:    post
title:     "Haversine in MySQL"
date:      2013-03-05 12:49:28+00:00
permalink: /blog/2013/3/5/haversine-in-mysql
tags:      [mysql, development]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Just insert it in your database, feed them two Google coordinates, and you get
the distance in kilometres. If you happen to need it in miles, change the
constant `12756.200` in the `RETURN` row to `7922.6` instead.

{% gist gergelypolonkai/bdad1cf2d410853bef35 %}