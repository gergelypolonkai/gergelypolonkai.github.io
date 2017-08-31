---
layout:    post
title:     "Changing the session cookie’s name in Symfony 2"
date:      2012-10-13 12:49:28
tags:      [symfony, development]
permalink: /blog/2012/10/13/changing-the-session-cookie-s-name-in-symfony-2
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I have a development server, on which I have several Symfony 2.x projects under
the same hostname in different directories. Now I’m facing a funny problem
which is caused by that the cookies Symfony places for each of my projects have
the same name.

To change this, you will have to modify the `config.yml` file like this:

{% gist c695670ecca2809f7c93 %}
