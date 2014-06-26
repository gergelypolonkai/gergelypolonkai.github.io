---
layout:    post
title:     "Gentoo hardened desktop with GNOME 3 – Round one"
date:      2011-05-12 20:32:41+00:00
tags:      [gentoo, gnome3, selinux]
permalink: /blog/2011/5/12/gentoo-hardened-desktop-with-gnome-3-round-one
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

After having some hard times with Ubuntu (upgrading from 10.10 to 11.04), I
decided to switch back to my old friend, Gentoo. As I’m currently learning
about Linux hardening, I decided to use the new SELinux profile, which
supports the v2 reference policy.

Installation was pretty easy, using the [Gentoo x86
Handbook](http://www.gentoo.org/doc/hu/handbook/handbook-x86.xml). This profile
automatically turns on the `USE=selinux` flag (so does the old SELinux
profile), but deprecated `FEATURE=loadpolicy` (which is turned on by the
profile, so portage will complain about it until you disable it in
`/etc/make.conf`).

For the kernel, I chose `hardened-sources-2.6.37-r7`. This seems to be recent
enough for my security testing needs. I turned on both SELinux, PaX and
grsecurity. So far, I have no problem with it, but I don’t have X installed
yet, which will screw up things for sure.

After having those hard times with Ubuntu mentioned before, I decided not to
install Grub2 yet, as it renders things unusable (eg. my Windows 7
installation, which I sometimes need at the office). So I installed Grub 0.97
(this is the only version marked as stable, as I remember), touched
`/.autorelabel`, and reboot.

My first mistake was using an UUID as the root device on the kernel parameter
list (I don’t want to list all the small mistakes like forgetting to include to
correct SATA driver from my kernel and such). Maybe I was lame, but after
including `/dev/sda5` instead of the UUID thing, it worked like…

Well, charm would not be the good word. For example, I forgot to install the
lvm2 package, so nothing was mounted except my root partition. After I
installed it with the install CD, I assumed everything will be all right, but
I was wrong.

udev and LVM is a critical point in a hardened environment. udev itself
doesn’t want to work without the `CONFIG_DEVFS_TEMPFS=y` kernel option, so I
also had to change that. It seemed that it can be done without the install CD,
as it compiled the kernel with no problems. However, when it reached the point
when it compresses the kernel with gzip, it stopped with a `Permission denied`
message (although it was running with root privileges).

The most beautiful thing in the hardened environment with Mandatory Access
Control enabled) is that root is not a real power user any more by default.
You can get this kind of messages many times. There are many tools to debug
these, I will talk about these later.

So, my gzip needed a fix. After digging a bit on the Internet, I found that
the guilty thing is text relocation, which can be corrected if gzip is
compiled with PIC enabled. Thus, I turned on `USE=pic` flag globally, and
tried to remerge gzip. Of course it failed, as it had to use gzip to unpack
the gzip sources. So it did when I tried to install the PaX tools and gradm to
turn these checks off. The install CD came to the rescue again, with which I
successfully recompiled gzip, and with this new gzip, I compressed my new
kernel, with which udev started successfully. So far, so good, let’s try to
reboot!

Damn, LVM is still not working. So I decided to finally consult the Gentoo
hardened guide. It says that the LVM startup scripts under `/lib/rcscripts/…`
must be modified, so LVM will put its lock files under `/etc/lvm/lock` instead
of `/dev/.lvm`. After this step and a reboot, LVM worked fine (finally).

The next thing was the file system labelling. SELinux should automatically
relabel the entire file system at boot time whenever it finds the
`/.autorelabel` file. Well, in my case it didn’t happen. After checking the
[Gentoo Hardening](http://wiki.gentoo.org/wiki/Hardened_Gentoo) docs, I realised that the `rlpkg` program does exactly the same
(as far as I know, it is designed specifically for Gentoo). So I ran `rlpkg`,
and was kind of shocked. It says it will relabel ext2, ext3, xfs and JFS
partitions. Oh great, no ext4 support? Well, consulting the forums and adding
some extra lines to `/etc/portage/package.keywords` solved the problem (`rlpkg`
and some dependencies had to have the `~x86` keyword set). Thus, `rlpkg`
relabelled my file systems (I checked some directories with `ls -lZ`, it seemed
good for me).

Now it seems that everything is working fine, except the tons of audit
messages. Tomorrow I will check them with `audit2why` or `audit2allow` to see if
it is related with my SELinux lameness, or with a bug in the policy included
with Gentoo.
