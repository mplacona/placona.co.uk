---
id: 160
title: Speed up yor website - Part 1
date: 2009-07-21T00:00:00+00:00
categories:
  - Technology
tags:
  - General Techie Stuff
  - VPS
  - Website Optimization
---
Assets such as stylesheets, images and videos are often the major hit taken by a webserver when a webpage is loaded. I'm often trying to improve my page loads by using published pages (flat html) and rewrites, so I don't need to run a dynamic page when it's not necessary.

Publishing usually brings a great deal of improvement, and <a title="Apache 101 - Cache Control" href="https://www.placona.co.uk/apache-101-cache-control/" target="_self">browser cache</a> and [compression](https://www.placona.co.uk/apache-101-compressing-files/ "Apache 101 - Compressing Files") often help a lot too, but sometimes you just need to load assets on every single page load, and if you have lots of new users every day, browser cache will usually do very little, as this new users will need to hit the webserver and get the images for the first time in order to have it cached.

It's been proved that loading assets from different domains helps "trick" the browser into multi-tasking, so it doesn't have to wait until **asset1** on the domain **domain.com** is loaded to start downloading **asset2** on the same domain.

### <span style="text-decoration: underline;">The first approach:</span>

Most people simply create sub-domains such as **assets1. domain.com**, **assets2.domain.com** and so on. The assets are then called from the sub-domains, so the browser "thinks" it's coming from a different location, when in reality, they normally always target the same structure.

This approach helps a lot, and if you, like me, enjoy monitoring this kind of thing, there's a noticeable difference in loading times.

A downside to it is that you're still hitting your webserver, and now even harder, as you're making multiple connections at once to it. If you are loading images or small files, you shouldn't have a problem, but things will start to get uglier if you try to load videos or heavier files.

<!-- <img src="http://files.placona.co.uk/cdn/mockup1.png" alt="Sub-domains approach" width="461" height="242" /> -->

### <span style="text-decoration: underline;">The second approach:</span>

This consists in having a second webserver only to load assets while your main webserver deals with the other calls. A summary of this would be something like:

<!-- <img src="http://files.placona.co.uk/cdn/mockup.png" alt="Two webservers" width="354" height="230" /> -->

Basically what this horribly mocked-up image is trying to say is: You have two webservers using two different ports. The main webserver is the responsible for all the requests, but will redirect every asset call to your second webserver. What people normally do here is use two different kinds of webservers. Most commonly Apache (as the main webserver) and <a title="Lighttpd" href="http://www.lighttpd.net/" target="_blank">lighttpd</a> as the secondary webserver. The reason why people use lighttpd, is because it's incredibly light, and you won't even notice it's there.

The concept is really pretty, but it also means you'll now have to maintain two webservers. The second one (lighttpd) should really be a one off, as once it's configured, it will just serve static contents, but still, it's two webservers on your server, and if anything goes wrong, it's a bit difficult to find what and where it went wrong.

### <span style="text-decoration: underline;">The third approach:</span>

This is by far my favourite one. Basically it consists in hosting your assets somewhere else, where you wont have to maintain or keep an eye on performance, as this server's primary task is to serve this kind of content. A "Buzz Word" really springs to mind here, as we are talking about the so called "**<a title="Cloud Computing" href="http://en.wikipedia.org/wiki/Cloud_computing" target="_blank">Cloud Computing</a>**". Basically it consists of a network of servers in strategic places. We call it strategic places, as the servers are located near you. Well, not near you, but from your IP, it redirects you to the closest server, from where you're gonna be picking up the assets as they are needed.

It works pretty much as a load balancer, but based on location, instead of number of connections. It makes sure that the bits travel the shortest way in order to get to you. Works pretty much like terrestrial TV, where residences located closest to the tower will eventually get a better reception (signal) than the ones far away from it.
  
There's a similarity with approach two when using this method, as it pretty much does the same thing, but uses an external server for serving and caching images. As previously mentioned, this servers are optimized for this task, therefore serving images much faster than the local server.

A representation of it would be as such:

<!-- <img src="http://files.placona.co.uk/cdn/mockup2.png" alt="Cloud Server" width="555" height="253" /> -->

On part two, I will be showing how to have a free "CDN" for your server, and how to maintain it. I put the word CDN surrounded by quotes, as the approach I'll be showing besides being a very common one, doesn't really have all the benefits a true CDN has. But hey, it's **free**!
