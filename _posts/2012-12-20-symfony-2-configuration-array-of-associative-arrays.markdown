---
layout:    post
title:     "Symfony 2 Configuration – Array of associative arrays"
date:      2012-12-20T12:03:23Z
tags:      [php, symfony]
permalink: /blog/2012/12/20/symfony-2-configuration-array-of-associative-arrays
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Few days ago I have struggled with a problem using Symfony2 configuration. I
wanted to add the following kind of configuration to `config.yml`:

{% gist gergelypolonkai/30440e25f7a447730064 config.yml %}

The problem was that the stuff under `transitions` is dynamic, so those
`hc_cba` and `cba_hc` tags can be pretty much anything. After hitting many
errors, I came to the solution:

{% gist gergelypolonkai/30440e25f7a447730064 DynarrayConfiguration.php %}
