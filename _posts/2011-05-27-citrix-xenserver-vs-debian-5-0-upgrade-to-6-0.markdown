---
layout:    post
title:     "Citrix XenServer 5.5 vs. Debian 5.0 upgrade to 6.0"
date:      2011-05-27T17:33:41Z
tags:      [citrix-xenserver, debian]
permalink: /blog/2011/5/27/citrix-xenserver-vs-debian-5-0-upgrade-to-6-0
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Few weeks ago I’ve upgraded two of our Debian based application servers from
5.0 to 6.0. Everything went fine, as the upgraded packages worked well with
the 4.2 JBoss instances. For the new kernel we needed a reboot, but as the
network had to be rebuilt, I postponed this reboot until the network changes.
With the network, everything went fine again, we successfully migrated our
mail servers behind a firewall. Also the Xen server (5.5.0, upgrade to 5.6
still has to wait for a week or so) revolted well with some storage disks
added. But the application servers remained silent…

After checking the console, I realised that they don’t have an active console.
And when I tried to manually start them, XenServer refused with a message
regarding pygrub.

To understand the problem, I had to understand how XenServer boots Debian. It
reads the grub.conf on the first partition’s root or `/boot` directory, and
starts the first option, without asking (correct me, if I’m mistaken
somewhere). However, this pygrub thing can not parse the new, grub2 config.
This is kinda frustrating.

For the first step, I quickly installed a new Debian 5.0 system from my
template. Then I attached the disks of the faulty virtual machine, and mounted
all its partitions. This way I could reach my faulty 6.0 system with a chroot
shell, from which I could install the `grub-legacy` package instead of grub,
install the necessary kernel and XenServer tools (which were missing from both
machines somehow), then halt the rescue system, and start up the original
instance.

Next week I will do an upgrade on the XenServer to 5.6.1. I hope no such
problems will occur.
