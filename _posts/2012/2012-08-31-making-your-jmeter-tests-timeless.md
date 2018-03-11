---
id: 1120
title: Making your JMeter tests timeless.
date: 2012-08-31T15:45:16+00:00
dsq_thread_id:
  - "5436807248"
categories:
  - Technology
tags:
  - General Techie Stuff
  - Javascript
---
At work, we use [Apache JMeter](http://jmeter.apache.org) for load testing applications or API's we build.

JMeter is an amazing open source tool with an even more [amazing community](www.apache.org/foundation/getinvolved.html) behind it, so if you've never used it, you surely are missing on a great piece of software.

Anyway, one thing that used to annoy me a bit, was the fact that when creating tests for API's, I'd sometimes need to pass in dates.

So imagine the following case:

You're testing that your API can create a new book in your bookstore for a specified date, but the business rules imply that you can only create a new book with a release date in the future.

If I had hard coded this to a date in the near future, I would then need to update it at some point as to always make sure my dates really were in the future.

I could also put a date very far in the future, but my business rules again dictate that I can only pass in dates up to 60 days in advance, so I'd end up having to update my tests in about two months or so.

**Come the user defined variables:**

With JMeter, you can create "**user defined variables**" (add -> config element -> user defined variables) and assign values to it. Those variables can be created with JavaScript, so you could potentially create a variable in there, that would always default to today's date plus a given number of days (in this example anything that didn't exceed 60 days)

[<img class="aligncenter size-full wp-image-1131" title="JMeter - User Defined Variables" alt="JMeter - User Defined Variables" src="/images/2012/08/30-08-2012-09-45-581.png" width="765" height="156" srcset="/images/2012/08/30-08-2012-09-45-581.png 765w, /images/2012/08/30-08-2012-09-45-581-300x61.png 300w" sizes="(max-width: 765px) 100vw, 765px" />](/images/2012/08/30-08-2012-09-45-581.png)

The code for your user defined variable would look like this:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/3525850">Gist</a>.
  </noscript>
</div>

What it does is simply create a new date, add 60 days to it, and then format it as "yyyy-mm-dd". You could change the number of days and format easily by moving things around.

A sample request would then look something like this:

```xml
<book>
	<name>The Magic Book</name>
	<isbn>0123456789</isbn>
	<category>children</category>
	<release>${date}</release>
</book>
```

Which would generate a request as such:

```xml
PUT http://my.api.com/v1/books/add

PUT data:
<?xml version="1.0" encoding="UTF-8"?>
<book>
	<name>The Magic Book</name>
	<isbn>0123456789</isbn>
	<category>children</category>
	<release>2012-11-01</release>
</book>
```

And with that, your tests become timeless, as you can run then whenever you like without having to worry about updating dates.
