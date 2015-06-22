---
layout:    post
title:     "@ParamConverter à la Django"
date:      2015-06-07 20:14:32+02:00
tags:      [python, django]
published: true
author:
    name:  Gergely Polonkai
    email: gergely@polonkai.eu
---
One thing I really miss from [Django](https://www.djangoproject.com/)
is [Symfony](http://symfony.com)’s
[@ParamConverter](http://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/converters.html). It
made my life so much easier while developing with Symfony. In Django,
of course, there is
[get_object_or_404](https://docs.djangoproject.com/en/dev/topics/http/shortcuts/#get-object-or-404),
but, for example, in one of my projects I had a view that had to resolve 6(!)
objects from the URL, and writing `get_object_or_404` six times is not what a
programmer likes to do (yes, this view had a refactor later on). A quick Google
search gave me one [usable
result](http://openclassrooms.com/forum/sujet/middleware-django-genre-paramconverter-doctrine)
(in French), but it was very generalized that I cannot always use. Also, it was
using a middleware, which may introduce performance issues
sometimes<sup>[citation needed]</sup>. So I decided to go with decorators, and
at the end, I came up with this:

{% gist gergelypolonkai/498a32297f39b4960ad7 helper.py %}

Now I can decorate my views, either class or function based, with
`@convert_params(User, (Article, 'aid'), (Paragraph, None, 'pid'),
(AnotherObject, None, None, 'obj'))` and all the magic happens in the
background. The `user_id` parameter passed to my function will be
popped off, and be resolved against the `User` model by using the `id`
field; the result is put in the new `user` parameter. For Article, the
`aid` parameter will be matched against the `id` field of the
`Article` model putting the result into `article`, and finally, the
`another_object_id` will be matched against the `id` field of the
`AnotherObject` model, but in this case, the result is passed to the
original function as `obj`.
