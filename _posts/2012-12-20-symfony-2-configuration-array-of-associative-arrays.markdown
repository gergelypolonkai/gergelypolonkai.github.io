---
layout:    post
title:     "Symfony 2 Configuration – Array of associative arrays"
date:      2012-12-20 12:03:23+00:00
tags:      [php, symfony]
permalink: /blog/2012/12/20/symfony-2-configuration-array-of-associative-arrays
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Few days ago I have struggled with a problem using Symfony2 configuration. I
wanted to add the following kind of configuration to `config.yml`:

{% highlight yaml %}
acme_demo:
    transitions:
        - { hc_cba: 180 }
        - { cba_hc: -1 }
{% endhighlight %}

The problem was that the stuff under `transitions` is dynamic, so those
`hc_cba` and `cba_hc` tags can be pretty much anything. After hitting many
errors, I came to the solution:

{% highlight php %}
<?php
$rootNode
    ->children()
        ->arrayNode('state_machine')
            ->requiresAtLeastOneElement()
            ->beforeNormalization()
                ->ifArray()
                    ->then(function($values) {
                        $ret = array();

                        foreach ($values as $value) {
                            foreach ($value as $transition => $time) {
                                $ret[] = array('transition' => $transition, 'time' => e);
                            }
                        }

                        return $ret;
                    })
                ->end()
                ->prototype('array')
                ->children()
                    ->scalarNode('transition')->end()
                    ->scalarNode('time')->end()
                ->end()
            ->end()
        ->end()
    ->end()
;
{% endhighlight %}
