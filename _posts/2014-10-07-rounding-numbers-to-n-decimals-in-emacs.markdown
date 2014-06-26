---
layout:    post
title:     "Rounding numbers to N decimals in Emacs"
date:      2014-10-07 10:28:50+00:00
tags:      [emacs, development]
permalink: /blog/2014/10/7/rounding-numbers-to-n-decimals-in-emacs
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I have recently faced a problem, where I had a bunch of SVG files with a
large amount of fraction numbers in the path definitions. These images were
displayed in small size, so this amount of precision was irrelevant, and
these numbers took almost half of my SVG images’ size. So I created an
Elisp defun to round these numbers to 2 decimals:

{% highlight common-lisp %}
(defun get-number-at-point ()
  (interactive)
  (skip-chars-backward "0123456789.-")
  (or (looking-at "[0123456789.-]+")
      (error "No number at point"))
  (string-to-number (match-string 0)))

(defun round-number-at-point-to-decimals (decimal-count)
  (interactive "NDecimal count: ")
  (let ((mult (expt 10 decimal-count)))
    (replace-match (number-to-string
              (/
               (fround
                (*
                 mult
                 (get-number-at-point)))
                mult)))))
{% endhighlight %}

This finds the first digit of the number under point (the cursor), and
reduces its digits to the given amount (or the number given with `C-u`). It
has some drawbacks, though, as it cannot handle exponential forms (e.g.
`1e-1234`), but these were rare in my case, and its hard to iterate through
all numbers. I will come over this latter problem soon(ish).
