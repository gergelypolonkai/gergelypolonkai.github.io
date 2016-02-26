---
layout:    post
title:     "Oracle Database “incompatible” with Oracle Linux?"
date:      2011-05-27T17:53:31Z
tags:      [linux, oracle]
permalink: /blog/2011/5/27/oracle-database-incompatible-with-oracle-linux
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Today I gave a shot to install [Oracle
Linux](http://www.oracle.com/us/technologies/linux/overview/index.html). I thought I could easily install
an Oracle DBA on it. Well, I was naive.

As only the 5.2 version is supported by XenServer 5.5, I downloaded that
version of Oracle Linux. Installing it was surprisingly fast and easy, it
asked almost nothing, and booted without any problems.

After this came the DBA, 10.2, which bloated an error message in my face
saying that this is an unsupported version of Linux. Bah.

Is it only me, or is it really strange that Oracle doesn’t support their own
distro?
