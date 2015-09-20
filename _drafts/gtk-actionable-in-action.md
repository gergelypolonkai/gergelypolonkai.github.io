---
layout: post
title: "GtkActionable in action"
author:
  name: "Gergely Polonkai"
  email: "gergely@polonkai.eu"
---

I have seen several people (including myself) struggling with
disabling/enabling menu items, toolbar buttons and similar UI
interfaces based on different conditions. It gets even worse if there
are multiple representations of the same action in the same
application, e.g. a menu item and a toolbar button exists for the same
action. But with GTK+ 3.4, we have GtkAction, which is exactly for
this kind of situations.