---
id: 124
title: Apache 101 - Compressing Files
date: 2009-04-28T00:00:00+00:00
categories:
  - Technology
---
I'm going to start a server configuration series here, where I'll be talking about my goals and frustrations when configuring my own webserver. As most of you know, I've been using <a style="text-decoration:underline;" href="https://www.placona.co.uk/placona-co-uk-has-a-new-home-1/" target="_blank">my own VPS</a> for the last two weeks, and promised to post everything about it here.

I won't be covering things like basic installation, or server set-up. There's tons of them all over the web, and I 'm sure most of them would beat anything I wrote here, as some of those guys are real *nix gurus, while I'm only a learner.

On this post, I'll be talking a little bit more about <a style="text-decoration:underline;" href="http://www.apache.org/" target="_blank">Apache2</a>, and it's configurations; to start with, I'll talk about file compression.

The <a style="text-decoration:underline;" href="http://www.apache.org/" target="_blank">apache server</a> is a really amazing web-server, that let's you configure almost everything, as well as create security rules.

Back to the topic, I'll describe here a few of the necessary steps to enable compression on your apache server. 

Compression saves you a lot of server traffic, and helps to make sure pages are served more quickly. It adds a little bit more load to the server, as the server needs to deal with compressed files now; but this will be automatically compensated by the page loading time, and can be easily remediated with some server caching (which will be my
  
next topic).

In earlier versions of apache, the compressing method used was <a style="text-decoration:underline;" href="http://www.gnu.org/software/gzip/" target="_blank">GZIP</a>. With the apache 2.x, the module has been replaced with <a style="text-decoration:underline;" href="http://httpd.apache.org/docs/2.0/mod/mod_deflate.html" target="_blank">mod_deflate</a>, which is much easier to install, don't need special configurations.

Before we get started, I need to make it clear that this is how you would proceed in a Debian based distro, and this might vary with other distros.

The first thing we need to do, is install the beast on the server:

```bash
a2enmod deflate
```

We the restart apache in order to have the module loaded:

```bash
/etc/init.d/apache2 restart
```

I like to configure compression on a vhost basis instead of global basis, but it's really up to you. In my case, I simply open my vhost and update it.

```bash
sudo nano /etc/apache2/sites-available/placona.co.uk
```

I then simply add the following lines inside my <VirtualHost>

```bash
# compress a few file extensions
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/atom_xml
AddOutputFilterByType DEFLATE application/x-javascript
AddOutputFilterByType DEFLATE text/html
```

It pretty much says everything, but basically, what I'm doing here is telling mod_deflate to compress files with the specific MIME types.

The next section is really important, as it "tells" your server to negotiate the best way to serve files to different browsers. Some browsers cannot handle file compression, and will get crazy when receiving compressed files, so it's important the we also add the following lines right after our deflate commands:

```bash
BrowserMatch ^Mozilla/4 gzip-only-text/html
BrowserMatch ^Mozilla/4.0[678] no-gzip
BrowserMatch ^MSIE !no-gzip !gzip-only-text/html
```

And that's all, simply restart your apache server again.

```bash
/etc/init.d/apache2 restart
```

Your files should now be served with 20 - 30% less volume than before. There's a nice way to check that; go to <a style="text-decoration:underline;" href="http://websiteoptimization.com/services/analyze/" target="_blank">this url</a>, and check your website performance. On the results, it should say if your files are compressed or not. After applying the changes described above, all the MIME common text mime types should be listed as compressed.
