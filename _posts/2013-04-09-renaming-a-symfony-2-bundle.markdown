---
layout:    post
title:     "Renaming a Symfony 2 bundle"
date:      2013-04-09 22:29:48
tags:      [development, symfony]
permalink: /blog/2013/4/9/renaming-a-symfony-2-bundle
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Today I’ve realised that the name I gave to one of my Symfony 2 bundles should
be something else. To rename a bundle, one must do four things (at least).

1. Change the namespace from `Vendor\OldBundle` to `Vendor\NewBundle` in every
   PHP class (sounds like pain? It is…)
1. Change the name of files and classes. Some files under
   `src/Vendor/OldBundle` (and the classes in them) contain the name of the
   bundle, like `OldBundle/DependencyInjection/VendorOldBundleExtension.php`
   and `OldBundle/VendorOldBundle.php`. You should rename them, or Symfony
   won’t find the classes defined in them! When done, rename the whole bundle
   directory either.
1. Change the configuration files accordingly, including `AppKernel.php`. These
   config files are usually `routing.yml`, `services.yml`, and in some cases,
   `config.yml`
1. Change the references in other parts of your code. A `grep OldBundle .` will
   usually help…
