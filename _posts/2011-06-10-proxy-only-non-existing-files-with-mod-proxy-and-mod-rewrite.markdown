---
layout:    post
title:     "Proxy only non-existing files with mod_proxy and mod_rewrite"
date:      2011-06-10 14:20:43+00:00
tags:      [apache]
permalink: /blog/2011/6/10/proxy-only-non-existing-files-with-mod-proxy-and-mod-rewrite
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Today I got an interesting task. I had to upload some pdf documents to a site.
The domain is ours, but we don’t have access to the application server that is
hosting the page yet. Until we get it in our hands, I did a trick.

I enabled `mod_rewrite`, `mod_proxy` and `mod_proxy_http`, then added the following
lines to my apache config:

{% gist gergelypolonkai/47680bfa44eb29708f20 %}

I’m not totally sure it’s actually secure, but it works for now.
