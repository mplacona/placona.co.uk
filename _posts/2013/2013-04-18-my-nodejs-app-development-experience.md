---
id: 1244
layout: post
title: My NodeJS app development experience
date: 2013-04-18T18:27:57+00:00
categories:
  - Javascript
tags:
  - General Techie Stuff
---
So, I decided to take a punt at writing a <a title="NodeJS" href="http://nodejs.org/" target="_blank">NodeJS</a> application. Not a big application, or anything that would get me slashdoted, but an application that would help me understand the language, and give me a taste of what it is so many people are talking a bout. I have worked with JavaScript for quite a while now, and NodeJS seems like one of those "just right" languages, that you pick up in an afternoon and come to love it after writing a few lines of code. I read a few tutorials on the subject. And then decided to dive straight into building a small application that uses GitHub's API. There were three things I wanted to take out of it:

  * learn a bit about the ins and outs of NodeJS
  * use [GitHub's API](http://developer.github.com/v3/ "Github API")
  * use <a title="Jade Templating Engine" href="http://jade-lang.com/" target="_blank">Jade templating engine</a>

Installing everything was painless, but I have to admit getting NodeJS to build on a <a title="Raspberry Pi" href="http://www.raspberrypi.org/" target="_blank">Raspberry PI</a> wasn't the most straight forward thing I've ever done. Not because it wouldn't work, but because building it from source took forever. Just to clarify, I didn't need to run it on a Raspberry PI, but just wanted to prove myself I could. This mini project had 5 elements to it:

  * <a title="NodeJS" href="http://nodejs.org/" target="_blank">NodeJS</a>
  * <a title="Twitter Bootstrap" href="http://twitter.github.io/bootstrap/" target="_blank">Twitter's Bootstrap</a>
  * <a title="JAde Templating Engine" href="http://jade-lang.com/" target="_blank">Jade</a>
  * <a title="NodeJS Express" href="http://expressjs.com/" target="_blank">Express</a>
  * GitHub API (<a title="GitHub's API for NodeJS" href="https://github.com/ajaxorg/node-github" target="_blank" class="broken_link">node-github</a>)

Three from which you don't even need to install (as they are <a title="NPM JS" href="https://npmjs.org/" target="_blank">npm </a>modules). Just by adding them as dependencies on the package.js file, they get installed into your project, so deploying is made easier (in theory), as you don't actually need to install anything other than NodeJS.

Now you might be asking yourself why I say "in theory" when taking about deployment. The fact is that deploying a **NodeJS application is a pain**, since all you end up doing is making [your preferred webserver here] proxy all the calls to your local application. Why? you may be asking...

The fact that each NodeJS application you create establishes its own server, means anything will clash with your already installed webserver, since you can only have one webserver per TCP port. So if you want to host all your applications as well as any new node project you come up with, then you will end up taking this route. It's not terrible, but just means you now need to support yet another thing. There are tools out there to help you with such thing, but let's not digress.

Building the application was fairly painless, and using Jade was the big highlight for me. For a while now I had looked into templating engines, and really wanted to delve into it a little more. I had previously looked at jQuery Templates, Ext and Dust.js, but Jade is totally different, in a way that actually pleases the eyes (except when it doesn't :-)).

Did I become a NodeJs expert? **No way!**

Will I keep looking and building sexy applications with it? **Heck yeah!**

Enough about me though.

Have a look at the application I wrote <a title="Langithub" href="http://langithub.placona.co.uk/" target="_blank" class="broken_link">here</a>, and make sure to <a title="Langithub - Pull Requests" href="https://github.com/mplacona/LanGitHub" target="_blank">send me pull requests</a> if you would like to improve it.
