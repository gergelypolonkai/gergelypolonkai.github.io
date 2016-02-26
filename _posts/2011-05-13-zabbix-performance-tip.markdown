---
layout:    post
title:     "Zabbix performance tip"
date:      2011-05-13 19:03:31
tags:      [zabbix, monitoring]
permalink: /blog/2011/5/13/zabbix-performance-tip
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Recently I have switched from [MRTG](http://oss.oetiker.ch/mrtg/) + [Cacti](http://www.cacti.net/) + [Nagios](http://www.nagios.org/) + [Gnokii](http://www.gnokii.org/) to [Zabbix](http://www.zabbix.com/), and I
must say I’m more than satisfied with it. It can do anything the former tools
did, and much more. First of all, it can do the same monitoring as Nagios did,
but it does much more fine. It can check several parameters within one
request, so network traffic is kept down. Also, its web front-end can generate
any kinds of graphs from the collected data, which took Cacti away. Also, it
can do SNMP queries (v1-v3), so querying my switches’ port states and traffic
made easy, taking MRTG out of the picture (I know Cacti can do it either, it
had historical reasons we had both tools installed). And the best part: it can
send SMS messages via a GSM modem natively, while Nagios had to use Gnokii.
The trade-off is, I had to install Zabbix agent on all my monitored machines,
but I think it worths the price. I even have had to install NRPE to monitor
some parameters, which can be a pain on Windows hosts, while Zabbix natively
supports Windows, Linux and Mac OS/X.

So I only had to create a MySQL database (which I already had for NOD32
central management), and install Zabbix server. Everything went fine, until I
reached about 1300 monitored parameters. MySQL seemed to be a bit slow on disk
writes, so my Zabbix “queue” filled up in no time. After reading some forums,
I decided to switch to PostgreSQL instead. Now it works like charm, even with
the default Debian settings. However, I will have to add several more
parameters, and my boss wants as many graphs as you can imagine, so I’m more
than sure that I will have to fine tune my database later.
