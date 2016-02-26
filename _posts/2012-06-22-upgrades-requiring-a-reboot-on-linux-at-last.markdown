---
layout:    post
title:     "Upgrades requiring a reboot on Linux? At last!"
date:      2012-06-22T20:04:51Z
tags:      [linux]
permalink: /blog/2012/6/22/upgrades-requiring-a-reboot-on-linux-at-last
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I’ve recently received an article on Google+ about Fedora’s new idea: package
upgrades that require a reboot. The article said that Linux guys have lost
their primary adoo: “Haha! I don’t have to reboot my system to install system
upgrades!” My answer was always this: “Well, actually you should…”

I think this can be a great idea if distros implement it well. PackageKit was
a good first step on this road. That software could easily solve such an
issue. However, it is sooo easy to do it wrong. The kernel, of course, can not
be upgraded online (or could it be? I have some theories on this subject,
wonder if it can be implemented…), but other packages are much different.
From the users’ point of view the best would be if the packages would be
upgraded in the background seemlessly. E.g. PackageKit should check if the
given executable is running. If not, it should upgrade it, while notifying the
user like “Hey dude, don’t start Anjuta now, I’m upgrading it!”, or simply
denying to start it. Libraries are a bit different, as PackageKit should check
if any running executables are using the library. Meanwhile, PK should also
keep a notification somewhere telling the users that some packages could be
upgraded, but without stopping this-and-that, it can not be done.

I know these things are easier said than done. But I think (a) users should
tell such ideas to the developers and (b) developers (mostly large companies,
like Microsoft or Apple) should listen to them, and at least think of these
ideas. Some users are not as stupid as they think…
