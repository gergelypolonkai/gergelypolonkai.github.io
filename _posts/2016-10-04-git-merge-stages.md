---
layout:    post
title:     "git-merge stages"
date:      2016-10-04 12:46:00
tags:      [git]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

This was a mail to my company’s internal Git mailing list, after I
realised many colleagues can’t wrap their heads around merge
conflicts.

>Hello all,
>
>I just saw this on
>the [git-users](https://groups.google.com/forum/#!forum/git-users)
>list and thought it could help you when you bump into a merge
>conflict. It is an excerpt from a mail by Konstantin Khomoutov (one
>of the main contributors on the list), with a few modifications of
>mine. Happy debugging :)
>
>>When a merge conflict is detected for a file, Git:
>>
>>1. Updates the entry for that file in the index to make it contain
>>   several so-called “stages”:
>>  * `0`: “Ours” version – that one which was there in this index entry
>>    before we begun to merge. At the beginning of the conflict, like
>>    right after the `git merge` or `git rebase` command this won’t
>>    exist (unless you had the file in the index, which you didn’t, did
>>    you?). When you resolve the conflict and use `git add
>>    my/conflicting/file.cc`, this will be the version added to the
>>    staging area (index), thus, the resolution of the conflict.
>>  * `1`: The version from the common ancestor commit, ie. the version
>>    of the file both of you modified.
>>  * `2`: The version from `HEAD`. During a merge, this is the current
>>    branch. During a rebase, this is the branch or commit you are
>>    rebasing onto, which usually will be `origin/develop`).
>>  * `3`: The version being merged, or the commit you are rebasing.
>>2. Updates the file in the work tree to contain conflict markers and
>>   the conflicting chunks of text between them (and the text from the
>>   common ancestor if the `diff3` style of conflict markers was set).
>>
>>Now you can use the numbers in point 1 to access the different stages
>>of the conflicting file. For example, to see the common ancestor (the
>>version both of you modified), use
>>
>>```
>>git show :1:my/conflicting/file.cc
>>```
>>
>>Or, to see the difference between the two conflicting versions, try
>>
>>```
>>git diff :2:my/conflicting/file.cc :3:my/conflicting/file.cc
>>```
>>
>>**Note** that you can’t use the `:0:` stage *before* you stage your
>>resolution with `git add`, and you can’t use the `:2:` and `:3:`
>>stages *after* you staged the resolution.
>>
>>Fun fact: behind the scenes, these are the files (*revisions*) `git mergetool`
>>accesses when it presents you the conflict visually.
