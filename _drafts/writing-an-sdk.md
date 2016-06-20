---
layout:    post
title:     "Lessens you learn while writing an SDK"
date:      2016-03-19 12:34:56
tags:      [development]
published: false
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

In the last few months I’ve been working on a GLib based SDK for
client applications that want to communicate with a Matrix.org
homeserver.

For whoever doesn’t know it, Matrix is a decentralized network of
servers (Homeservers). Clients can connect to them via HTTP and send
messages (events, in Matrix terminology) to each other. They are
called events because these messages can be pretty much anything from
instant messages through automated notifications to files or, well,
actual events (such as a vCalendar); anything that you can serialize
to JSON can go through this network.

My original intention was to integrate Matrix based chat into
Telepathy, a DBus based messaging framework used by e.g. the GNOME
desktop (more specifically Empathy, GNOME's chat client.) After
announcing my plans among the Matrix devs, I quickly learned some
things:

1. they are more than open to any development ideas
1. they really wanted to see this working
1. they would have been happy if there were a GLib or Qt based SDK

With my (far from complete) knowledge in GLib I decided to move on
with this last point, hoping that it will help me much when I finally
implement the Telepathy plugin.

## Matrix devs are open minded

What I learned very quickly is that Matrix devs are very open minded
folks from different parts of the world. They are all individuals with
their own ideas, experiences and quirks, yet, when it comes to that,
they steer towards their goals as a community. Thus, getting
additional information from them while reading the spec was super
easy.

## The specification is easy to understand

Except when it is not. For these cases, see the previous point.

Jokes asidu, anyone who worked with communications protocols or JSON
APIs before can get along with it fast. The endpoints are all
documented, and if something is unclear, they are happy to help
(especially if you patch up the spec afterwards.)


## Copying the SDK for a different language is not (always) what you want

I started my SDK in C, trying to mimic the Python SDK. This was a
double fail: the Python SDK was a volatile WiP, and C and Python are
fundamentally different.

During the upcoming weeks this became clear and I switched to the Vala
language. It is much easier to write GObject based stuff in Vala,
although I had to fall back to C to get some features working. I also
planned and implemented a more object oriented API, which is easier to
use in the GObject world.