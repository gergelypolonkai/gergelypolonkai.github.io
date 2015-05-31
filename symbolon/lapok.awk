BEGIN {
    FS = "\t"
}
{
    printf "%s", "      <div class=\"card " $3 "\">\n"
    printf "%s", "        <a id=\"card_" $1 "\" class=\"fancybox\" rel=\"group\" href=\"images/" $1 ".jpg\">"
    printf "%s", "<img src=\"images/" $1 ".jpg\" alt=\"" $2 "\">"
    printf "%s", "</a>\n"
    printf "%s", "        <p class=\"cim\">" $2 "</p>\n"
    printf "%s", "      </div>\n\n"
}
