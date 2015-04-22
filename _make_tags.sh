#! /bin/sh
#
# Find all tags in all posts under _posts, and generate a file for
# each under blog/tag. Also, if a tag page does not contain the tag:
# or layout: keywords, the script will include them in the front
# matter.

layout="posts-by-tag"

for tag in `grep -h ^tags: _posts/* | sed -e 's/^tags:      \[//' -e 's/\]$//' -e 's/, /\n/g' | sort | uniq`
do
    tag_file="blog/tag/${tag}.html"

    if [ ! -f $tag_file ]
    then
        cat <<EOF > $tag_file
---
layout: $layout
tag:    $tag
---
EOF
    else
        if ! grep "^tag:    ${tag}$" $tag_file &> /dev/null
        then
            sed -i "0,/---/! s/---/tag:    $tag\\n---/" $tag_file
        fi

        if ! grep "^layout: " $tag_file &> /dev/null
        then
            sed -i "0,/---/! s/---/layout: $layout\\n---/" $tag_file
        fi
    fi
done
