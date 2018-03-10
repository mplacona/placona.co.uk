---
id: 179
title: How to return tag contents with regular expressions
date: 2010-01-27T00:00:00+00:00
dsq_thread_id:
  - "5434820446"
categories:
  - Regular Expressions
---
<p style="text-align: center;">
  <img src="http://files.placona.co.uk/regular_expression_tag_contents/mastering_regular_expression.jpg" alt="How to return tag contents with regular expressions" width="480" height="276" /><br /> (Photo: <a title="Photo by Jeff Kubina" rel="nofollow" href="http://www.flickr.com/photos/kubina/" target="_blank">Jeff Kubina</a>)
</p>

As most of you already know, I LOVE **regular expressions**, and think they are great to solve simple and complex tasks involving strings.
  
One thing I usually need to do, is **extract contents from inside HTML or XML tags**.
  
Take the following XML document for example:<!--more-->

```xml
<catalog>
  <cd>
    <title>empire burlesque</title>
    <artist>bob dylan</artist>
    <country>usa</country>
    <company>columbia</company>
    <price>10.90</price>
    <year>1985</year>
  </cd>
  <cd>
    <title>hide your heart</title>
    <artist>bonnie tyler</artist>
    <country>uk</country>
    <company>cbs records</company>
    <price>9.90</price>
    <year>1988</year>
  </cd>
  <cd>
    <title>greatest hits</title>
    <artist>dolly parton</artist>
    <country>usa</country>
    <company>rca</company>
    <price>9.90</price>
    <year>1982</year>
  </cd>
</catalog>
```

Now, let's say
  
we want to return all the titles contained within the tags, but not return the tags themselves.
  
An accepted pattern would be writte
  
n like:

```javascript
/<title>(.+?)</title>/m
```

The concept is very simple, we're saying we want to match one or more characters after the tag. we then add a "?" to make our regular expression non-greedy (regular expressions are greedy by default, and wi
  
ll try and find the last occurrence of what's being searched).
  
Now, if you run the aforementioned pattern against the XML string on your favourite language (I chose ruby here as it's got the method <a title="Ruby Function: Scan" href="http://ruby-doc.org/core-1.9.3/String.html" target="_blank">scan</a> that does exactly what I need), you should get an array with all the titles on the xml.

```ruby
xml_re = /<title>(.+?)</title>/m
m = strXML.scan(xml_re)
print m
```

Nifty eh?
