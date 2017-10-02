---
layout:    post
title:     "Add SysAdmin day to Emacs Calendar"
date:      2017-10-02 09:37:52
tags:      [emacs]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---
I’m a SysAdmin since 1998.  Maybe a bit earlier, if you count managing our home computer.  This
means [SysAdmin Day](http://sysadminday.com/) is also celebrating me.  However, my Emacs Calendar
doesn’t show it for some reason.

The solution is pretty easy:

``` lisp
(add-to-list 'holiday-other-holidays '(holiday-float 7 5 -1 "SysAdmin Day") t)
```

Now invoke `holidays-list` for any year, choosing “Other” as the category, and there you go:

```
…
Friday, July 28, 2017: SysAdmin Day
…
```
