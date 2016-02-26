---
layout:    post
title:     "Inverse of `sort`"
date:      2011-09-18T14:57:31Z
tags:      [linux, command-line]
permalink: /blog/2011/9/18/inverse-of-sort
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I’m using \*NIX systems for about 14 years now, but it can still show me new
things. Today I had to generate a bunch of random names. I’ve create a small
perl script which generates permutations of some usual Hungarian first and
last names, occasionally prefixing it with a ‘Dr.’ title or using double first
names. For some reasons I forgot to include uniqueness check in the script.
When I ran it in the command line, I realized the mistake, so I appended
`| sort | uniq` to the command line. So I had around 200 unique names, but in
alphabetical order, which was awful for my final goal. Thus, I tried shell
commands like rand to create a random order, and when many of my tries failed,
the idea popped in my mind (not being a native English speaker): “I don’t have
to create «random order», but «shuffle the list». So I started typing `shu`,
pressed Tab in the Bash shell, and voilà! `shuf` is the winner, it does just
exactly what I need:

    **NAME**
      shuf - generate random permutations

Thank you, Linux Core Utils! :)
