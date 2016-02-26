---
layout:    post
title:     "SSH login FAILed on Red Had Enterprise Linux 6.2"
date:      2012-06-18T18:28:45Z
tags:      [linux, selinux, ssh, red-hat]
permalink: /blog/2012/6/18/ssh-login-failed-on-red-hat-enterprise-linux-6-2
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Now this was a mistake I should not have done…

About a month ago I have moved my AWS EC2 machine from Amazon Linux to RHEL
6.2. This was good. I have moved all my files and stuff, recreated my own
user, everything was just fine. Then I copied my
[gitosis](https://github.com/tv42/gitosis) account (user `git` and its home
directory). Then I tried to log in. It failed. I was blaming OpenSSH for a week
or so, changed the config file in several ways, tried to change the permissions
on `~git/.ssh/*`, but still nothing. Permission were denied, I was unable to
push any of my development changes. Now after a long time of trying, I
coincidently `tail -f`-ed `/var/log/audit/audit.log` (wanted to open `auth.log`
instead) and that was my first good point. It told me that `sshd` was unable to
read `~git/.ssh/authorized_keys`, which gave me the idea to run `restorecon` on
`/home/git`. It solved the problem.

All hail SELinux and RBAC!
