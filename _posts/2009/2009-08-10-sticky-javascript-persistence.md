---
id: 164
title: Sticky JavaScript Persistence
date: 2009-08-10T00:00:00+00:00
categories:
  - Javascript
tags:
  - Website Optimization
---
<img src="http://files.placona.co.uk/taffy_sticky_js/postit.jpg" alt="Sticky Javascript Persistence" width="480" height="418" />
  
On my [last blog post](https://www.placona.co.uk/166/javascript/a-more-elaborated-jquery-drag-drop-cloning/ "A more Elaborated jQuery Drag & Drop") I explained how to create a drag and drop using cloning, so you can can drag & drop multiple objects
  
I've recently been working on a personal project where I need some persistence on the client's browser.

At first I thought about using Ajax to save at every user interaction, but then I realized it might be a bad idea, as this could possibly result in hundreds (if not thousands) database calls.

I then started to tinker with JavaScript arrays. They are useful but can be a nightmare when they grow too big and need to be updated at specific points.

My last resource would be Twitter, there's loads of experienced developer there, so why not ask for some advice?

As soon as I posted my question about browser persistence with JavaScript, I got a couple of options from twips, but the one that impressed me the most was <a title="Rey Bango - Twitter" href="http://twitter.com/reybango" target="_blank">@reybango</a>'s suggestion, which is what  I'm gonna be talking about on this very blog post.
