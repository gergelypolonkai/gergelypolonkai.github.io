---
layout:    post
title:     "Why I stopped using annotation based routing in Symfony today"
date:      2013-02-27 23:10:24+00:00
tags:      [development, symfony]
permalink: /blog/2013/2/27/why-i-stopped-using-annotation-based-routing-in-symfony-today
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I have read several opinions about routing configuration in Symfony. I stayed
with annotation based routing as it was convinient for me to see the URL right
above the controller action. This was because by just checking the URL, I
remembered the controlling code, as they always were fresh ones. Well, until
today.

I had to take a look into an old (Sf 2.0, last commit was about 3 months ago)
project of mine. In the same run I’ve upgraded the whole project to 2.2 (it was
a fast one, thanks for [JMikola@GitHub](https://github.com/jmikola) for the
quick reply on my issue with
[JmikolaJsAssetsHelperBundle](https://github.com/jmikola/JmikolaJsAssetsHelperBundle)
again!). After that I went on to the requested change. Now, finding a route in
about 40 controller files spread between 3 bundles can really be a pain! So
I’ve finished with annotation based routing. It’s still a nice feature, it’s
simply not for me.
