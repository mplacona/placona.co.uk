---
id: 16
title: 'Tag of the day: CFIMAGE'
date: 2006-11-28T00:00:00+00:00
categories:
  - Tag of the day
---
I was playing with my Alpha version of Scorpio and found some interesting new functions for images. The tag of the day was CFIMAGE
  
<img src="http://files.placona.co.uk/cfimage/cfimage.jpg" alt="CFIMAGE Placona" width="253" height="380" />
  
The marketing is what moves the business.
  
As most of the CF Developers are men, I decided to use this image 🙂
  
That was just 1% of what this tag can do, and here's the code:

```
<cfimage source="test.jpg" name="myImage">
<cfset attr = StructNew() />
<cfset attr.underline = "no" />
<cfset attr.size = 13 />
<cfset attr.style = "bold" />
<cfset ImageSetDrawingColor(myImage,"white") />
<cfset ImageDrawText(myImage,"placona.co.uk",90,170,attr) />
<cfimage source="#myImage#" action="writeToBrowser">
```

<span style="font-weight: bold;">Ps. I'm not breaking any NDA here as all the code shown here has been shown in previous posts about Scorpio's new features</span>
