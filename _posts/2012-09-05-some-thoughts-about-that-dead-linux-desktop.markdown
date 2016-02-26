---
layout:    post
title:     "Some thoughts about that dead Linux Desktop"
date:      2012-09-05T09:01:31Z
tags:      [linux]
permalink: /blog/2012/9/5/some-thoughts-about-that-dead-linux-desktop
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

There were some arguments in the near past on [What Killed the Linux
Desktop](http://tirania.org/blog/archive/2012/Aug-29.html). After reading many
replies, like [Linus
Torvalds’](http://www.zdnet.com/linus-torvalds-on-the-linux-desktops-popularity-problems-7000003641/),
I have my own thoughts, too.

I know my place in the world, especially in the online community. I’m a Linux
user for about 15 years and a Linux administrator for 10 years now, beginning
with WindowMaker and something that I remember as GNOME without a version
number. I have committed some minor code chunks and translations in some minor
projects, so I’m not really into it from the “write” side (well, until now,
since I have began to write this blog, and much more, but don’t give a penny
for my words until you see it).

I’m using Linux since 2.2 and GNOME since 1.whatever. It’s nice that a program
compiled years ago still runs on today’s Linux kernel, especially if you see
old DOS/Windows software failing to start on a new Windows 7 machine. I
understand Linus’ point that breaking external APIs is bad, and I think it can
work well on the kernel’s level. But the desktop level is much different. As
the Linux Desktop has such competitors (like OS/X and Windows’ Aero and Metro),
they have to give something new to the users almost every year to keep up with
them. Eye candies are a must (yes, of course my techy fellows, they are
worthless, but users *need* it), and they can not be created without extending
APIs. And the old API… well, it fades away fast. I don’t really understand
however, why they have to totally disappear, like
[GTK_DIALOG_NO_SEPARATOR](http://developer.gnome.org/gtk/stable/GtkDialog.html#GtkDialogFlags)
in Gtk3. It could be replaced with a 0 value (e.g: it won’t do anything). This
way my old Gtk2 program could compile with Gtk3 nicely. Also, there could be a
small software that goes through your source code and warn you about such
deprecated (and no-doer but still working) things. Porting applications between
Gtk (and thus, GNOME) versions became a real pain, which makes less enthusiast
programmers stop developing for Linux. Since I’m a GNOME guy for years, I can
tell nothing about Qt and KDE, but for the GNOME guys, this is a bad thing. As
of alternatives, there is Java. No, wait… it turned out recently that [it has
several security
bugs](http://www.theregister.co.uk/2012/08/31/critical_flaw_found_in_patched_java).
Also it’s not that multiplatform as they say (I can’t find the article on
that at the moment, but I have proof). Also, the JVMs out there eat up so much
resources, which makes it a bit hard and expensive to use.

Also, I see another problem: those blasted package managers. RPM, DPKG,
Portage, whatever. What the hell? Why are there so many? Why do developers
reinvent the wheel? The nave is too small or there are to few spokes? Come on…
we live in an open source world! Contribute to the one and only package manager
(which one is that I don’t actually care)! I’m sure the two (three, many)
bunches of develoeprs could make a deal. Thus, it could become better and
“outsider” companies would be happier to distribute their software for Linux
platforms.

And now that we get to the big companies. I don’t really understand them.
nVidia and ATI made their own closed source drivers for Linux. Some other
hardware vendors also write Linux drivers, and as the kernel API doesn’t really
change, they will work for a long time. But what about desktop
application vendors? Well, they try to stick to a desktop environment or two,
and if they change too frequently, they stop developing for Linux, like Skype
did (OK, maybe Skype has other reasons, but you see my point). But why? The
main part for Linux programs is the Linux kernel and the basic userland like
libc/stdlib++. If you write graphical software, it will have to use X-Windows.
Yes, it’s much different in many ways, mostly because they have a… well… pretty
ugly design by default. But still, it’s the same on every Linux distributions,
as it became somewhat an industry standard, as it was already on the market
back in the old UN\*X days. The protocol itself changed just like the Linux
kernel: almost no change at all, just some new features.

So what kills the Linux desktop in my opinion is these constant wars inside,
and the lack of support from the outside. Open Source is good, but until these
(mostly the first) problems are not resolved, Linux Desktop can do nothing on
the market. It’s a downward spiral hard to escape.
