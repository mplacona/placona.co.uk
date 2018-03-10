---
id: 93
title: Quick and dirty jQuery drag & drop
date: 2009-03-01T00:00:00+00:00
dsq_thread_id:
  - "5434820050"
categories:
  - Javascript
tags:
  - JQuery
---
I feel kinda bad to be calling this dirty, but mind you, I'm only using dirty as an expression, as it's freaking sweet.

In fact, I've been having a few ideas about using drag & drop for an open source application I've been thinking of, and decided to play with <a href="http://jqueryui.com/" target="_blank">jQuery UI</a> to do that.

The fine guys at Packt have recently sent me a jQuery <a href="http://www.amazon.co.uk/dp/1847195121?tag=marplasblo-21&amp;camp=1406&amp;creative=6394&amp;linkCode=as1&amp;creativeASIN=1847195121&amp;adid=051DEKKGHNGMSRWHX7ZT&amp;" target="_blank">UI 1.6 book</a> and I've been able to come up with <a title="Quick and Dirty jQuery Drag and Drop" href="http://examples.placona.co.uk/quick_and_dirty_drag_drop" target="_self" class="broken_link">this</a>

It's a pretty simple example I know, but it took me only a few minutes to come up with it. if you come from the old-school javascript times, you know that it would take you hours, if not days to develop something similar, and you'd still have all the hassle of testing it in multiple browsers.

I'll try to explain what my code does here, but the comments pretty much say everything.

```javascript
<script src="http://www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">
<!--
	google.load("jquery", "1.3.1");
	google.load("jqueryui", "1.6");
// -->
</script>
```

```javascript
<script src="http://www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">
<!--
	google.load("jquery", "1.3.1");
	google.load("jqueryui", "1.6");
// -->
</script>
```

This is what I use to invoke the jQuery UI. Notice that I load the whole jquery from <a href="https://developers.google.com/speed/libraries/devguide" target="_blank">Google servers</a>, so it almost don't use any of my bandwidth.
  
I then create some CSS for displaying purposes of my screen objects.

```css
#drag {
	width: 100px;
	height: 70px;
	background: silver;
	cursor: move;
}
#target {
	width:200px;
	height:200px;
	border:3px solid #000;
	position:absolute;
	right:20px;
	top:20px;
	z-index:1;
	float:right;
}
```

And now it's time for the magic to happen. All the functionality will be on the following lines, and the comments pretty much say everything that's being done:

```javascript
<script type="text/javascript">
<!--
	$(document).ready(function(){
	//Create a callback function for when the object is dropped into the area
		function eventCallBack(e){
			alert('dropped')     }
			//Dragging props
			var dragOpts = {
				revert:true,
				cursor:"move"
			};
			//Dropping props
			var dropOpts = {
				activeClass: "activated",
				drop: eventCallBack
			}
			//Make element draggable
			$("#drag").draggable(dragOpts);
				//Make element droppable
				$("#target").droppable(dropOpts);
			}
		);
// --></script>
```

Finally I create the object I'm gonna be dragging, and a container to "receive" my object, so the drag & drop will only return a call-back when the object is dropped inside my target

```
<div id="drag">Drag</div>
```

And that's all I have to do to have a fully functional drag & drop using jQuery
