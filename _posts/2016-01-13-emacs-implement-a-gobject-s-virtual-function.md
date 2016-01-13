---
layout:    post
title:     "Emacs: Implement a GObject’s virtual function"
date:      2016-01-13 15:31:12+02:00
tags:      [c, development, emacs]
published: true
author:
  name: "Gergely Polonkai"
  email: "gergely@polonkai.eu"
---

I have recently started creating a GLib implementation of the
Matrix.org API. For that, I have created a GObject interface,
MatrixAPI, which has as many virtual functions as API calls (which is
a lot, and expanding). This way I ended up with the following scenario.

In `matrix-api.h` I had a struct like this, with a lot more elements:

    typedef struct {
        void (*initial_sync)(MatrixAPI *api,
                             MatrixAPICallback callback,
                             gpointer user_data,
                             GError **error);
        void (*sync)(MatrixAPI *api,
                     MatrixAPICallback callback,
                     gpointer user_data,
                     GError **error);
        …

And in `matrix-http-api.c`, which implements `MatrixAPI`, I have a
function like this (again, with a lot more elements):

    static void
    matrix_http_api_matrix_api_init(GObjectInterface *iface)
    {
        iface->initial_sync = i_initial_sync;
        iface->sync = i_sync;
        …
    }

And every time I wanted to implement a new function from the vtable, I
had to copy the prototype, and add an `iface->foo_bar = i_foo_bar`
line and an actual function header for `i_foo_bar` with the same
parameters. That’s a cumbersome job for more than 40 function
headers. But emacs comes to the rescue!

{% gist gergelypolonkai/bfd36be8b515edced3d2 implement-gobject-vfunc.el %}

Now all I have to do is to copy the whole vtable entry into
`matrix_http_api_matrix_api_init()`, execute `M-x
implement-gobject-vfunc`, then put the same vtable entry somewhere
before the interface init function, and execute `M-x
implement-gobject-vfunc-prototype`.