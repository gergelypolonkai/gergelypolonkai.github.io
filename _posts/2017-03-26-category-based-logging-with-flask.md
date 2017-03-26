---
layout:    post
title:     "Category-based logging with Flask"
date:      2017-03-26 22:00:52
tags:      [development, python, flask]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I’m in a team who are developing a Flask-based web application, which uses
logging extensively.  For a while now it spews out a lot of lines so the
need arose to index them in ElasticSearch, and more importantly, to search
through them for auditing purposes.  This latter user story brought up one
more question: why don’t we categorize our log messages?  I quickly came up
with an extended log format (`[auth]` is the new category name):

    [2017-01-14 00:55:42,554] [8286] [INFO] [auth] invalid password for john@example.com [at __init__.py:12, in function utils.validate_login]

Here, `[auth]` is the category name.  In the ideal solution, all I’d have to
do is adding `%(category)s` to my formatter, and I could call
`app.logger.info('auth', 'invalid password')` to achieve this output.
Unfortunately, `Flask.logger` (and, in the background, the `logging` module)
is not that easy to tame.

As it turns out, a Flask application’s `logger` property is a subclass of
`logging.Logger`, so my first idea was to monkey patch that class.  When the
app’s logger is initialised, it subclasses `logging.Logger` and tweaks the
log level so it goes down to `logging.DEBUG` if the app is running in debug
mode.  This is done by using a different logger class depending on the app
config.  Fortunately it doesn’t directly subclass `logging.Logger`; it calls
`logging.getLoggerClass()` to find which class it should extend.  To achieve
my goals, all I had to do is to subclass the original logger class, and pass
it to `logging.setLoggerClass()` *before* I initialise my app, and I have a
fail-safe(ish) solution.  So far so good, on to the extra category
parameter.

Now if you add a new variable to the formatter like my new `%(category)s`,
you get a nifty `KeyError` saying there is no `category` in the format
expansion dictionary.  If you add `category='auth` to the
`app.logger.info()` calls and its cousins, it’s fine, because these methods
use the magic `\*\*kwarg` argument to swallow it. Everything goes well until
control arrives to the `\_log()` method: it complains about that extra
`category` keyword argument.  Taking a peek at Python’s internals, I found
two things: `info()`, `error()`, and co. pass `\*args` and `\*\*kwargs` to
`\_log()` unmodified, and the `\_log()` method doesn’t have `\*\*kwargs`
present in its definition to swallow it.  A little doc reading later I found
that if I want to pass extra arguments for such a formatter, I should do it
via the `extra` keyword argument to `\_log()`.  A call like
`app.logger.info('invalid password', extra={'category': 'auth'})` solved the
problem.  Now *that* is tedious.

My first idea was to override all the standard logging methods like `info()`
and `error()`, and handle `category` there.  But this resulted in lots of
repeating code.  I changed the specification a bit, so my calls would look
like `info('message', category='auth)` instead of the original plan of
`info('auth', 'message')`: as the logging methods pass all keyword arguments
to `\_log()`, I can handle it there.  So at the end, my new logger class
only patches `\_log()`, by picking out `category` from the kwarg list, and
inserting it to `extra` before calling `super`.

As you can see, this is a bit ugly solution.  It requires me, the app
author, to know about Flask’s internals (that I can set my own logging class
before the app is created, and so the app will use it.)  This means if Flask
developers change the way how logging is done, I have to adapt and find a
workaround for the new version (well, unless they let me directly set the
logging class.  That would make it easy.)

What is worse, I must know about Python internals.  I know the `extra` kwarg
is documented well (I just failed to notice), but this made adding a new
formatter variable so hard.  Python version doesn’t change as often as Flask
version in this project, and I think the standard library won’t really
change until 4.0, so I don’t think my tampering with a “protected” method
will cause any trouble in the future.  Still, this makes me feel a bit
uneasy.

All the above can be circumvented if this class, and the whole solution have
some tests.  As my class uses the same method as Flask (use
`logging.getLoggerClass()` as a base class instead of using
`logging.Logger()` directly), if the base logger class changes in Python or
in the running environment, my app won’t care.  By checking if the app
logger can use my special `category` variable (ie. it doesn’t raise an
exception *and* the category actually gets into the log output), I made sure
my class is used as a base in Flask, so if they change the way they
construct `app.logger`, I will know about it when I first run my tests after
upgrading Flask.

If you are interested in such functionality (and more), you can grab it
from [GitHub](https://github.com/gergelypolonkai/flask-logging-extras), or
via [PyPI](https://pypi.python.org/pypi/Flask-Logging-Extras/).
