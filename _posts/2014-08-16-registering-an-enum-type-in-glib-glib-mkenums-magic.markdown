---
layout:    post
title:     "Registering an enum type in GLib, glib-mkenums magic"
date:      2014-08-16 15:10:54+00:00
tags:      [development, c, glib]
permalink: /blog/2014/8/16/registering-an-enum-type-in-glib-glib-mkenums-magic
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

In [this
post](/blog/2013/1/6/registering-an-enum-type-in-glib-s-type-system) I said
I will get through the GLib Makefiles to add an enum type to GLib in a more
sophisticated way.

In my other project,
[SWE-GLib](https://github.com/gergelypolonkai/swe-glib) I already used this
method. The following two rules in `Makefile.am` create `gswe-enumtypes.h`
and `gswe-enumtypes.c`.

{% highlight make %}
gswe-enumtypes.h: $(gswe_enum_headers) gswe-enumtypes.h.template
        $(GLIB_MKENUMS) --template $(filter %.template,$^) $(filter-out %.template,$^) > \
        gswe-enumtypes.h.tmp && mv gswe-enumtypes.h.tmp gswe-enumtypes.h
gswe-enumtypes.c: $(gswe_enum_headers) gswe-enumtypes.h gswe-enumtypes.c.template
        $(GLIB_MKENUMS) --template $(filter %.template,$^) $(filter-out %.template,$^) > \
        gswe-enumtypes.c.tmp && mv gswe-enumtypes.c.tmp gswe-enumtypes.c
{% endhighlight %}

`$(GLIB_MKENUMS)` is set in `configure` with
`AC_PATH_PROG([GLIB_MKENUMS], [glib-mkenums])`.

This approach requires the GNU Autotools (you can get rid of it by changing
`$(GLIB_MKENUMS)` to the path to `glib-mkenums` binary), and two template
files, one for the header and one for the code. `$(gswe_enum_headers)`
contains a list of all the header files that have enum types defined
throughout the project.

{% highlight c %}
/*** BEGIN file-header ***/
/* gswe-enumtypes.h - Enumeration types for SWE-GLib
 *
 * Copyright © 2013 Gergely Polonkai
 *
 * SWE-GLib is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * SWE-GLib is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
 */
#ifndef __GSWE_ENUM_TYPES_H__
#define __GSWE_ENUM_TYPES_H__
#include <glib-object.h>

/*** END file-header ***/

/*** BEGIN file-production ***/
/* enumerations from "@filename@" */

#include "@filename@"
/*** END file-production ***/

/*** BEGIN value-header ***/
GType @enum_name@_get_type(void);
#define @ENUMPREFIX@_TYPE_@ENUMSHORT@ (@enum_name@_get_type())
/*** END value-header ***/

/*** BEGIN file-tail ***/

#endif /* __GSWE_ENUM_TYPES_H__ */
/*** END file-tail ***/
{% endhighlight %}

{% highlight c %}
/*** BEGIN file-header ***/
/* gswe-enumtypes.c - Enumeration types for SWE-GLib
 *
 * Copyright © 2013 Gergely Polonkai
 *
 * SWE-GLib is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * SWE-GLib is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
*/
#include "swe-glib.h"
#include "gswe-enumtypes.h"
#include "@filename@"

/*** END file-header ***/

/*** BEGIN file-production ***/
/* enumerations from "@filename@" */
/*** END file-production ***/

/*** BEGIN value-header ***/
GType
@enum_name@_get_type(void)
{
    static volatile gsize g_define_type_id__volatile = 0;

    gswe_init();

    if (g_once_init_enter(&g;_define_type_id__volatile)) {
        static const G@Type@Value values[] = {
/*** END value-header ***/

/*** BEGIN value-production ***/
            {
                @VALUENAME@,
                "@VALUENAME@",
                "@valuenick@"
            },
/*** END value-production ***/

/*** BEGIN value-tail ***/
            { 0, NULL, NULL }
        };

        GType g_define_type_id = g_@type@_register_static(
                g_intern_static_string("@EnumName@"),
                values
            );

        g_once_init_leave(&g;_define_type_id__volatile, g_define_type_id);
    }

    return g_define_type_id__volatile;
}

/*** END value-tail ***/
{% endhighlight %}
