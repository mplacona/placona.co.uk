---
id: 67
title: Javascript  saves the day again.
date: 2008-06-30T00:00:00+00:00
categories:
  - Javascript
tags:
  - General Techie Stuff
---
As some of you know, one of my hobbies is electronics with micro controller usage, and I happen to use an electronics forum a lot when I'm losing hair excessively.

One of the functionalities I really miss on this forum (vBulletin), was an option to be able to see the code posted in a bigger version, not by magnifying it, but upsizing the code box, so I didn't have too much scroll.

I then remembered that [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) can be an excellent tool for this cases. I could just talk to the forum admin to see if they could change it, but as not everybody would like the change, I decided to write my own custom script and integrate it into [greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).

Everything seemed to be pretty perfect, except for the fact that [greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) doesn't really like to call functions directly, but needs to have them added with [addEventListener()](https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener?redirectlocale=en-US&redirectslug=DOM%3Aelement.addEventListener).

Shouldn't be a problem (besided being my first time using this function with JS), except for the fact that [addEventListener()](https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener?redirectlocale=en-US&redirectslug=DOM%3Aelement.addEventListener) is not as straight forward to work as it seems to be.

If you have it on a loop like this:

```javascript
for (var i = 0; i < 5; i++) {
<!--- your listener here --->
}
```

Youd probably be tempeted to add your code like this:

```javascript
myLink.addEventListener("click", function(e) {toggle(i);},true);
```

In case you want to pass the index as an argument to the UDF toggle()

The funny thing is that once it's completely rendered, you will always have the value "6" being passed on your link.

This really gave me a headache, as I couldn't understand why in hell the value "6" was passed. In fact, it happens exactly because your code is all rendered, and you don't have the values from the loop to be working with.

The workaround for this is to use the object id instead of the loop index.

In this case, my links are being created dynamically, and having an id assigned with each iteration of the loop. So by using it like this:

```javascript
myLink.addEventListener("click", function(e) {toggle(this.id);},true);
```

I get exactly the value wanted.

Now, a bit of javascript code to show I've created this script:

```javascript
// Bigger Code
// version 0.2 BETA!
// 27/06/2008
// Copyright (c) 2008, Marcos Placona
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html


// Changelog:
// v0.2
// Added the option to toggle the code and display it if wanted (default no)
// Fixed some bugs with crap greasemonkey JS integration
// Added custom height to boxes
// Added resize option just when necessary

// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bigger_Code
// @namespace     http://placona.co.uk/enclosures
// @description   Resize code box
// @include       http://www.picaxeforum.co.uk*
// ==/UserScript==

var all, element, counter;
var box = document.getElementsByTagName('pre');

counter = 0;

all = document.getElementsByTagName('*');

for (var i = 0; i < all.length; i++) {
    element = all[i];
    if (element.nodeName == 'DIV') {
        if(element.getAttribute('class')=='smallfont'){
            if(element.getAttribute('style')=='margin-bottom: 2px;'){
				if(element.innerHTML == "Code:"){
                element.setAttribute('id', 'box_'+counter);
					if(box[counter].scrollHeight > 178){
						document.getElementById('box_'+counter).innerHTML = 'Code: <a href="javascript:void('+counter+')" id="link_' + counter + '"><font color="red">[toggle]</red></a>'
						myLinkAddress = 'link_'+counter;
						myLink = document.getElementById(myLinkAddress);
						myLink.addEventListener("click", function(e) {toggle(this.id);},true);
					}
					counter++
            	}
			}
        }
    }
}

function toggle(box_id){
    theId = box_id.split("_");
    box_id = theId[1];
    height_box = box[box_id].scrollHeight
    part = box[box_id].getAttribute('style').split(';');
    part = part[5].replace("height: ",'')
    part = part.replace("px",'')	
	
    if(parseInt(part)>178){
        //Set it as default
		box[box_id].setAttribute('style','border: 1px inset;margin:0px;padding: 6px;overflow:auto;width:640px;height:178px;text-align: left;')
		}
	else{
		//Set as custom
        if(part >= 178){
			box[box_id].setAttribute('style','border: 1px inset;margin:0px;padding: 6px;overflow:auto;width:640px;height:' + height_box +'px;text-align: left;')
    	}
    }
}
```

This forum has some very specific configurations and lots of hard coding, so I had to keep them in order to keep the content's integrity.

I know this may not be of everybody's interest, but I wrote this one more as a note to self in case I ever need to use [addEventListener()](https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener?redirectlocale=en-US&redirectslug=DOM%3Aelement.addEventListener) again.

I'm now looking into replacing some of the code with some regular expressions to shorten it.
