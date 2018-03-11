---
id: 183
title: The unreliable Internet Explorer
date: 2010-02-18T00:00:00+00:00
dsq_thread_id:
  - "5434820471"
categories:
  - Technology
tags:
  - Website Optimization
image: 
  path: /images/2010/02/hate_ie.jpg
  caption: "Photo by: [http://www.flickr.com/photos/blubrblog/](BlubrNL)"
---
I was stuck with this problem today, and thought I should write a blog post about it, so should anyone encounter the same thing, they won't waste time trying to track exactly what's happening.

Basically it was flagged to me this morning by my project manager that when you tried to submit a form that calls for a report generation using the enter key, the report would not be generated.

I then tried the same pattern (on **Firefox**), and obviously got results. Project managers are known to use I**nternet Explorer**, so I dusted off my IE 8, and tried the same thing.<!--more-->

Obviously got the same error, the report would not be generated.
  
I then started to compare what was being passed, once you tried to submit the form by clicking on the submit button, or by hitting enter.

Here are the dumps:
  
**<span style="text-decoration: underline;">By clicking the submit button:</span>**
  
<img src="http://files.placona.co.uk/the_unreliable_ie/with_generate.jpg" alt="Generate Report" width="150" height="172" />

**<span style="text-decoration: underline;">By hitting the enter key:</span>**
  
**<span style="text-decoration: underline;"><img src="http://files.placona.co.uk/the_unreliable_ie/without_generate.jpg" alt="Generate Report on IE" width="150" height="152" /></span>**

For those who can't spot the difference (believe me, it took me a while to spot it), when you submit using the enter key, it **DOES NOT** pass the button (generate) as an attribute.

Turns out this report relies on the variable called "generate" to be passed, so it knows when to query the database, and display the data.

Lesson learned, never rely on button fields being passed to decide if data will be shown or not.
