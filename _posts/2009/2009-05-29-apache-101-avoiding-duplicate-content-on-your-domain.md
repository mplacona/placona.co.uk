---
id: 143
title: Apache 101 - Avoiding duplicate content on your domain.
date: 2009-05-29T00:00:00+00:00
categories:
  - VPS
---
Did you know that search engines consider things like _http://www.placona.co.uk/index.cfm_ and  _http://placona.co.uk/index.cfm_ as duplicate content? It might sound like a wise thing to do, as your site would be accessible by whichever URL related to your domain. I'll say here it's not, as search engines like Google consider this an offense and will penalize you should they think you're doing it on purpose.
  
Google normally are very strict and harsh with people trying to "play" with their search engine, or people who try to [black hat SEO](http://en.wikipedia.org/wiki/Black_hat_seo "Black Hat SEO"). And content duplication might be just what will put your domain on the bottom of their search.

I then thought about a very slick way of getting rid of content duplication. You can simply create a rule on your **.htaccess** (or **httpd.conf** as that's what I use), and will will take care of redirecting any request to non-www to a www version of your website.

This is how I do it:

```bash
RewriteEngine on
RewriteCond %{HTTP_HOST} !^www.placona.co.uk$
RewriteRule ^(.*)$ http://www.placona.co.uk/$1 [R=301]
```

Basically I'm, telling my server that every single call to a non-www version of my domain will be redirected (in a proper way as it uses 301) to the www version.

One then could ask what to do in case you have **parked domains**, which are simple alias used to redirect the user to another domain. You can simply add them all to your rules as such:

```bash
RewriteCond %{HTTP_HOST} ^2nddomain.com [OR]
RewriteCond %{HTTP_HOST} ^3rddomain.com [OR]
RewriteCond %{HTTP_HOST} ^placona.co.uk
RewriteRule ^(.*)$ http://www.placona.co.uk/$1 [R=301]
```

Obviously this is only the tip of the iceberg, but it sure helps to put your site up.
  
If you would like to read more about duplicate content, you might take a look at [this link](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=66359 "Duplicate Content").
