---
layout:    post
title:     "Gentoo hardened desktop with GNOME 3 – Round two"
date:      2011-05-18T10:28:14Z
tags:      [gentoo, gnome3, selinux]
permalink: /blog/2011/5/18/gentoo-hardened-desktop-with-gnome-3-round-two
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

After several hours of `package.keywords`/`package.use` editing and package
compiling, I managed to install GNOME 3 on my notebook. Well, I mean, the
GNOME 3 packages. Unfortunately the fglrx driver didn’t seem to recognise my
ATI Mobility M56P card, and the open source driver didn’t want to give me GLX
support. When I finally found some clues on what should I do, I had to use my
notebook for work, so I installed Fedora 14 on it. Then I realised that GNOME
3 is already included in Rawhide (Fedora 15), so I quickly downloaded and
installed that instead. Now I have to keep this machine in a working state for
a few days, so I will learn SELinux stuff in its native environment.

When I installed Fedora 14, the first AVC message popped up after about ten
minutes. That was a good thing, as I wanted to see `setroubleshoot` in action.
However, in Fedora 15, the AVC bubbles didn’t show up even after a day. I
raised my left eyebrow and said that’s impossible, SELinux must be disabled.
And it’s not! It’s even in enforcing mode! And it works just fine. I like it,
and I hope I will be able to get the same results with Gentoo if I can get
back to testing…
