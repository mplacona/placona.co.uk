---
id: 1373
layout: post
title: Simple HTTP server with Dart - Setup
date: 2014-04-01T22:15:22+00:00
categories:
  - Dart
tags:
  - Open Source
---
In this article, I will demonstrate how easy it is to create a simple TCP HTTP server with Dart.

We will start off very simple by just creating a simple server, that returns an HTTP status code 200. This will be the bare bones to a small server that starts by acting as a repeater, then moves onto logging each of the requests, and finally turns into a small chatting application.

We start off by importing the <a title="dart:io" href="https://api.dartlang.org/apidocs/channels/stable/#dart:io" target="_blank" class="broken_link">dart:io</a> library into our project. This will allow us to create a socket that will later be used to serve our pages and endpoints. It's important to understand that this dopes not work on a browser, so to establish sockets in this way, we need to build this as a console application that will act as our server and be running in the background.

We then decide which port and address we would like out application to run. For simplification purposes we will run this on 127.0.0.1 (coz <a title="There ain't no place like 127.0.0.1" href="http://a.tgcdn.net/images/products/zoom/noplace.jpg" target="_blank">there ain't no place like it</a>) and port 5000, but feel free to use whichever values suit you best.

At this point, your code should look like the following:

```java
import 'dart:io';

final int port = 5000;
final String address = "127.0.0.1";

void main() {
  
}
```

Not much happening there so far.

We then setup our http server and use a Future to establish when the server has started up.

```java
import 'dart:io';

final int port = 5000;
final String address = "127.0.0.1";

void main() {
  HttpServer.bind(address, port)
    .then((HttpServer server){
    
  });
}
```

If we dissect the code above a little bit, all it is doing is binding a new HTTP server instance to an address and port, and because this is a blocking operation (meaning you wouldn't be able to do anything else until this operation completed), we use a [Future](https://www.dartlang.org/docs/tutorials/futures/ "Dart - Futures") that will act as a callback, and will only return when an operation is completed. This means your application is now free to do anything else it needs to, even if the process of starting it was to take a couple of seconds to complete.

We obviously need to make sure we do something once the operation is completed. What we do, is assign the response to a variable (`server`). This is the context of our new process, and will allow us to interact with it.

At this point, we are only listening to connections, but not really doing anything about them. however, if you were to try to connect to it, at this point you would get a successful connection, but nothing that you sent to it would be taken into consideration, as our little server doesn't have any handlers for messages.

We can quickly change this by telling our server to [listen](https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/dart-io.HttpServer#id_listen "Dart - HttpServer.listen") to incoming [http requests](https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/dart-io.HttpRequest "Dart - HttpRequest"), and return with an HTTP status code as such:

```java
import 'dart:io';

final int port = 5000;
final String address = "127.0.0.1";

void main() {
  HttpServer.bind(address, port)
    .then((HttpServer server){
      print('listening for connections on $port');
      server.listen((HttpRequest request) {
        request.response
          ..statusCode = HttpStatus.ACCEPTED
          ..write("Hi, I'm darty, your friendly little server")
          ..close();
      });
  });
}
```

As you have seen, we're just binding http requests to out http server by telling it to listen to it. That then gives us access to a variable called request, which we can the use to interact with the client by sending back a response.

Notice how I use method cascades to avoid repeating <span style="color: #00ff00;"><em>request.response</em></span> time and time again (thanks to <a title="Seth Ladd on Google+" href="http://google.com/+sethladd" target="_blank">+SethLadd</a> for reminding me of this).

We could have also used that to check if there were any cookies in the request, or to analyse the request headers passed with the request and build logic around it. More on the HttpResponse class can be found [here](https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/dart-io.HttpResponse "Dart - HttpResponse").

In the next article, I will cover how we can turn this into an echo server, which will move us further towards the final project. Stay tuned.

### UPDATE

<a title="Seth Ladd on Google+" href="http://google.com/+sethladd" target="_blank">Seth Ladd</a> also quite rightly pointed out (in his comment bellow) that what I'm really talking about here is an HTTP Server as opposed to to a TCP Server (i.e. I'm talking about a higher level protocol that actually runs on top of TCP). The initial intent with this article was to make it a big write up about everything TCP, but then it turned out to be massive, and I decided to simplify and split it up in smaller articles, which for the purposes of this article took TCP slightly out of context. Fear not though, as the following code shows you how to accomplish it via TCP instead.

```java
import 'dart:io';
import 'dart:async';

final int port = 5000;
final String address = "127.0.0.1";

void main() {
  Future<ServerSocket> serverFuture = ServerSocket.bind(address, port);
  serverFuture.then((ServerSocket server) {
    print('listening for connections on ' + server.port.toString());
    server.listen((Socket socket) {  
      socket.listen((List<int> data) {
        String cls = "Hi, I'm darty, your friendly little server";
        socket.write(cls);
        socket.close();
      });
    });
  });
}
```