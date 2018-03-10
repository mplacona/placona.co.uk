---
id: 1439
layout: post
title: Dart - Futures and HTTP requests
date: 2014-04-29T20:14:51+00:00
categories:
  - Dart
---
I [wrote a little article](http://www.placona.co.uk/1433/open-source/retrieving-githubs-gists-with-dart/ "Retrieving GitHub’s gists with Dart") about how to retrieve <abbr title='code snippets' rel='tooltip'>gists</abbr> from GitHub, and [+Seth Ladd](http://www.placona.co.uk/1433/open-source/retrieving-githubs-gists-with-dart/ "Retrieving GitHub’s gists with Dart") quite rightly pointed something out.

<img class="alignnone size-full wp-image-1440" src="http://www.placona.co.uk/wp-content/uploads/2014/04/seth_makes_a_good_point.png" alt="Seth Ladd makes a good point" width="517" height="156" srcset="https://www.placona.co.uk/wp-content/uploads/2014/04/seth_makes_a_good_point.png 517w, https://www.placona.co.uk/wp-content/uploads/2014/04/seth_makes_a_good_point-300x90.png 300w" sizes="(max-width: 517px) 100vw, 517px" />

Let me elaborate a little bit on what he means.

```java
getGistsForUser(String user){
  this.user = user;
  var url = "https://api.github.com/users/${this.user}/gists";
  http.get(url)
    .then(_processResults)
    .catchError(_handleError);
}
```

In my sample code (cut down for brevity, but you can still check it out <a title="Retrieving GitHub’s gists with Dart - Gist" href="https://gist.github.com/mplacona/11332667" target="_blank">here</a>), I am indeed using Futures, so the thread is not locked to this request, and my code could be happily doing other things. However, I'm not informing the client about this future, or allowing it to make use of it.

So when I make a request to it, I'm simply doing:

```java
gists.getGistsForUser(username);
```

Which works in this case as my `getGistsForUser` method is dealing with displaying the gists itself; therefore the client isn't waiting as the method returns void.

If I then wanted to get my client know exactly when the method had returned, I would need to make changes to my code by simply making the method `getGistsForUser` return a Future. This is what the code would look like after making a few changes:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/mplacona/11398580">Gist</a>.
  </noscript>
</div>

As you can see, I've only updated a few things, but now my response is handled by my client.

To simplify, I have written a much simpler example that only handles an HTTP request, without prompting the user for any information.

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/mplacona/11398906">Gist</a>.
  </noscript>
</div>

And this is how you go about returning futures from HTTP requests
