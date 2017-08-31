---
layout:    post
title:     "Get account data programatically from id-manager"
date:      2016-11-18 12:43:13
tags:      [emacs]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I recently started
using [`id-manager`](https://github.com/kiwanami/emacs-id-manager). It is a
nice little package that can store your passwords, encrypting them with
GPG. My original reason was to store my GitHub access token
for [`github-notifier`](https://github.com/xuchunyang/github-notifier.el),
but it soon turned out, it’s not *that* easy.

`id-manager` is a nice package when it comes to storing your password, and
retrieving them for your own eyes. But it cannot retrieve account data
programatically. Taking a look into its source code, I came up with this
solution:

{% gist 8bad70502ac563864080f754fce726c3 idm.el %}

I currently need only the account ID (ie. the username) and the password,
but it’s pretty easy to add a macro to get the `memo` or `update-time`
fields, too.
