#! /bin/sh
#
# Find all tags in all posts under _posts, and generate a file for
# each under blog/tag. Also, if a tag page does not contain the tag:
# or layout: keywords, the script will include them in the front
# matter.

layout="posts-by-tag"

for tag in `grep -h ^tags: _posts/* | sed -re 's/^tags: +\[//' -e 's/\]$//' -e 's/, /\n/g' | sort | uniq`
do
    tag_file="blog/tag/${tag}.html"
    echo -n "[$tag] "

    if [ ! -f $tag_file ]
    then
        echo "creating ($tag_file)"

        cat <<EOF > $tag_file
---
layout: $layout
tag:    $tag
---
EOF
    else
        updated=0
        if ! egrep "^tag: +${tag}$" $tag_file 2>&1 > /dev/null; then
            echo "adding tag"
            sed -i "0,/---/! s/---/tag:    $tag\\n---/" $tag_file
            updated=1
        fi

        if ! egrep "^layout: +" $tag_file 2>&1 > /dev/null; then
            echo "adding layout"
            sed -i "0,/---/! s/---/layout: $layout\\n---/" $tag_file
            updated=1
        fi

        if [ $updated = 0 ]; then
            echo ""
        fi
    fi
done
