---
id: 1300
layout: post
title: Java + Junit + Ant Template Project
date: 2013-08-04T01:16:44+00:00
categories:
  - Java
tags:
  - Open Source
---
Creating new Java projects is a pain!

I could end this post here, and people would have been satisfied to read it. However, I thought I'd add some more context, and maybe throw a little something.

We've all been there, create a new project, then create the source folders, packages, import necessary libraries, write unit tests and implement your functionality.

Happens every so often, and  I always felt I was wasting time I'd never get back. I then have been using a skeleton Java application from my dropbox, which I'd just simply copy and rename to my needs.

The good news is I decided some people might take advantage of that too, so added it to <a title="Marcos Placona Github" href="https://github.com/mplacona" target="_blank">my Github account</a> to share the love. It takes care of everything for you, so all you need to do is clone it, and run the unit tests.

It even comes with a simple <a title="Apache ANT" href="http://ant.apache.org/" target="_blank">ANT</a> script that will build, run your unit tests, and then clean after itself by removing the .class files.

Not for everyone, I know. But hopefully some people will be able to take advantage of it, and maybe even send me pull requests with modifications.

<a title="Java + Junit + Ant Template Project" href="https://github.com/mplacona/java-junit-template-project" target="_blank">https://github.com/mplacona/java-junit-template-project</a>