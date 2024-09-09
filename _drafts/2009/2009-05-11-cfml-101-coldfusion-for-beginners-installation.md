---
id: 137
title: CFML 101 - ColdFusion for beginners - Railo Installation
date: 2009-05-11T00:00:00+00:00
categories:
  - coldfusion
tags:
  - 'CFML - 101'
  - VPS
---
I will start my CFML introductory series with installation. Obviously, you need to have a CFML engine installed in order to be able to run CFML applications locally.
  
As some you know, [I've been using](https://www.placona.co.uk/124/vps/apache-101-compressing-files/ "Apache 101 compressing files"){.noBorder} [Railo](http://www.getrailo.org/ "Railo") a lot recently. Reason being it's now completely free and open source, hence no hassle with licenses on my server. I could go through the whole process of installing every single CFML engine here, but as the documentation for [ColdFusion Server](http://www.adobe.com/products/coldfusion-family.html "ColdFusion Server") for example is really complete, I thought I should start with something less documented, so I can add up to the number of resources over the web.
  
I will describe how to do it in an **Ubuntu** box (Intrepid 8.10 in my case). It's pretty straight forward to do the same on a **Windows** box, and should any of you think it's worth having an article covering windows, leave a comment on this post and I shall come up with something later.
  
I'll describe the whole process here, so after this installation you should have an _up and running_ box, with a webserver (Apache) running on the top of it.
  
The first thing for us is to install [Java](http://www.java.com/en/ "Java website") and its dependencies (in case it's not yet installed). Open up your terminal and type the following:

```
sudo apt-get install sun-java6-jre sun-java6-jdk sun-java6-plugin
```

We then go on and install [Apache](http://www.apache.org/ "Apache.org website") along with its dependencies as well:

```
sudo apt-get install build-essential apache2 sun-java6-jdk apache2-threaded-development
```

You should now be able to open your browser and run http://127.0.0.1 in order to see a page as follows:
  
<img style="margin-left: 10px; margin-right: 10px;" src="http://img515.imageshack.us/img515/4999/apache.png" alt="Apache Check" width="300" height="207" />
  
If you got to this point, you can relax, as you're half way there. If you get anything other than this page, chances are you have gotten something wrong along the way, or your apache is not properly started. In order to do it, simply issue the following command on your terminal:

```
sudo /etc/init.d/apache2 start
```

If all fails, there's always a chance you really missed something, so you can start it from scratch, or send me a message and I'll try to help you.
  
Now it's time to install Railo. Simply go to <http://www.getrailo.org/index.cfm/download/> and look for the **Railo Server** section. There you will find many different versions, but the **All OS** is what we're looking for.
  
Right click on the one that says "without JRE" and "copy link location". Notice it can't be the _express version,_ otherwise our installation won't go through as we expect.
  
<img style="margin-left: 10px; margin-right: 10px;" src="http://img26.imageshack.us/img26/9991/railo.png" alt="Railo link" width="508" height="177" />
  
Now we're gonna go to our **opt** folder. I like to install my stuff in there, that way I always know where things are when I need them.

```
cd /opt
```

We can download Railo now. Remember when you previously copied the "link location"? It's time to use it now. Simply use wget and paste what's on your clipboard as such:

```
sudo wget http://www.getrailo.org/down.cfm?item=/railo/remote/download/3.1.0.012/server/all/railo-3.1.0.012-resin-3.1.2-without-jre.tar.gz
```

Railo will then be downloaded to your **/opt** folder. Once it's there, we need to untar it.

```
sudo tar -xf railo-3.1.0.012-resin-3.1.2-without-jre.tar.gz
```

We then create a symbolic link to it, so it's easier to reference to it in the future:

```
sudo ln -s railo-3.0.2.001-resin-3.1.2-without-jre railo
```

Now to give permission to your user to use your new symbolic link:

```
sudo chown -R myUserName railo
```

And it's installed. You should now be able to run:

```
sudo /opt/railo/bin/httpd.sh start
```

No go back to your browser and open 127.0.0.1:8600. You should then see a screen with some colourful dumps, and a link to the admin. Considering everything went well up to here, you can now compile the Apache Connector.
  
<img style="margin-left: 10px; margin-right: 10px;" src="http://img509.imageshack.us/img509/1479/demo1242071059456.png" alt="Railo admin screen" width="297" height="393" />

```
cd /opt/railo
sudo ./configure --with-apxs=/usr/bin/apxs2
sudo make
sudo make install
```

You can now restart apache, in order to get the newly created connector hooked up with it:

```
sudo /etc/init.d/apache2 restart
```

You can now use the following URL's:
  
<span style="text-decoration: underline;"><strong>Server Status:</strong></span>
  
http://127.0.0.1/caucho-status
  
<span style="text-decoration: underline;"><strong>Server Administrator:</strong></span>
  
http://127.0.0.1/railo-context/admin/server.cfm
  
And that's it. On the next article, I'll be describing how to configure multiple Railo contexts with Apache, as well as how to configure Apache so you have a nice and neat development environment.
