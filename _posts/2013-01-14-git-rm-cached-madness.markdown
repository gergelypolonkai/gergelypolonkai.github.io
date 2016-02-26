---
layout:    post
title:     "git rm --cached madness"
date:      2013-01-14T21:38:00Z
tags:      [development, git]
permalink: /blog/2013/1/14/git-rm-cached-madness
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I have recently learned about `git rm --cached`. It’s a very good tool, as it
removes a file from tracking, without removing your local copy of it. However,
be warned that if you use `git pull` in another working copy, the file will be
removed from there! If you accidentally put the configuration of a production
project, and remove it on your dev machine, it can cause a lot of trouble ;)
