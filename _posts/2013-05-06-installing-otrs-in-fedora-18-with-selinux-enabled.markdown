---
layout:    post
title:     "Installing OTRS in Fedora 18 with SELinux enabled"
date:      2013-05-06 06:01:52+00:00
tags:      [fedora, selinux, otrs]
permalink: /blog/2013/5/6/installing-otrs-in-fedora-18-with-selinux-enabled
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I’ve read somewhere in an OTRS installation howto that if you want to install
OTRS, you will have to disable SELinux. Well, I won’t.

During the last few months, I have been using Fedora 18 with SELinux on all of
my desktop machines and on my notebook, and I had no problems at all.
Meanwhile I got familiar with SELinux itself, and got used to solving problems
caused by it. So I started `tail -f /var/log/httpd/error_log` in one terminal
(to see if something Apache related thing appears),
`tail -f /var/log/audit/audit.log` in another (to see errors caused by
SELinux), opened the admin manual at the installation chapter, took a deep
breath, and went on.

Throughout this article, I will refer to OTRS 3.2.6 as OTRS and Fedora 18
(with only “stock” repositories) as Fedora. I assume that you have already
installed OTRS in a non-SELinux environment before, and that you have at least
some basic knowledge about SELinux, MAC, RBAC, and all the like. I’m
installing OTRS in `/opt/otrs`, so if you install it somewhere else, you will
have to modify the paths below. Also, if you happen to install under
`/var/www` (I wouldn’t recommend it), that directory already has the
`httpd_sys_content_t` type, so you won’t have to set it explicitly.

As the first step I have unpacked the archive to `/opt/otrs`. This directory
is the OTRS default, many config files have it hardcoded, and changing it is
no easy task.

Running `otrs.CheckModules.pl` gave me a list of missing perl modules. Red Hat
and Fedora makes it easy to install these, as you don’t have to know the RPM
package name, just the perl module name:

    yum install 'perl(Crypt::SSLeay)' \
                'perl(DBD::Pg)' \
                'perl(GD)' \
                'perl(JSON::XS)' \
                'perl(GD::Text)' \
                'perl(GD::Graph)' \
                'perl(Mail::IMAPClient)' \
                'perl(Net::DNS)' \
                'perl(PDF::API2)' \
                'perl(Text::CSV_XS)' \
                'perl(YAML::XS)'

I also needed to install `mod_perl`. Although `otrs.CheckModules.pl` didn’t
mention it, the default settings use syslog as the logging module, so unless
you change it in `Config.pm`, you will also need to install
`'perl(Unix::Syslog)'`, either.

The default SELinux policy doesn’t permit any network connection to be
initiated by Apache httpd. As OTRS needs to connect to its database, you
need to enable it explicitly. In older distributions, the
`httpd_can_network_connect` was the SELinux boolean for this, but recent
installations also have a `httpd_can_network_connect_db` flag. As far as I
know, this enables all network connections to the well-known database
servers’ default port, but I will have to check for it. For me, with a
MySQL listening on its standard port, the
`setsebool httpd_can_network_connect_db=1` command just did it.

With SELinux enabled, Apache won’t be able to read anything that’s not
marked with the `httpd_sys_content_t` type, nor write anywhere without the
`httpd_sys_rw_content_t` type. The trivial, quick and dirty solution is to
label all the files as `httpd_sys_rw_content_t`, and let everything go.
However, the goal of SELinux is just the opposite of this: grant access
only to what is really needed. After many trial-and-error steps, it finally
turned out that for OTRS to work correctly, you must set

* `httpd_sys_content_t`
  * on `/opt/otrs/var/httpd/htdocs`
* `httpd_script_exec_t`
  * on `/opt/otrs/bin/cgi-bin`
* `httpd_sys_rw_content_t`
  * on `/opt/otrs/Kernel`
  * on `/opt/otrs/var/sessions`
  * on `/opt/otrs/var/log` (unless you use syslog for logging)
  * on `/opt/otrs/var/packages` (this is used only when you download an .opm
    package)
  * on `/opt/otrs/var/stats`
  * on `/opt/otrs/var/tmp`
  * on `/opt/otrs/bin` (I wonder why this is required, though)

To do this, use the following command:

    # semanage fcontext -a -t <context> <directory regex>

Where `<directory regex>` is something like `/opt/otrs/Kernel(/.*)?`. When
this is done, all you have to do is running `restorecon -vR /opt/otrs` so
it will relabel everything with the correct types (you can omit -v, I just
like to see what my software does).

The last thing I faced is that Fedora is more restrictive on reading
directories other than `/var/www`. It has a `Require all denied` on
`<Directory />`, and a `Require all granted` on `<Directory /var/www>`, so
`/opt/otrs/var/httpd/htdocs` will throw a
`403 Forbidden (client denied by server configuration)` error. To get rid
of this, I had to modify `scripts/apache2-httpd.include.conf` and add
`Require all granted` to both the `cgi-bin` and `htdocs` directories.

As I will have to use OTRS in a production environment soon with SELinux
enabled, it is more than sure that this list will change in the near future.
As there are no official documentation on this (I haven’t find one yet), I
have to do it with the trial-and-error way, so be patient!
