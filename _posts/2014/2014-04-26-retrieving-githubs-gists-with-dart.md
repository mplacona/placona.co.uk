---
id: 1433
layout: post
title: Retrieving GitHub's gists with Dart
date: 2014-04-26T23:21:15+00:00
categories:
  - Dart
tags:
  - Open Source
excerpt: "In this post I will show you how to retrieve GitHub gists with Dart Language"
---
<img class="alignnone size-full wp-image-1434" src="/images/2014/04/dart_gists.gif" alt="Dart Gists" width="542" height="495" />

I just thought I'd write this simple example that shows how to retrieve your GitHub's <abbr title='code snippets' rel='tooltip'>gists</abbr> with Dart language. The focus on this is to show how to handle [Futures](https://www.dartlang.org/docs/tutorials/futures/ "Dart - What is a Future") and make HTTP requests in Dart.

The code is very simple, and runs as a <abbr title='Command Line Interface' rel='tooltip'>CLI</abbr> application. It asks the user for a valid Github login, and tries to fetch the last 30 gist entries for that user.

The main class is as follows:

```java
class Gists{
    // instance variable for user
    String user;
    getGistsForUser(String user){
      this.user = user; 
      var url = "https://api.github.com/users/${this.user}/gists";
      http.get(url)
        .then(_processResults)
        .catchError(_handleError);
    }
      
    _processResults(http.Response jsonString){
      List<String> urls = JSON.decode(jsonString.body);
      urls.forEach((element){
        print(element["html_url"]);
      });
    }
      
    _handleError(Error error){
      print("User ${this.user} not available");
    }
}
```

As you can see, I do an HTTP get to Github's API requesting the gists for my user. I then use [Futures](https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/dart:async.Future "Dart - Futures") to make sure my application doesn't cause blockage while we're fetching the results via the API. I also do some processing on the results, by parsing the JSON response and printing each of the URL's.

If the user is invalid, we then display an error message.

Full code with a sample call:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/mplacona/11332667">Gist</a>.
  </noscript>
</div>
