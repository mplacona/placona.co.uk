---
id: 126
title: Apache 101 - Cache Control
date: 2009-04-30T00:00:00+00:00
categories:
  - Technology
---
Continuing with my Apache series, I'll be today talking about cache control.

According to <a style="text-decoration:underline;" href="http://en.wikipedia.org/wiki/Cache" target="_blank">Wikipedia</a>, the definition for cache is:

"_a collection of data duplicating original values stored elsewhere or computed earlier, where the original data is expensive to fetch (owing to longer [access time](http://en.wikipedia.org/wiki/Access_time "Access time")) or to compute, compared to the cost of reading the cache. In other words, a cache is a temporary storage area where frequently accessed data can be stored for rapid access. Once the data is stored in the cache, it can be used in the future by accessing the cached copy rather
  
than re-fetching or recomputing the original data._"

We are going to be using two different modules here **mod_expires** and **mod_headers**. They handle cache control through http headers sent from the webserver.

So let us install them:

```bash
sudo a2enmod expires
sudo a2enmod headers
```

We are also gonna be using **mod_deflate**, but since you probably read <a style="text-decoration:underline;" href="https://www.placona.co.uk/apache-101-compressing-files/" target="_self">my last post</a> where I tell how to install and configure it, I won't be covering its usagein this post.

Now, on our vhost file, we will add a few directives. This is how I do when using this website as an example:

```bash
sudo nano /etc/apache2/sites-available/placona.co.uk
```

And will add this anywhere before my <Directory> tag:

```bash
ExpiresActive On
ExpiresDefault "access plus 300 seconds"
```

Which means I'm enabling cache, and it will only expire 300 seconds (5 minutes) after it was last accessed. You can change this to any value that suits you. I then add this to the bottom of my directory tag:

```bash
ExpiresByType text/html "access plus 1 day"
ExpiresByType text/css "access plus 1 day"
ExpiresByType text/javascript "access plus 1 day"
ExpiresByType image/gif "access plus 1 month"
ExpiresByType image/jpg "access plus 1 month"
ExpiresByType image/png "access plus 1 month"
ExpiresByType application/x-shockwave-flash "access plus 1 day"
```

Which is where I set specific MIME types to have specific cache times. The word **access** could be replaced by the word **modified** here, where access means the content "expires" after a certain period of time since it was last accessed, and modified means it expires a certain period of time after it was last modified.

You can now restart you Apache 

```bash
/etc/init.d/apache2 restart
```

As I said previously, you could be doing it on your `.htaccess` instead of vhosts. You would only need to have the:

```bash
AllowOverride All
```

Command in your <Directory> tag. I don't like using it, as it creates security holes in the server, but that's really up to you.

Well, and that's all you have to do. I hope you've enjoyed this tutorial.
