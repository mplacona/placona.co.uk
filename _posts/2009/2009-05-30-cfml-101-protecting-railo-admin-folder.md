---
id: 145
title: CFML 101 - Protecting Railo admin folder
date: 2009-05-30T00:00:00+00:00
categories:
  - coldfusion
tags:
  - 'CFML - 101'
  - Linux
  - Railo
  - VPS
---
I have seen people asking this question more than two times now, so I decided it's about time I write a blog post about it. In _ColdFusion_ it was really easy to solve this problem, as _CFIDE_ is a physical folder, so you could simply move it away from the webroot, and it wouldn't be accessible to the entire world.

On **Railo** it's a bit trickier, as the admin and server folders are virtual directories, hence you can't simply "move it away". Obviously it's password protected, so people won't simply have access to it and screw up with your configuration, but a more will powered person could easily brute force into it.

I have to reinforce here that a really will powered lad would probably break into anything, or even log into your server and make it a real mess. It's always good to have this false security sensation though, so I'll post here how I do my own security.
  
I use **Apache HTTPD** as my webserver, so all the steps described here will be related to it, and placed on the httpd.conf (/etc/httpd(or apache2)/conf on Linux and {apache_dir}Apache2.2conf)
  
We'll start by creating a new location on the bottom of httpd.conf

```bash
<Location /railo-context/admin>
  Order deny,allow
  Deny from all
  Allow from 123.456.78 127.0.0.1 100.200.300.400
</Location>
```

We use location, because we can't refer to a directory, as railo-context/admin **IS NOT** a physical directory. We then "say" we want this directory to be forbidden to every single IP except for a list we specify (delimited by a space for each IP).

Notice that the first IP I specified does not have the last part of it. for apache it means anything starting with 123.456.78 will pass. Something like (123.456.78.*). This is normally used by companies, where you will have a range of IP's that need to access the admin.
  
On the second one I specify that I want my own server to be able to see it, in case I want to login to Railo admin from the local computer itself.
  
The third one is just a simple IP. Put as many as you find necessary.

We now have our administrative folders restricted to only a range f IP's. Any other IP get's a message saying it's forbidden, and will never resolve, as the IP's won't match.

Time to reload our configuration so the changes get applied:

```bash
sudo /etc/init.d/httpd reload
```

### **<span style="text-decoration: underline;">Now for the security freaks:</span>**

If you are like me, and can never have enough, you can go even further by applying directory security to it, so anyone that even tries to hit the page will be prompted for login and password. Should they guess your login and passwords, they're IP will still need to match and they will need to know your Railo's password.
  
That's how we do it:
  
Create a .htpasswd file anywhere you fancy. in this example we'll create it on our dummy user's home folder:

```bash
htpasswd -c /home/dummy/.htpasswd jane
```

and

```bash
htpasswd /home/dummy/.htpasswd peter
```

For each other user you want to create inside this same file. notice I don't use **-c** on the second example, as I don't need to create the file anymore, but simply append it with a new user and password. You can read more about it [here](http://httpd.apache.org/docs/2.0/programs/htpasswd.html "Apache - htpasswd").
  
We now go back to out httpd.conf and change our recently created location:

```bash
<Location /railo-context/admin>
Order deny,allow
Deny from all
Allow from 123.456.78 127.0.0.1 100.200.300.400
AuthUserFile /home/dummy/.htpasswd
AuthGroupFile /dev/null
AuthName "You must have a valid login and password to access this page."
AuthType Basic
<Limit GET>
require valid-user
</Limit>
</Location>
```

Same old thing until we reach AuthUserFile, as this "tells" Apache where to look for the password file we've just created, so when someone tried to login, it'll go to the file and see if the values match. You can put any authentication message and limit the number of requests that can be made to this page, so brute force won't break it, as it'll error after a few attemtps.
  
Now, when you try to hit this folder, you will be prompted for login and password. If your login and password satisfy the server, it will then check if you IP matches with the range previously specified. If the server "is happy" with all that, you will then be able to see Railo's admin page, but will still have to type your pasword to be able to see it. Once authenticated you no longer need to type the login and password for that session.
  
Don't forget to reload your configurations again:

```bash
sudo /etc/init.d/httpd reload
```

I by no means think this is the best way to go, but it's one way. There's hundreds of ways to secure your folder, but this one is the one i found to be the easiest and most bullet proof.
  
Feel free to use the comments to post different ways, and I might update this post with it.
