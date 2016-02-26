---
layout:    post
title:     "Fedora can’t change Active Directory password via kpasswd"
date:      2013-03-05 08:55:04
tags:      [fedora, kerberos, active-directory]
permalink: /blog/2013/3/5/fedora-can-t-change-active-directory-password-via-kpasswd
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I wanted to change my AD password today. As the AD is actually a Kerberos
server, I was pretty sure that `kpasswd` will do the trick. However, `kpasswd`
output looked like this:

    $ kpasswd
    Password for polonkai.gergely@EXAMPLE.LOCAL:
    Enter new password:
    Enter it again:
    kpasswd: Cannot find KDC for requested realm changing password

I’ve checked `kinit` and `klist`, everything looked fine. After a while it came
to my mind that password changing is done through the kadmin server, not
through the KDC. It seems that when I set up the Active Directory membership,
the `admin_server` directive is not get written to `krb5.conf`. So all I had to
do was to put

    admin_server = ad.example.local

in that file, and voilà!

    $ kpasswd
    Password for polonkai.gergely@EXAMPLE.LOCAL:
    Enter new password:
    Enter it again:
    Password changed.

