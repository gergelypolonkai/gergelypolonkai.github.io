---
layout:    post
title:     "Edit file as another user in Emacs"
date:      2016-11-10 08:57:12
tags:      [development, emacs]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I have recently found
[this article](http://emacsredux.com/blog/2013/04/21/edit-files-as-root/) by
Bozhidar Batsov on opening the current file as root. I barely use
[tramp](https://www.gnu.org/software/tramp/) for sudo access, but when I do,
I almost never use root as the target user. So I decided to fix it for my
needs.

{% gist 192c83aa0556d5cdaf4018f57b75a84b %}

If the user is not specified, the default is still root. Also, if the
current buffer is not visiting a file, I prompt for a filename. As I’m not
an `ido` user, I didn’t bother calling
`ido-read-file-name`; [`helm`](https://github.com/emacs-helm/helm/wiki)
overrides `read-file-name` for me anyway.

Unlike Bozhidar, I barely use this feature, so I didn’t bind this to a key.
