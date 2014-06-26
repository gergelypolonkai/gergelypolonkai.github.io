---
layout:    post
title:     "Registering an enum type in GLib’s type system"
date:      2013-01-06 02:34:03+00:00
tags:      [c, development, glib]
permalink: /blog/2013/1/6/registering-an-enum-type-in-glib-s-type-system
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I faced a problem in my [GLib](https://developer.gnome.org/glib/) self-teaching
project, [wMUD](https://github.com/gergelypolonkai/wmud) today. I wanted to
register a signal for a `GObject`, whose handler should accept two `enum`
parameters for which I had to register a new `GEnum` type in the `GObject` type
system. However, the [documentation on this
feature](https://developer.gnome.org/gobject/unstable/gtype-non-instantiable.html)
(thanks for pointing out goes to hashem on `#gnome-hackers`) is not… uhm…
obvious. Making the long story short, I have checked with the `GIO` sources for
an example, and using that, I have created this small, working chunk:

{% highlight c %}
#ifndef __WMUD_CLIENT_STATE_H__
#define __WMUD_CLIENT_STATE_H__

#include <glib-object.h>

/**
 * WmudClientState:
 * @WMUD_CLIENT_STATE_FRESH: Client is newly connected. Waiting for a login
 *     player name
 * @WMUD_CLIENT_STATE_PASSWAIT: Login player name is entered, waiting for a
 *     login password
 * @WMUD_CLIENT_STATE_MENU: Authentication was successful, player is now in the
 *     main game menu
 * @WMUD_CLIENT_STATE_INGAME: Character login was successful, player is now
 *     in-game
 * @WMUD_CLIENT_STATE_YESNO: Player was asked a yes/no question, and we are
 *     waiting for the answer. client.yesNoCallback MUST be set at this point!
 *     TODO: if wmudClient had a prevState field, and there would be some hooks
 *     that are called before and after the client enters a new state, this
 *     could be a three-state stuff, in which the player can enter e.g ? as
 *     the answer, so they would be presented with the question again.
 * @WMUD_CLIENT_STATE_REGISTERING: Registering a new player. Waiting for the
 *     e-mail address to be given
 * @WMUD_CLIENT_STATE_REGEMAIL_CONFIRM: E-mail address entered séms valid,
 *     waiting for confirmation
 *
 * Game client states.
 */
typedef enum {
	WMUD_CLIENT_STATE_FRESH,
	WMUD_CLIENT_STATE_PASSWAIT,
	WMUD_CLIENT_STATE_MENU,
	WMUD_CLIENT_STATE_INGAME,
	WMUD_CLIENT_STATE_YESNO,
	WMUD_CLIENT_STATE_REGISTERING,
	WMUD_CLIENT_STATE_REGEMAIL_CONFIRM
} WmudClientState;


GType wmud_client_state_get_type (void) G_GNUC_CONST;
#define WMUD_TYPE_CLIENT_STATE (wmud_client_state_get_type())

#endif /* __WMUD_CLIENT_STATE_H__ */
{% endhighlight %}

{% highlight c %}
#include "wmudclientstate.h"

GType
wmud_client_state_get_type (void)
{
	static volatile gsize g_define_type_id__volatile = 0;

	if (g_once_init_enter(&g_define_type_id__volatile)) {
		static const GEnumValue values[] = {
			{ WMUD_CLIENT_STATE_FRESH,            "WMUD_CLIENT_STATE_FRESH",            "fresh"            },
			{ WMUD_CLIENT_STATE_PASSWAIT,         "WMUD_CLIENT_STATE_PASSWAIT",         "passwait"         },
			{ WMUD_CLIENT_STATE_MENU,             "WMUD_CLIENT_STATE_MENU",             "menu"             },
			{ WMUD_CLIENT_STATE_INGAME,           "WMUD_CLIENT_STATE_INGAME",           "ingame"           },
			{ WMUD_CLIENT_STATE_YESNO,            "WMUD_CLIENT_STATE_YESNO",            "yesno"            },
			{ WMUD_CLIENT_STATE_REGISTERING,      "WMUD_CLIENT_STATE_REGISTERING",      "registering"      },
			{ WMUD_CLIENT_STATE_REGEMAIL_CONFIRM, "WMUD_CLIENT_STATE_REGEMAIL_CONFIRM", "regemail-confirm" },
			{ 0,                                  NULL,                                 NULL }
		};
		GType g_define_type_id = g_enum_register_static(g_intern_static_string("WmudClientState"), values);
		g_once_init_leave(&g_define_type_id__volatile, g_define_type_id);
	}

	return g_define_type_id__volatile;
}
{% endhighlight %}

Still, it can be made more perfect by using the
[glib-mkenums](http://developer.gnome.org/gobject/stable/glib-mkenums.html)
tool. I will read through the GLib Makefiles tomorrow for some hints on
this.
