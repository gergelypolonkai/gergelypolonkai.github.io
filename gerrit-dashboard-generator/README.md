# Dashboard URL generator for Gerrit

This little HTML file will generate URLs for Gerrit Dashboards. As constructing such URL is a real PITA, I created this tool to make my, and fellow developers’ life easier.

## Usage

To use the tool, put it on a static webserver (opening it from your local machine won’t work, as it loads its dependencies from CDN hosts). For example, if you have Python installed, you can use

    python -m SimpleHTTPServer 8000

and access the page via http://127.0.0.1:8000/. Static (ie. local machine-compatible) version is on the table, so if you can’t fire up a static webserver, check back soon(ish).
