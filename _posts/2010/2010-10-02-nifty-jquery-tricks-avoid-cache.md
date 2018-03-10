---
id: 606
title: Nifty jQuery tricks - Avoid Cache
date: 2010-10-02T23:19:19+00:00
dsq_thread_id:
  - "5440051536"
categories:
  - JavaScript
---
I found this two function yesterday while working on one of our applications.

We are turning a very boring page into a full blown jQuery powered page. It's got loads of functionalities being turned into Ajax calls to give the user a better experience. We are really taking usability into account, and minimizing things like page refresh or reloads is essential.

One thing that got to us, was the fact that IE8 insists in caching some Ajax contents when loading things too quickly (i.e. if a link is clicked, and a tab is clicked subsequently).

This is easily fixable by adding a timestamp to the request, so whenever a link is clicked, the request would be doing something like:

```javascript
var tS=new Date().getTime();
$.ajax({
    url: searcher,
    data: {timestamp:tS},
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        //something here
}});
```

The code above will do the job, but you have to remember to always use the timestamp, and pass it on.
  
Another better way of doing it, is by using the <a title="jQuery - Ajax Setup" href="http://api.jquery.com/jQuery.ajaxSetup/" target="_blank">ajaxSetup</a> function.

According to the documentation, ajaxSetup sets default values for future Ajax requests. So in other words, every Ajax request made after ajaxSetup will obey the directives defined by it.

One of this directives happens to be called "cache", and if set to "false", will make sure every Ajax request has the current timestamp appended to the URL. You can simply add it to your code as such:

```javascript
$(document).ready(function() {
   $.ajaxSetup({ cache: false });
   // put all your jQuery goodness in here.
 });
 ```

Now all of your requests will look like this:
  
http://my_server.com?123456789
  
There are also other settings that can be added inside ajaxSetup. They can be found on the [jQuery.ajax()](http://api.jquery.com/jQuery.ajax/ "jquery.ajax() - Documentation") documentation, and all the settings listed in there will also work with ajaxSetup.
  
Hope this tip is useful to someone.
