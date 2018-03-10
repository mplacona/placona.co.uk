---
title: Tokenizing a string with Java.
date: 2005-09-21T00:00:00+00:00
categories:
  - coldfusion
  - blog
layout: post
---

As everybody knows, this Blog should show my studies integrating `CFML` with other technologies.   
Today I was playing with the Java class <a href="http://docs.oracle.com/javase/6/docs/api/java/util/ArrayList.html" target="_blank">arrayList()</a> and at some point I generated this code:
  
<img src="http://files.placona.co.uk/tokenize/tokenize_1.jpg" alt="Java Tokenize" width="383" height="112" />

This class responsibility is to take a string and break it using spaces as delimiter. To run this example, I just needed to instantiate the object and pass my string like this:

```
<cfset tmp = createObject("Java","token") />
<cfset tmp = tmp.setTokenize("ColdFusion with Placona.co.uk") />
<cfdump var="#tmp#" />
```

Now you should be asking yourself:
  
> Why do I need this code if I have the function <a href="http://cfdocs.org/listtoarray" target="_blank">listToArray</a>?

Good question... just studies...
