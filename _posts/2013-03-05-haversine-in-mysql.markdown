---
layout:    post
title:     "Haversine in MySQL"
date:      2013-03-05 12:49:28+00:00
permalink: /blog/2013/3/5/haversine-in-mysql
tags:      [mysql, development]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Just insert it in your database, feed them two Google coordinates, and you get
the distance in kilometres. If you happen to need it in miles, change the
constant `12756.200` in the `RETURN` row to `7922.6` instead.

{% highlight sql %}
DELIMITER $$

CREATE FUNCTION `haversine` (lng1 FLOAT, lat1 FLOAT, lng2 FLOAT, lat2 FLOAT)
RETURNS float NO SQL DETERMINISTIC
BEGIN
    SET @a = ABS(POWER(SIN(RADIANS(lat1 - lat2)) / 2, 2) + COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * POWER(SIN(RADIANS(lng1 - lng2)) / 2, 2));
    RETURN 12756.200 * ATAN2(SQRT(@a), SQRT(1 - @a));
END$$
{% endhighlight %}
