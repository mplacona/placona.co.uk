---
id: 74
title: How I treat the links on my blog with JQuery.
date: 2008-09-04T00:00:00+00:00
categories:
  - coldfusion
tags:
  - Adobe
  - Javascript
  - JQuery
---
This is a very quick and dirty example of how to treat links on your blog / website using [JQuery](http://jquery.com/ "JQuery.com").

I've been using [JQuery](http://jquery.com/ "JQuery.com") for a while now to ease my life with some personal applications and at work.
  
One of the greatest things about JQuery in my opinion is it's great interaction with the [DOM](http://en.wikipedia.org/wiki/Document_Object_Model), and ability to make global changes with very little effort.

Some time ago I've implemented a simple [WYSIWYG](http://en.wikipedia.org/wiki/WYSIWYG) editor on my blog to facilitate tasks like text format and link creation. Link creation will be the subject today.

All the links will basically have the same structure:

```
<a href="/blog/foo.cfm&bar=1"></a>
```

The problem I found was that I didn't want people to leave my blog
  
when clicking on external links, but wanted them to have a new tab
  
opened each time they clicked them.
  
I could easily change my [WYSIWYG](http://en.wikipedia.org/wiki/WYSIWYG) editor to add a **target="_blank"** on all the links, but then, every time someone clicked on an internal link (or even on a JS link), a new tab would be opened.

**Ok, bad idea! (period)**

I then thought about the [selectors](http://api.jquery.com/category/selectors/) from JQuery. How nice it would be if my script was clever enough to detect what's an internal or external link.
  
Well there you go, there's a very easy way of doing that:

On the top of my main page (<span style="text-decoration: line-through;">layout.cfm as it's <a href="http://www.blogcfc.com/">blogCFC</a></span>) I'm including this:

```javascript
<!--- Include the jquery library previously downloaded from JQuery's website --->
<script src="/blog/jquery.js" type="text/javascript"></script>
<script type="text/javascript">
	<!--
		//Tell the browser to run it when the page loads
		jQuery(document).ready(function(){
			//Use XPath selectors to find what I'm looking for
	    	jQuery("a:not([href*=https://www.placona.co.uk])").not("[href*=##]").not("[href*=javascript]").attr({

			//Add a target where appropriate
	        target: "_blank",

			//Put a title on the link where appropriate
	        title:"Opens in new window" <br />        })

			//prepend with pre prefix ext
	        .prepend('-ext');
	   });
	// -->
</script>
```

Now, the code is pretty much self-explanatory. Basically what is does is "look" for any **a** tag and check it's **href** attribute reading the tag with [XPATH Selectors](http://api.jquery.com/category/selectors/).

Everything returning **true** to this condition will have two new attributes added; **target** and **title**.

The **.prepend** is used to prepend some text to your object, in this case, I'm prepending the text **"-ext"**, but you could for example add an image by replacing the "-ext" and image tag for example; which would bring you a nice and clean link with an image.

Needless to say that ColdFusion Developers in general love this JS library, as it's very versatile and compatible.
