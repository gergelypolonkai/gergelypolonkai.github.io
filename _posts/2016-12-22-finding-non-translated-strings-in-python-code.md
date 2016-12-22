---
layout:    post
title:     "Finding non-translated strings in Python code"
date:      2016-12-22 09:35:11
tags:      [development, python]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

When creating multilingual software, be it on the web, mobile, or desktop,
you will eventually fail to mark strings as translatable.  I know, I know,
we developers are superhuman and never do that, but somehow I stopped
trusting myself recently, so I came up with an idea.

Right now I assist in the creation of a multilingual site/web application,
where a small part of the strings come from the Python code instead of HTML
templates.  Call it bad practice if you like, but I could not find a better
way yet.

As a start, I tried to parse the source files with simple regular
expressions, so I could find anything between quotation marks or
apostrophes.  This attempt quickly failed with strings that had such
characters inside, escaped or not; my regexps became so complex I lost all
hope.  Then the magic word “lexer” came to mind.

While searching for ready made Python lexers, I bumped into the awesome
`ast` module.  AST stands for Abstract Syntax Tree, and this module does
that: parses a Python file and returns a tree of nodes.  For walking through
these nodes there is a `NodeVisitor` class (among other means), which is
meant to be subclassed.  You add a bunch of `visitN` methods (where `N` is
an `ast` class name like `Str` or `Call`), instantiate it, and call its
`visit()` method with the root node.  For example, the `visitStr()` method
will be invoked for every string it finds.

#### How does it work?

Before getting into the details, let’s me present you the code I made:

{% gist gergelypolonkai/1a16a47e5a1971ca33e58bdfd88c5059 string-checker.py %}

The class initialization does two things: creates an empty `in_call` list
(this will hold our primitive backtrace), and saves the filename, if
provided.

`visitCall`, again, has two tasks.  First, it checks if we are inside a
translation function.  If so, it reports the fact that we are translating
something that is not a raw string.  Although it is not necessarily a bad
thing, I consider it bad practice as it may result in undefined behaviour.

Its second task is to walk through the positional and keyword arguments of
the function call.  For each argument it calls the `visit_with_trace()`
method.

This method updates the `in_call` property with the current function name
and the position of the call.  This latter is needed because `ast` doesn’t
store position information for every node (operators are a notable example).
Then it simply visits the argument node, which is needed because
`NodeVisitor.visit()` is not recursive.  When the visit is done (which, with
really deeply nested calls like `visit(this(call(iff(you(dare)))))` will be
recursive), the current function name is removed from `in_call`, so
subsequent calls on the same level see the same “backtrace”.

The `generic_visit()` method is called for every node that doesn’t have a
named visitor (like `visitCall` or `visitStr`.  For the same reason we
generate a warning in `visitCall`, we do the same here.  If there is
anything but a raw string inside a translation function call, developers
should know about it.

The last and I think the most important method is `visitStr`.  All it does
is checking the last element of the `in_call` list, and generates a warning
if a raw string is found somewhere that is not inside a translation function
call.

For accurate reports, there is a `get_func_name()` function that takes an
`ast` node as an argument.  As function call can be anything from actual
functions to object methods, this goes all down the node’s properties, and
recursively reconstructs the name of the actual function.

Finally, there are some test functions in this code.  `tst` and
`actual_tests` are there so if I run a self-check on this script, it will
find these strings and report all the untranslated strings and all the
potential problems like the string concatenation.

#### Drawbacks

There are several drawbacks here.  First, translation function names are
built in, to the `TRANSLATION_FUNCTIONS` property of the `ShowString` class.
You must change this if you use other translation functions like
`dngettext`, or if you use a translation library other than `gettext`.

Second, it cannot ignore untranslated strings right now.  It would be great
if a pragma like `flake8`’s `# noqa` or `coverage.py`’s `# pragma: no cover`
could be added.  However, `ast` doesn’t parse comment blocks, so this proves
to be challenging.

Third, it reports docstrings as untranslated.  Clearly, this is wrong, as
docstrings generally don’t have to be translated.  Ignoring them, again, is
a nice challenge I couldn’t yet overcome.

The `get_func_name()` helper is everything but done.  As long as I cannot
remove that final `else` clause, there may be error reports.  If that
happens, the reported class should be treated in a new `elif` branch.

Finally (and the most easily fixed), the warnings are simply printed on the
console.  It is nice, but it should be optional; the problems identified
should be stored so the caller can obtain it as an array.

#### Bottom line

Finding strings in Python sources is not as hard as I imagined.  It was fun
to learn using the `ast` module, and it does a great job.  Once I can
overcome the drawbacks above, this script will be a fantastic piece of code
that can assist me in my future tasks.
