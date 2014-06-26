---
layout:    post
title:     "List Git branches and their remote tracking branches side by side"
date:      2014-07-18 21:46:45+00:00
tags:      [git]
permalink: /blog/2014/7/18/list-git-branches-and-their-remote-tracking-branches-side-by-side
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I had a hard time following my own branches in a project. They got pretty
numerous, and I wasn’t sure if I pushed them to origin at all.
`git branch -a` can list all the branches, including remote ones, but, as
my list grew too big, it was impossible to follow it any more.

Thus, I have created a small script called git-branches-with-remotes, which
does the work for me. Its only requirements are git (of course), and the
`column` command, which is pretty obviously present on every POSIX
compliant systems (even OSX).

{% highlight sh %}
#! /bin/sh

COLUMN=`which column 2> /dev/null`
if test -z $COLUMN
then
    echo "`column' is not found in PATH. Cannot continue."
    exit 1
fi

current_branch=`git rev-parse --abbrev-ref HEAD`

for branch in $(git for-each-ref --shell --format='%(refname)' refs/heads | sed -e s/^\'refs\\/heads\\///-e s/\'$//)
do
    remote=`git config branch.$branch.remote`
    merge=`git config branch.$branch.merge | sed -e 's/^refs\/heads\///'`

    [ x"$current_branch" == x"$branch" ] && echo -n '*'

    echo -n "$branch"

    if ! test -z $merge
    then
        echo -en "\t"
        echo -n $remote
        echo -n /
        echo -n $merge
    fi

    echo
done | $COLUMN -t
{% endhighlight %}

I just put it in my path, and `git branches-with-remotes` does the work!

Edit (16 August): I have added some code to mark the current branch (if any)
with an asterisk. Also, I have put this script [in a
gist](https://gist.github.com/gergelypolonkai/8af6a3e86b57dd4c250e).

Edit (26 February, 2015): It turns out that `git branch -vv` shows the same
information and some more: it also shows if the branches are diverged, and the
first line of the last commit’s message.
