---
id: 611
title: Nifty jQuery tricks - Ajax Events
date: 2010-10-04T11:00:37+00:00
dsq_thread_id:
  - "5434820549"
categories:
  - JavaScript
---
As previously mentioned on my [other post](http://www.placona.co.uk/606/jquery/nifty-jquery-tricks-avoid-cache/ "Placona - Nifty jQuery tricks – Avoid Cache"), I'm working on improving usability and user experience within one of our applications.

This application has a somehow complex authentication system managed by <a title="Fusebox" href="http://www.fusebox.org/" target="_blank">Fusebox</a>.

In one of our screens, we've replaced most of the page refreshes with ajax calls, so on the table of contents, the user can modify anything, and it gets saved automatically upon confirmation without the need for clicking buttons or reloading the page.

Our QA soon noticed that if during the process of browsing the page and updating something you got yourself logged out, the authentication system would kick off (as it runs per request), and the whole page would get a bit screwed.

An example of this would be:

<img class="alignnone" title="Ajax Driven Page" src="http://files.placona.co.uk/nifty_jquery_tricks_ajax_events/mockup_small.png" alt="Ajax Driven Page" width="300" height="202" />

When clicking on each of the tabs, they would trigger an Ajax call to a dynamic page that would return some HTML. this HTML would fill up the internal div and display the contents without refreshing.

Now, if while clients were viewing this page they decided to go for a cup of tea and clicked on a tab when they came back after 15 minutes, the following would occur:

<img class="alignnone" title="Ajax Driven page screwing things up" src="http://files.placona.co.uk/nifty_jquery_tricks_ajax_events/mockup2_small.png" alt="Ajax Driven page screwing things up" width="300" height="185" />

That isn't the right behaviour, as the browser is supposed to redirect the user to a login page, and not display this page inside the tabs. in this situation, no matter what the client do, clicking the tabs will always take them to the same screen, which could confuse them.

To get around this, I need to have some kind of hook that will check if the user is logged in before any Ajax requests are made.

Come jQuery to the rescue!

When using any of the Ajax capabilities available through jQuery, you can register a handler to be called when the  request begins.

This can be accomplished with <a title="jQuery - ajaxStart()" href="http://api.jquery.com/ajaxStart/" target="_blank">ajaxStart()</a>. it will kick off whenever you make an Ajax request, and in this case, it works a treat, as it will go through my authentication system, and redirect the page to the login screen should the user have been logged in.

A simple code sample for this would be:

```javascript
$(this).ajaxStart(function() {
     $.ajax({
           url: 'index.cfm?fuseaction=c_common.islogged',
           success: function(data, event) {
             //check the results of the authentication page here
           }
     });
});
```

You can also use <a title="ajaxStop - jQuery" href="http://api.jquery.com/ajaxStop/" target="_blank">ajaxStop()</a> for the exact same effect, but only getting triggered when the Ajax call is finished.
