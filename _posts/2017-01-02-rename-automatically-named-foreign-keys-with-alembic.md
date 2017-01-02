---
layout:    post
title:     "Rename automatically named foreign keys with Alembic"
date:      2017-01-02 09:41:23
tags:      [mysql, development, flask, python]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I have recently messed up my Alembic migrations while modifying my
SQLAlchemy models.  To start with, I didn’t update the auto-generated
migration files to name the indexes/foreign keys a name, so Alembic used its
own naming scheme.  This is not an actual problem until you have to modify
columns that have such constraints.  I have since fixed this problem, but
first I had to find which column references what (I had no indexes other
than primary key back then, so I could go with foreign keys only).  Here is
a query I put together, mostly using
[this article](http://www.binarytides.com/list-foreign-keys-in-mysql/).

``` sql
SELECT constraint_name,
       CONCAT(table_name, '.', column_name) AS 'foreign key',
       CONCAT(referenced_table_name, '.', referenced_column_name) AS 'references'
FROM information_schema.key_column_usage
WHERE referenced_table_name IS NOT NULL AND
      table_schema = 'my_app';
```

Now I could easily drop such constraints using
`alembic.op.drop_constraint('users_ibfk1', 'users', type_='foreignkey')` and
recreate them with `alembic.op.create_foreign_key('fk_user_client', 'users',
'clients', ['client_id'], ['id'])`
