---
id: 692
title: E4X and XML with namespaces
date: 2011-09-04T22:05:36+00:00
categories:
  - Android
tags:
  - Adobe AIR
  - Flex
---
Here's is something that got me scratching my head for a little while today while working on my new mobile application.

In my new application, I'll be reading XML off various different providers, so I have an interface that gets implemented in various classes to make sure they all obey a certain contract, and I don't need worry about what type they are (more on that later...)

With that in mind, I ended up implementing different logic on different classes since the XML returned will vary from provider to provider. I am using <a title="ECMA Script for XML" href="http://en.wikipedia.org/wiki/ECMAScript_for_XML" target="_blank">E4X</a> to get the various information I need from the XML returned, and one of them would not work at all when selected.

I will put two XML examples here, and let you spot the difference:

```xml
var basket:XML =
	<foods>
	  <fruit>
		<name>Apples</name>
		<name>Bananas</name>
	  </fruit>
	</foods>;
trace(basket..fruit.name[0])
```

And that should return "Apples".

Nothing new here, now for the second example:

```xml
var basket:XML =
	<foods xmlns="http://www.w3.org/TR/html4/">
	  <fruit>
		<name>Apples</name>
		<name>Bananas</name>
	  </fruit>
	</foods>;
trace(basket..fruit.name[0])
```

At a first glance, I have to admit I was expecting apples as well, but to my surprise, I got... nothing...

It took me a while to to go look on the XML again, and then it hit me. This provider would give me XML with a <a title="XML Namespace" href="http://en.wikipedia.org/wiki/Namespace_(computer_science)#XML_namespace" target="_blank">namespace</a>, and in order to read that with E4X, I would need to declare that namespace. There is absolutely nothing wrong with the code above, but it simply won't find anything since you're not declaring what the namespace is, and the compiler gets completely lost.

What you need to do is declare the namespace on the top of my code like so:

```javascript
namespace items = "http://ns.imageshack.us/imginfo/7/";
use namespace items;
trace(basket..fruit)
```

How you name it doesn't matter, but it's important that it's unique, so in case you're reading from multiple XML files on the same class, you should be using different names, otherwise you will get compiling errors.
