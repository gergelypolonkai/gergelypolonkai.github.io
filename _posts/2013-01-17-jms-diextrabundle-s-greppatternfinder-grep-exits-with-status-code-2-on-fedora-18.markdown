---
layout:    post
title:     "JMS\\DiExtraBundle’s GrepPatternFinder – grep exits with status code 2 on Fedora 18"
date:      2013-01-17 00:32:12
tags:      [fedora, selinux, symfony]
permalink: /blog/2013/1/17/jms-diextrabundle-s-greppatternfinder-grep-exits-with-status-code-2-on-fedora-18
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Yesterday I’ve upgraded my development machines from Fedora 17 to Fedora
18. Although it went well, my [Symfony](http://symfony.com/) projects stopped
working with a message like this:

    RuntimeException: Command "/usr/bin/grep --fixed-strings --directories=recurse --devices=skip --files-with-matches --with-filename --color=never --include=*.php 'JMS\DiExtraBundle\Annotation'
    '/var/www/html/gergelypolonkaiweb/app/../src'
    '/var/www/html/gergelypolonkaiweb/vendor/symfony/symfony/src/Symfony/Bundle/FrameworkBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/symfony/symfony/src/Symfony/Bundle/SecurityBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/symfony/symfony/src/Symfony/Bundle/TwigBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/symfony/monolog-bundle/Symfony/Bundle/MonologBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/symfony/swiftmailer-bundle/Symfony/Bundle/SwiftmailerBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/symfony/assetic-bundle/Symfony/Bundle/AsseticBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/doctrine/doctrine-bundle/Doctrine/Bundle/DoctrineBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/sensio/framework-extra-bundle/Sensio/Bundle/FrameworkExtraBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/jms/aop-bundle/JMS/AopBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/jms/security-extra-bundle/JMS/SecurityExtraBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/doctrine/doctrine-migrations-bundle/Doctrine/Bundle/MigrationsBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/friendsofsymfony/jsrouting-bundle/FOS/JsRoutingBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/avalanche123/imagine-bundle/Avalanche/Bundle/ImagineBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/genemu/form-bundle/Genemu/Bundle/FormBundle'
    '/var/www/html/gergelypolonkaiweb/src/GergelyPolonkai/FrontBundle'
    '/var/www/html/gergelypolonkaiweb/src/GergelyPolonkai/GeshiBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/symfony/symfony/src/Symfony/Bundle/WebProfilerBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/sensio/distribution-bundle/Sensio/Bundle/DistributionBundle'
    '/var/www/html/gergelypolonkaiweb/vendor/sensio/generator-bundle/Sensio/Bundle/GeneratorBundle'" exited with non-successful status code "2".

After getting through my logs and such, I’ve finally found out that the new
SELinux policy is causing the trouble together with git. Eventually, my
`.git/logs` directory is tagged as `unconfined_u:object_r:httpd_log_t:s0`.
`httpd_log_t` type is not readable by the `system_u:system_r:httpd_t:s0` user,
which makes `/usr/bin/grep` throw an access denied error. To fix this, I needed
to do

    semanage fcontext -a -t httpd_sys_content_t '/var/www(/.*)?/\.git/logs(/.*)?'

as root. This makes `.git` directories readable for the httpd process, thus,
for `grep`. The optimal solution would be to tell `GrepPatternFinder` to ignore
version control stuff, so the `httpd` process would have no access to them at
all. Also, in production, removing the `.git` or `.svn` directories could be a
good idea.
