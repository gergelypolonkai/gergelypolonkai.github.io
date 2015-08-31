---
layout:    post
title:    "How my e-mail gets to that other guy?"
date:      2015-08-27 23:47:19+02:00
tags:      [technology]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

A friend of mine asked me how it is possible that she pushes buttons on her
keyboard and mouse, and in an instant her peer reads the text she had in her
mind. This is a step-by-step introduction of what happens in-between.

#### From your mind to your computer

When you decide to write an e-mail to an acquaintance of yours, you open up
your mailing software (this document doesn’t cover using mail applications
you access through your browsers, just plain old Thunderbird, Outlook or
similar programs. However, it gets the same after the mail left your
computer), and press the “New Mail” button. What happens during this process
is not covered in this article, but feel free to ask me in a comment! Now
that you have your Mail User Agent (MUA) up and running, you begin typing.

When you press a button on your keyboard or mouse, a bunch of bits gets
through the wire (or through air, if you went wireless) and get into your
computer. I guess you learned about Morse during school; imagine two
[Morse operators](http://www.uscupstate.edu/academics/education/aam/lessons/susan_sawyer/morse%20code.jpg),
one in your keyboard/mouse, and one in your computer. Whenever you press a
key, that tiny creature sends a series of short and long beeps (called 0 or
1 bits, respectively) to the operator in your computer (fun fact: have you
ever seen someone typing at an amazing speed of 5 key presses per second?
Now imagine that whenever that guy presses a key on their keyboard, that
tiny little Morse operator pressing his button 16 times for each key press,
with perfect timing so that the receiving operator can decide if that was a
short or long beep.)

Now that the code got to the operator inside the machine, it’s up to him to
decode it. The funny thing about keyboards and computers is that the
computer doesn’t receive the message “Letter Q was pressed”, but instead
“The second button on the second row was pressed” (a number called scan
code). At this time the operator decodes this information (in this example
it is most likely this Morse code: `···-···· -··-····`) and checks one of
his tables titled “Current Keyboard Layout.” It says this specific key
corresponds to letter ‘Q’, so it forwards this information (I mean the
letter; after this step your computer doesn’t care which plastic slab you
hit, just the letter ‘Q’) to your MUA, inserts it into the mail in its
memory, then displaying it happily (more about this step later).

When you finish your letter you press the send button of your MUA. First it
converts all the pretty letters and pictures to something a computer can
understand (yes, those Morse codes, or more precisely, zeros and ones,
again). Then it adds loads of meta data, like your name and e-mail address,
the current date and time including the time zone and pass it to the sending
parts of the MUA so the next step can begin.

#### IP addresses, DNS and protocols

The Internet is a huge amount of computers connected with each other, all of
them having at least one address called IP address that looks something like
this: `123.234.112.221`. These are four numbers between 0 and 255 inclusive,
separated by dots. This makes it possible to have 4,294,967,296 computers.
With the rules of address assignment added, this is actually reduced to
3,702,258,432; a huge number, still, but it is not enough, as in the era of
the Internet of Things everything is interconnected, up to and possibly
including your toaster. Thus, we are slowly transitioning to a new
addressing scheme that looks like this:
`1234:5678:90ab:dead:beef:9876:5432:1234`. This gives an enormous amount of
340,282,366,920,938,463,463,374,607,431,768,211,456 addresses, with only
4,325,185,976,917,036,918,000,125,705,034,137,602 of them being reserved,
which gives us only a petty
335,957,180,944,021,426,545,374,481,726,734,073,854 available.

Imagine a large city with
[that many buildings](http://www.digitallifeplus.com/wp-content/uploads/2012/07/new-york-city-aerial-5.jpg),
all of them having only a number: their IP address. No street names, no
company names, no nothing. But people tend to be bad at memorizing numbers,
so they started to give these buildings names. For example there is a house
with the number `216.58.209.165`, but between each other, people call it
`gmail.com`. Much better, isn’t it? Unfortunately, when computers talk, they
only understand numbers so we have to provide them just that.

As remembering this huge number of addresses is a bit inconvenient, we
created Domain Name Service, or DNS for short. A “domain name” usually (but
not always) consist of two strings of letters, separated by dots (e.g.
polonkai.eu, gmail.com, my-very-long-domain.co.uk, etc.), and a hostname is
a domain name occasionally prefixed with something (e.g. **www**.gmail.com,
**my-server**.my-very-long-domain.co.uk, etc.) One of the main jobs of DNS
is to keep record of hostname/address pairs. When you enter `gmail.com`
(which happens to be both a domain name and a hostname) in your browser’s
address bar, your computer asks the DNS service if it knows the actual
address of the building that people call `gmail.com`. If it does, it will
happily tell your computer the number of that building.

Another DNS job is to store some meta data about these domain names. For
such meta data there are record types, one of these types being the Mail
eXchanger, or MX. This record of a domain tells the world who is handling
incoming mails for the specified domain. For `gmail.com` this is
`gmail-smtp-in.l.google.com` (among others; there can be multiple records of
the same type, in which case they usually have priorities, too.)

One more rule: when two computers talk to each other they use so called
protocols. These protocols define a set of rules on how they should
communicate; this includes message formatting, special code words and such.

#### From your computer to the mail server

Your MUA has two settings called SMTP server address SMTP port number (see
about that later). SMTP stands for Simple Mail Transfer Protocol, and
defines the rules on how your MUA, or another mail handling computer should
communicate with a mail handling computer when *sending* mail. Most probably
your Internet Service Provider gave you an SMTP server name, like
`smtp.aol.com` and a port number like `587`.

When you hit that send button of yours, your computer will check with the
DNS service for the address of the SMTP server, which, for `smtp.aol.com`,
is `64.12.88.133`. The computer puts this name/address pair into its memory,
so it doesn’t have to ask the DNS again (this technique is called caching
and is widely used wherever time consuming operations happen).

Then it will send your message to the given port number of this newly
fetched address. If you imagined computers as office buildings, you can
imagine port numbers as departments and there can be 65535 of them in one
building. The port number of SMTP is usually 25, 465 or 587 depending on
many things we don’t cover here. Your MUA prepares your letter, adding your
e-mail address and the recipients’, together with other information that may
be useful for transferring your mail. It then puts this well formatted
message in an envelope and writes “to building `64.12.88.133`, dept. `587`”,
and puts it on the wire so it gets there (if the wire is broken, the
building does not exist or there is no such department, you will get an
error message from your MUA). Your address and the recipient’s address are
inside the envelope; other than the MUA, your own computer is not concerned
about it.

The mailing department (or instead lets call it the Mail Transfer Agent,
A.K.A. MTA) now opens this envelope and reads the letter. All of it, letter
by letter, checking if your MUA formatted it well. More than probably it
also runs your message through several filters to decide if you are a bad
guy sending some unwanted letter (also known as spam), but most importantly
it fetches the recipients address. It is possible, e.g. when you send an
e-mail within the same organization, that the recipient’s address is handled
by this very same computer. In this case the MTA puts the mail to the
recipient’s mailbox and the next step is skipped.

#### From one server to another

Naturally, it is possible to send an e-mail from one company to another, so
these MTAs don’t just wait for e-mails from you, but also communicate with
each other. When you send a letter from your `example@aol.com` address to me
at `gergely@polonkai.eu`, this is what happens.

In this case, the MTA that initially received the e-mail from you (which
happened to be your Internet Service Provider’s SMTP server) turns to the
DNS again. It will ask for the MX record of the domain name specified by the
e-mail address, (the part after the `@` character, in my case,
`polonkai.eu`), because the server mentioned there must be contacted, so
they can deliver your mail for me. My domain is configured so its primary MX
record is `aspmx.l.google.com` and the secondary is
`alt1.aspmx.l.google.com` (and 5 more. Google likes to play it safe.) The
MTA then gets the first server name, asks the DNS for its address, and tries
to send a message to the `173.194.67.27` (the address of
`aspmx.l.google.com`), same department. But unlike your MUA, MTAs don’t have
a pre-defined port number for other MTAs (although there can be exceptions).
Instead, they use well-known port numbers, `465` and `25`. If the MTA on
that server cannot be contacted for any reason, it tries the next one on the
list of MX records. If none of the servers can be contacted, it will retry
based on a set of rules defined by the administrators, which usually means
it will retry after 1, 4, 24 and 48 hours. If there is still no answer after
that many attempts, you will get an error message back, in the form of an
e-mail sent directly by the SMTP server.

Once the other MTA could be contacted, your message is sent there. The
original envelope you used is discarded, and a new one is used with the
address and dept. number (port) of the receiving MTA. Also, your message
gets altered a little bit, as most MTAs are kind enough (ie. not sneaky) to
add a clause to your message stating “the MTA at <organization> has checked
and forwarded this message.”

It is possible, though not likely, that your message gets through more than
two MTAs (one at your ISP and one at the receiver’s) before arriving to its
destination. At the end, an MTA will say that “OK, this recipient address is
handled by me”, your message stops and stays there, put in your peer’s
mailbox.

##### The mailbox

Now that the MTA has passed your mail to the mailbox team (I call it a team
instead of department because the tasks described here are usually handled
by the MTA, too), it reads it. (Pesky little guys are these mail handling
departments, aren’t they?) If the mailbox has some filtering rules, like “if
XY sends me a letter, mark it as important” or “if the letter has a specific
word in its subject, put it in the XY folder”, it executes them, but the
main point is to land the message in the actual post box of the recipient.

#### From the post box to the recipients computer

When the recipient opens their MUA, it will look to a setting usually called
“Incoming mail server”. Just like the SMTP server, it has a name and port
number, along with a server type. This type can vary from provider to
provider, and is usually one of POP3 (pretty old protocol, doesn’t even
support folders on its own), IMAP (a newer one, with folders and message
flags like “important”), MAPI (a dialect of IMAP, created by Microsoft as
far as I know), or plain old mbox files on the receiving computer (this last
option is pretty rare nowadays, so I don’t cover this option. Also, if you
use these, you most probably don’t really need this article to understand
how these things work.) This latter setting defines the protocol, telling
your MUA how to “speak” to the post box.

So your MUA turns to the DNS once more to get the address of your incoming
mail server and contacts it, using the protocol set by the server type. At
the end, the recipients computer will receive a bunch of envelopes including
the one that contains your message. The MUA opens them one by one and reads
them, making a list ordered by their sender or subject, or the date of
sending.

#### From the recipient’s comupter to their eyes

When the recipient then clicks on one of these mails, the MUA will fetch all
the relevant bits like the sender, the subject line, the date of sending and
the contents itself and sends it to the “printing” department (I use quotes
as they don’t really print your mail on paper, they just convert it to a
nice image so the recipient can see it. This is sometimes referred to as a
rendering engine). Based on a bunch of rules they pretty-print it and send
it to your display as a new series of Morse codes. Your display then decides
how it will present it to the user: draw the pretty pictures if it is a
computer screen, or just raise and lower some hard dots that represents
letters on a Braille terminal.
