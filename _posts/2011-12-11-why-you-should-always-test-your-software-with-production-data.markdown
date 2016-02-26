---
layout:    post
title:     "Why you should always test your software with production data"
date:      2011-12-11 12:14:51
tags:      [development, testing, ranting]
permalink: /blog/2011/12/11/why-you-should-always-test-your-software-with-production-data
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I’m writing a software for my company in PHP, using the Symfony 2 framework.
I’ve finished all the work, created some sample data, it loaded perfectly. Now
I put the whole thing into production and tried to upload the production data
into it. Guess what… it didn’t load.
