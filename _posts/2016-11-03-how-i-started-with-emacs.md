---
layout:    post
title:     "How I started with Emacs"
date:      2016-11-03 09:58:41
tags:      [emacs]
published: true
authon:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

Sacha Chua has a nice
[Emacs chat intro](http://sachachua.com/blog/2013/04/emacs-chat-intro/) article
back from 2013. I write this post half because she asks there about my
(OK, anyone’s) first Emacs moments, and half because I plan to do it
for months now.

I wanted to start using Emacs 6(ish) years ago, and I was like
“<kbd>C-x</kbd> what”? (Note that back around 1998, I was among the
people who exited `vi` by killing it from another terminal after a
bunch of tries & fails like
[these](http://osxdaily.com/2014/06/12/how-to-quit-vim/).)

I tried to come back to Emacs a lot of times. And I mean a *lot*,
about every two months. I suddenly learned what these cryptic key
chord descriptions mean (`C` is for <kbd>Control</kbd> and `M` is for
<kbd>Meta</kbd>, which is actually <kbd>Alt</kbd>), but somehow it
didn’t *click*. I remained a ViM power user with a huge pile of
3<sup>rd</sup> party plugins.
Then [I found Nyan-macs]({% post_url 2014-09-17-nyanmacs %}),
which converted me to Emacs, and it is final now. Many of my friends
thought I’m just kidding this being the cause, but I’m not. I’m a huge
fan of Nyan cat (did you know there is even a site
called [nyan.cat](http://nyan.cat/)?) and since then I have it in my
mode line:

![Nyan modeline]({{ site_url }}/images/nyan-modeline.png)

…in my `eshell` prompt:

![IMAGE HERE]({{ site_url }}/images/nyan-eshell.png)

…and I also [zone out](https://www.emacswiki.org/emacs/ZoneMode) with
Nyan cat:

![IMAGE HERE]({{ site_url }}/images/nyan-zone.png)

Now on to more serious stuff. After browsing through all the packages
provided by [ELPA](http://elpa.gnu.org/), I found tons of useful (and
sometimes, less useful) packages,
like
[Helm](https://github.com/emacs-helm/helm/wiki),
[company](http://company-mode.github.io/),
[gtags](https://www.emacswiki.org/emacs/GnuGlobal) (which introduced
me to GNU Global, removing Exuberant ctags from my
life),
[magit](https://magit.vc/),
[Projectile](http://batsov.com/projectile/),
and [Org](http://orgmode.org/) (OK, it’s actually part of Emacs for a
while, but still). I still use these few, but in a month or two, I
started
to [version control](https://github.com/gergelypolonkai/my-emacs-d) my
`.emacs.d` directory, so I can easily transfer it between my home and
work machine (and for a few weeks now, even to my phone: I’m using
Termux on Android). Then, over these two years I wrote some packages
like [GobGen](https://github.com/gergelypolonkai/gobgen.el), and a
small addon for Calendar
providing
[Hungarian holidays](https://github.com/gergelypolonkai/hungarian-holidays),
and I found a lot more (in no particular
order):
[git-gutter](https://github.com/syohex/emacs-git-gutter),
[multiple-cursors](https://github.com/magnars/multiple-cursors.el),
[origami](https://github.com/gregsexton/origami.el),
[ace-window](https://github.com/abo-abo/ace-window),
[avy](https://github.com/abo-abo/avy),
[beacon](https://github.com/Malabarba/beacon), and a lot more.

What is more important (to me) is that I started using
the [use-package](https://github.com/jwiegley/use-package) package,
which can automatically download packages that are not installed on my
current local system. Together
with
[auto-package-update](https://github.com/rranelli/auto-package-update.el),
it is *very* practical.

In addition, I started to follow the blogs of a bunch of Emacs
users/gurus. I’ve already
mentioned [Sacha Chua](http://sachachua.com/). She’s a charming,
cheerful person, writing a lot about Emacs and project management
(among other things). Another one
is [Bozhidar Batsov](http://batsov.com/), who, among other things, had
an initiate to lay down the foundation of
a
[common Elisp coding style](https://github.com/bbatsov/emacs-lisp-style-guide). Another
favourite of mine
is [Endless Parentheses](http://endlessparentheses.com/), whence I got
a lot of ideas.
