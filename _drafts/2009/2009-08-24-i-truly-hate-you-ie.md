---
id: 170
title: I truly hate you IE!
date: 2009-08-24T00:00:00+00:00
categories:
  - Technology
tags:
  - Website Optimization
---
<p style="text-align: center;">
  <img src="http://files.placona.co.uk/ie_sucks/ievsff.jpg" alt="Firefox vs. IE" /><br /> (Photo: <a title="Photo by Kay Kim" rel="nofollow" href="http://www.flickr.com/photos/8906966@N02/3449863166/" target="_blank">Kay Kim</a>)
</p>

I just came across a very interesting bug on my website. I've made a post on **twitter** today asking the local CSS gurus if they knew of any way to fix this:
  
<a title="Click to Enlarge" href="http://files.placona.co.uk/ie_sucks/ie_screwed_big.jpg" target="_blank"><img style="border: 0;" src="http://files.placona.co.uk/ie_sucks/ie_screwed.png" alt="IE screws up again" width="350" height="233" /></a>
  
As you can see, the contents were being shifted about 150px to the left from where they were supposed to be (you can click on the image above to see it bigger). Only IE does it, every other browser (**Safari**, **Chrome**, **Opera**, **Firefox** (few different versions including Linux)) simply displays the page correctly.<!--more-->


  
I was thinking it was something really funky that would take me hours to debug. The guys over at twitter came up with various different solutions, but most of them had div floats or margins involved.
  
I was ready to get started and get my hands dirty with it.
  
I then opened my local version of the blog, and couldn't reproduce it. I tried IE7, IE8 on windows XP and Vista, and couldn't get it to shift things over to the left. I gotta be honest, at this time I really thought I was out of lucky, as I could only think that my website was out of synch with SVN.
  
I checked SVN (both on the website and my local version), and they were running the same revision. I then remembered that my homepage is published, and rewritten to another URL (flat HTML page) in order to save on resources, and load the page faster.
  
I the enabled URL rewriting on my local server and was able to reproduce the error.
  
I couldn't really find anything different, as both the dynamic and the static pages are suppose to have the same HTML contents when read by the browser. The only difference is that my Flat HTML pages have a comment on the very top of it with its generation date and time. Something like:

```xml
<!-- published on {ts '2009-08-24 20:38:53'} -->
```

I would never think this would make any difference, but as soon as I deleted it, my page started to render properly. i the moved it to be generated at the bottom of my pages instead of the top, and now everything works a treat.
  
I can't really explain why IE didn't like my HTML comments on the top of the page if I'm honest. W3C doesn't seem to have a problem with it when it validates my HTML.
  
The message here is: <span style="text-decoration: underline;"><strong>IE is evil</strong></span>, and will complain about the minimum thing just in order to bug you and steal your evenings.
