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

In the last few months I've been working for a GLib based SDK for
client applications that want to communicate with a Matrix.org
homeserver.

For whoever doesn't know it, Matrix is a decentralized network of
servers (Homeservers). Clients can connect to them via HTTP and send
messages (events, in Matrix terminology) to each other. They call them
events because these messages can be pretty much anything from instant
messages through automated notifications to files or, well, actual
events (like as a vCalendar); anything that you can serialize to JSON
can go through this network.