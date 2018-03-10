---
id: 173
title: Date Formatting with Flex
date: 2009-12-08T00:00:00+00:00
dsq_thread_id:
  - "5434820445"
categories:
  - Adobe
tags:
  - Adobe AIR
  - Flex
---
<p style="text-align: center;">
  <img src="http://files.placona.co.uk/date_format_flex/flexdateformat.jpg" alt="Formatting dates with flex" width="480" height="276" /><br /> (Photo: <a title="Photo by adactio" rel="nofollow" href="http://www.flickr.com/photos/adactio/" target="_blank">adactio</a>)
</p>

I've been working with some [Adobe Flex](http://www.adobe.com/products/flex.html "Adobe Flex") recently, and was having some trouble formatting dates. For those who don't know, here (in th UK) we use the format "dd/mm/yyyy" (Day/Month/Year) as opposed to people over in the States using "mm/dd/yyyy" (Month/Day/Year).
  
I had to use the [DateField](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/mx/controls/DateField.html "Flex: Date Field Component") component, and couldn't find a way in heaven to get the date it returns formatted as "dd/mm/yyyy".
  
I consider myself a flex beginner, and haven't really done much with it (I know, shame on me), and usually have research for online resources (A.K.A "Google Desperation").
  
Surprisingly, it's not very easy to find good online resources for Flex, and when searching for it, I was mostly presented with dodgy date strings being split up and used as arrays.
  
Damn it! Isn't there anything like [Coldfusion's DateFormat](http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WSc3ff6d0ea77859461172e0811cbec22c24-7ff4.html "ColdFusion Formatting Dates")?
  
I then had to resource to twitter, and [quickly](https://twitter.com/Fitzchev/status/6460784602 "Twitter answer") [got](https://twitter.com/thefalken/status/6460848675 "Twitter answer") [the answer](https://twitter.com/aliaspooryorik/status/6460972312 "Twitter answer") as if in a water stream!
  
Basically what you have to to, is use [mx:DateFormatter](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/mx/formatters/DateFormatter.html "Flex: Date Formatter"), and create your mask as such:

```
<mx:DateFormatter id="formatDate" formatString="DD/MM/YYYY" />
```

You can now use this formatter in order to format any date you might have as a string:

```
<mx:Script>
     <!--[CDATA[
     public var myDate:Date = new Date;
     trace(formatDate.format(myDate));
     ]]-->
</mx:Script>
```

And this will format your date as "dd/mm/yyyy". I hope this is useful to somebody else some other time.
