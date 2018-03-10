---
id: 1361
layout: post
title: Matrix effect with Dart
date: 2014-03-24T13:53:51+00:00
categories:
  - Dart
---
After my [last post on Dart](http://www.placona.co.uk/1321/technology/a-first-look-at-dart/ "A first look at Dart"), I decided that I wanted to write something a bit more complex using the language. I had a lot of good feedback on it, but still felt I should try to push the language as much as I could, and see if it was a really enjoyable language to write code in.

So what better than a couple of hours on a Sunday evening to write some code and generate some animations?

I tried my best to be as descriptive as I could on the code. But it's so simple... some things are better left unsaid.

<img class="alignnone size-full wp-image-1362" alt="Dart Matrix" src="http://www.placona.co.uk/wp-content/uploads/2014/03/dart_matrix.gif" width="542" height="337" />

The premise of the code, is the following:

  1. Generate a random character from a list of random characters. I used 1's & 0's as when I look at them...
  
    > All I see is blonde, brunette, red-head

  2. I then move the numbers (drops) around the screen, and make sure they are always moving down, 'till they reach the end of the screen. Then it's time to re-use them again at the top. <a title="Performance Matters" href="https://plus.google.com/u/0/explore/perfmatters" target="_blank">#perfmatters</a> after all.
  3. Canvas really gives me all I need to give my animation a transitional effect when it starts (it looks a lot nicer on the browser than the animated gif above).
  4. Make the awesomeness happen again and again every 30 milliseconds by only writing 60 enjoyable lines of code.

The code can be found on my GitHub account:

<a title="Dart Matrix Effect on GitHub" href="https://github.com/mplacona/dart_matrix" target="_blank">https://github.com/mplacona/dart_matrix</a>

As I said, it's pretty self explanatory, but it would be really nice to get someone else's pair of eyes on it, and getting some advice on where I could improve it.

It seems to run on roughly 54fps on Dartium, but I've seen dips occurring sometimes.
