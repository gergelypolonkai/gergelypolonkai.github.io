<?php
$my = mysqli_connect('localhost', 'gergelypolonkai', 'the8dooM');
$my->select_db('gergelypolonkai');

$st = $my->prepare('SELECT * FROM taggit_tag');
$st->execute();
$res = $st->get_result();
$tags = [];

while ($row = $res->fetch_assoc()) {
    $tags[$row['id']] = $row['slug'];
}

$st = $my->prepare('SELECT * FROM taggit_taggeditem');
$st->execute();
$res = $st->get_result();
$tagging = [];

while ($row = $res->fetch_assoc()) {
    if (!array_key_exists($row['object_id'], $tagging)) {
        $tagging[$row['object_id']] = [];
    }

    $tagging[$row['object_id']][] = $row['tag_id'];
}

$st = $my->prepare('SELECT * FROM blog_post');
$st->execute();
$res = $st->get_result();

while ($row = $res->fetch_assoc()) {
    $date = substr($row['created_at'], 0, 10);
    preg_match('/([0-9]{4})-([0-9]{2})-([0-9]{2})/', $date, $m);
    $url = sprintf("/blog/%d/%d/%d/%s", $m[1], $m[2], $m[3], $row['slug']);
    $file = '_posts/' . $date . '-' . $row['slug'] . '.markdown';

    $out = "---
layout: post
title:  \"{$row['title']}\"
date:   {$row['created_at']}
";

    if (array_key_exists($row['id'], $tagging)) {
        $post_tags = [];
        foreach ($tagging[$row['id']] as $tag) {
            $post_tags[] = $tags[$tag];
        }
        $out .= "tags:   " . join(' ', $post_tags) . "\n";
    }

    $out .= "permalink: {$url}
categories: blog
published: {$row['draft']}
---

{$row['content']}
";

    $fd = fopen($file, "w");
    fputs($fd, $out);
    fclose($fd);
}
