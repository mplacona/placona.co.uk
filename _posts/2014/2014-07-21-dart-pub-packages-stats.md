---
id: 1489
layout: post
title: Dart Pub packages stats
date: 2014-07-21T15:56:38+00:00
dsq_thread_id:
  - "5439506321"
categories:
  - Dart
tags:
  - Open Source
  - Python
---
[Modulecounts](http://modulecounts.com) came to my attention, and I thought the idea was pretty neat.

I contacted Erik (the author), and asked if he would mind also adding Dart.

He replied saying he wouldn't mind, but quite rightly pointed out there seemed to be no way on Dart's package manager to actually find out how many packages were live.

I [asked some community members](https://plus.google.com/111557456465418142877/posts/UonWh4dd2hx) on G+, and while they seemed to have some solutions that kinda worked, there didn't seem to be anything accurate or likely to work every time.

My solution was to then quickly knock-up a scraper up that would navigate through all pages on the website, grab some information and counts, aggregate and then generate a JSON output that could then be used by anyone trying to get some package information.

The JSON package is generated once a day as to not overload the website.

I then created a very simple app-engine client application that consumes the JSON packet, and shows information about it.

Check it out here: <http://pub-stats.appspot.com>

Source code can also be seen in my GitHub account: <https://github.com/mplacona/pub-stats>

I have also exposed another endpoint for anyone wanting to use the JSON packet on their applications.

The packet is also cached daily, to make sure my app-engine account doesn't get abused 🙂

You can see the JSON endpoint here: <http://pub-stats.appspot.com/json>

Collaboration and pull requests welcome!
