---
id: 140
title: Apache 101 & Case insensitive URL's
date: 2009-05-21T00:00:00+00:00
dsq_thread_id:
  - "5434820231"
categories:
  - Linux
tags:
  - Regular Expressions
  - VPS
---
This is only a quick Apache tip for when you are using mod_rewrite.

I've been working on some rewriting lately, and noticed that when you use them, the pattern applied must match exactly, otherwise you will either get error, or your pattern will never find a match.

Obviously you have a few options when writing your rewrite rules to make it case insensitive, but that means you will have to use it on every single rule.

In my case, I simply want everything to come though as lower case, so even if you hit any of my pages with an upper case URL, it will automatically be rewritten to the same thing, but in lower case, and <a title="HTTP 301" href="http://en.wikipedia.org/wiki/HTTP_301" target="_blank">return 301</a>, so the search engines know the page was permanently moved.

This is how I do it:

```bash
#Make URL's lower case
RewriteEngine On
RewriteMap  lc int:tolower
RewriteCond %{REQUEST_URI} [A-Z]
RewriteRule (.*) ${lc:$1} [R=301,L]
```

The RewriteMap directive needs to be placed on your httpd.conf or VHOST, as it won't work on directory level or .htaccess. Everything else can go on your directory or .htaccess.
