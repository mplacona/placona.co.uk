---
id: 1271
layout: post
title: Running Railo on AppFog... For free!
date: 2013-06-04T21:49:39+00:00
categories:
  - coldfusion
tags:
  - Railo
  - VPS
---
You will have noticed I deviated my blog posts quite a bit from CFML in the last couple of months. That doesn't mean I don't love it anymore, but just that I've been "putting my eggs on lots of other baskets" lately.

This blog is hosted on a VPS, and I haven't really found it necessary to have any CFML engine running on it. I could allocate some memory to have a tiny instance of Railo running, but I'd prefer not having to deal with something else running, since it could easily crash, and take me months to actually realize it. This happened to my <a title="Langithub" href="http://www.placona.co.uk/1244/general-techie-stuff/my-nodejs-app-development-experience/" target="_blank">Langithub</a> project the other day, and I simply didn't notice until someone pinged me to let me know.

However, I do sometimes want to post working examples written in CFML, and I could simply use some of the few free services out there, but... <a href="http://cfmlblog.adamcameron.me/2013/05/we-interrupt-this-service.html" target="_blank">I'd rather not</a>.

So for a blog post I've been working on, I decided I'd give cloud hosting a go. I've been playing with <a title="AppFog" href="https://www.appfog.com/" target="_blank">AppFog</a> for a few weeks now, and noticed it's got a Java Application option listed on the application types it supports. I then went ahead and created one of them called `railo.`

<img class="size-full wp-image-1275 alignnone" alt="AppFog Java App" src="/images/2013/06/Screen-Shot-2013-06-04-at-21.31.032.png" width="560" height="285" srcset="/images/2013/06/Screen-Shot-2013-06-04-at-21.31.032.png 560w, /images/2013/06/Screen-Shot-2013-06-04-at-21.31.032-300x152.png 300w" sizes="(max-width: 560px) 100vw, 560px" />

This now gave me an empty Java Application.

Knowing the folks at Railo provide a download in [war](http://en.wikipedia.org/wiki/WAR_(Sun_file_format) "Java War") format, I went ahead and downloaded it

<img class="alignnone size-full wp-image-1276" alt="Railo .war download" src="/images/2013/06/Screen-Shot-2013-06-04-at-21.37.44.png" width="560" height="472" srcset="/images/2013/06/Screen-Shot-2013-06-04-at-21.37.44.png 560w, /images/2013/06/Screen-Shot-2013-06-04-at-21.37.44-300x252.png 300w" sizes="(max-width: 560px) 100vw, 560px" />

I've put it on $ ~/marcos/railo, but you can put it anywhere you want.

Now within that folder from console, I issued:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/5709409">Gist</a>.
  </noscript>
</div>

This will do two things.

  1. <span style="line-height: 13px;">Prompt you for your appfog login and password</span>
  2. deploy the .war file to the railo project

You will then see a few other things will happen, as it will now be decompressing the war file, and starting your application.

If you now browse your application (using the URL provided by AppFog appending index.cfm to it), you will see Railo has been installed, and you can start rocking on the Cloud.

The example I used here can be seen on <a title="Railo on AppFog" href="http://railo.eu01.aws.af.cm/index.cfm" target="_blank" class="broken_link">http://railo.eu01.aws.af.cm/index.cfm</a>
