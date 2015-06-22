---
layout:    post
title:     "Cross browser border-radius SASS mixin with varargs"
date:      2015-04-28 00:59:56+02:00
permalink: /blog/2015/4/28/cross-browser-border-radius-sass-mixin-with-varargs
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Few days ago I needed to create style sheets with many rounded boxes,
where different corners had to be rounded differently (think about
Bootstrap’s [button
groups](http://getbootstrap.com/components/#btn-groups)).

CSS has this nifty shorthand to specify border width in one line, like
with `border-width: 1px 2px 3px 4px`, but it lacks the same for
`border-radius`. So I decided to create something similar using [Sass
mixins](http://sass-lang.com/guide#topic-6) with dynamic
parameters. Another nice feature you get using the `border-width`
shorthand is that you can specify less than four parameters, and the
values will be applied on different sides of your box, so in the end
all side will have the whole `border-width` set.

I wanted to achieve the same for my `border-radius` mixin, although I
could not start specifically with the `top` side. I decided to go with
the top right corner for the first parameter, while trying to keep a
sane repeating pattern. Here is the result:

{% gist gergelypolonkai/313b227434ecc5d85d7b border-radius.sass %}
