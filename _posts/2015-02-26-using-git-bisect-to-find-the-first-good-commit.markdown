---
layout:    post
title:     "Using Git bisect to find the first good commit"
date:      2015-02-26 10:42:56
tags:      [git]
permalink: /blog/2015/2/26/using-git-bisect-to-find-the-first-good-commit
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Few months ago we “implemented” a bug in our software, which was released
to the customers. We continued development for two weeks when the first
customer ticket arrived about the bug. We successfully reproduced it with
the customer’s version, but not with the development sources; it turned out
that one of the developers unconsciously fixed the bug. The devs spent some
hours finding where the fix lied before coming to me like “There is
`git-bisect` which we can use to find the commit where we messed up things.
Is there a way to find where we fixed it?”

For those who don’t know this feature, you have to mark a known “good” and
“bad” commit, then git-bisect will go through the commits between this two,
present you the corresponding snapshots, and you have to mark each of them
as “good” or “bad”. At the end, you will get a commit hash where the bug
first occured.

As it turned out, our developers’ problem rooted in the naming convention
of git-bisect: they assumed that the “good” commit must be a working one,
while a “bad” one must be the buggy. In this case, we did the following:

The commit with the customer’s release tag was marked as good (even though
this had the bug), and the latest commit on our development branch was
marked as “bad” (even though the bug was fixed by then). Now with every
snapshot presented by git-bisect we had to do the opposite what you usually
do: mark commits still having the bug as “good”, and commits that don’t as
“bad”. At the end, we had the hash of the commit that fixed the bug (among
some other things; luckily, the developer who pushed that commit had a
workflow that introduced a lot of cherry-picking and squashing before the
push, so he could easily find the bit that actually fixed the problem in
his local repository with the same technique).

[This StackOverflow answer](http://stackoverflow.com/a/17153598/1305139)
suggests the very same, but with some aliases:

{% gist gergelypolonkai/a98f4aab84659d60364e %}
