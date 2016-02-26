---
layout:    post
title:     "mount: device or resource busy after enabling multipath"
date:      2013-02-19 23:09:05
tags:      [linux, heartbeat-cluster]
permalink: /blog/2013/2/19/mount-device-or-resource-busy-after-enabling-multipath
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

We have a heartbeat cluster with two nodes. It has been running for several
months without problems. The shared storage is on an IBM DS3400, on which we
have a large volume formatted with ext4.

Today I decided to reboot the active node for security reasons. So I’ve
switched to the passive node, which failed at the first step: it was unable to
mount the storage (`/dev/sda1`). After whining for a few moments, I tried to
mount it by hand, which told me

    /dev/sda1 already mounted or /data is busy

I’ve quickly made sure that none of that was true. After checking
this-and-that, it turned out that the passive node had `multipathd` running, so
I looked under `/dev/mapper`, and found two symlinks there, `<long-long WWN>`
and `<long-long WWN>-part1`. As the partition table and the disk size was the
same as on `/dev/sda`, I tried to

    mount /dev/<long-long WWN>-part1 /data

and voilà! It worked like charm!
