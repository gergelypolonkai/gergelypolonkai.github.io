---
layout:    post
title:     "Symfony 2 – Create role- and class-based ACLs with your roles coming from the ORM"
date:      2012-09-16 18:39:25+00:00
tags:      [php, symfony]
permalink: /blog/2012/9/16/symfony-2-create-role-and-class-based-acls-with-your-roles-coming-from-the-orm
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

During the last weeks I had some serious issues with one of my private Symfony
2 projects. One of my goals was to create a dynamic security system, e.g my
administrators wanted to create roles, and grant these roles access to
different object types (classes) and/or objects.

So I have created a `User` entity, which implements `UserInterface` and
`AdvancedUserInterface`, the latter for the possibility to enable/disable
accounts and such. It had a `$roles` property, which was a `ManyToMany` relation
to the `Role` entity, which implemented `RoleInterface`. Also I have created my
own role hierarchy service that implements `RoleHierarchyInterface`.

So far so good, first tests. It soon turned out that if `User::getRoles()`
returns a `DoctrineCollection` as it does by default, then the standard

{% highlight php %}
$this->get('security.context')->isGranted('ROLE_ADMIN');
{% endhighlight %}

doesn’t work. I know, it should not be hard coded, as my roles and permission
tables are dynamic, I have just tested. So I fixed my `User` entity so
`getRoles()` returns an array of `Role` objects instead of the
`DoctrineCollection`. Also I implemented a `getRolesCollection()` method to
return the original collection, but I think it will never be used.

After that, I had to implement some more features so I put this task away.
Then, I tried to create my first ACL.

{% highlight php %}
$securityIdentity = new RoleSecurityIdentity('ROLE_ADMIN');
$objectIdentity = new ObjectIdentity('newsClass', 'Acme\\DemoBundle\\Entity\\News');
$acl = $aclProvider->createAcl($objectIdentity);

$acl->insertClassAce($securityIdentity, MaskBuilder::MASK_OWNER);
$aclProvider->updateAcl($acl);
{% endhighlight %}

I was about to check if the user who is logged in has an `OWNER` permission on
the `User` class.

{% highlight php %}
$this->objectIdentity = new ObjectIdentity(self::OBJECT_ID, self::OBJECT_FQCN);
if ($this->securityContext->isGranted('OWNER', $this->objectIdentity) === false) {
    throw new AccessDeniedException('You don’t have the required permissions!');
}
{% endhighlight %}

The ACL was defined based on a role, so everyone who had the `ROLE_ADMIN` role
should gain access to the user listing page. But they didn’t. It took several
weeks to find the cause, I have put it on
[stackoverflow](http://stackoverflow.com/questions/12057795/symfony-2-1-this-getsecurity-context-isgrantedrole-admin-returns-fa)
and the Symfony Google Group, but no usable answers.

Then I went off for debugging. Setting up NetBeans for xdebug-based PHP
debugging was real fun under Fedora, but that’s another story. After a while I
have found that Symfony’s basic access decision manager checks for
`$role->getRole()` only if `$role` is an instance of
`Symfony\Component\Security\Core\Role\Role`, instead of checking if the object
implements `Symfony\Component\Security\Core\Role\RoleInterface`. So I’ve
checked if the bug is already reported. It turned out that it was, and my
solution was available in a specific commit about a year ago, but as [Johannes
Schmitt commented, it would introduce a security
issue](https://github.com/symfony/symfony/commit/af70ac8d777873c49347ac828a817a400006cbea),
so it was reverted. Unfortunately neither Johannes Schmitt, nor Fabien
Potencier (nor anyone else) could (or wanted) to tell about this issue. So the
final (and somewhat hack-like) solution was to extend
`Symfony\Component\Security\Core\Role\Role`. And boom! It worked.
