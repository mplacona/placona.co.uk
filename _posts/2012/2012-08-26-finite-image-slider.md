---
id: 1097
title: Finite image slider
date: 2012-08-26T00:08:25+00:00
categories:
  - Javascript
tags:
  - JQuery
---
I've been asked to come up with an image slider prototype for something new we were doing at work.

I would generally just find a suitable sliding jQuery plug-in and get the developers to use it. However, this time, there were two very peculiar requirements necessary for this slider (hence why I was asked to prototype it)

  1. The image slider should only display the next and previous arrow when there was something to display. It should hide the arrows if it didn't have a next or a previous item to display.
  2. Ordinarily image sliders are infinite, which means you can keep clicking next forever, and it will always loop through the images. This alone negates the requirement above, since you always have a previous and a next image. So I had to somehow limit the image slider to only go up to the last image when clicking forward, and stop at the first image when rewinding.

I looked at a few options for this, but most of the image sliders out there seem to not allow you to have full control over the display of the arrows, or to make it stop when it reaches the last images. Also, most of them seem to only open up in a light boxes, which makes it less ideal when you don't want to distract your users off the main objective of the website (don't get me wrong though, light boxes are cool, but they have their time and place).

I then came across to Nivo Slider(http://nivo.dev7studios.com/), which claims to be the "The world's most awesome jQuery & WordPress Image Slider". I can't really comment on that statement, but I can tell you they're pretty good, and have lots of different options for you to use in your image sliders, as well as allowing various transitions between each slide.

Implementing it was very straightforward, as all you need to do is import their css, chose a css theme and the plug-in itself (I'll assume you already have jQuery installed)

My code then ended up looking like this:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/3450227">Gist</a>.
  </noscript>
</div>

The code above will pretty much get you going, and your images should now load nicely on the screen, and you should be able to slide through them.

However, when you do it, you will notice none of the requirements mentioned above have been fulfilled, since you ended up with an image slider.

To get the arrows to show and hide dynamically, I did a bit of research and found  <a title="Nivo Slider - Disable [revious and next arrow" href="http://www.soslignes-ecrivain-public.fr/Nivo-Slider-disable-prev-next-arrow-first-last-slide.html" target="_blank">someone</a> doing that exact same thing. So it was just a matter of adding that to my code, and attaching it to the "afterChange" event, which will get called every time you click through any of the arrows.

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/3450832">Gist</a>.
  </noscript>
</div>

I then added it to my configuration as such:

```javascript
afterChange: function(){arrowsCtrl();}
```

You will have noticed this only disables the arrows after you change the slides, so you're still faced with the problem that you load the page displaying the two arrows. In order to remove the arrow from the left (I don't need a left arrow if I just loaded the page, since I have nothing to go back to), I simply used the event "afterLoad", which runs as soon as the object is added to the DOM.

```javascript
afterLoad: function(){jQuery('#slider .nivo-prevNav').hide();},
```

That way, I can simply hide the arrow using JavaScript.

So the first requirement is fulfilled:

  * The image slider should only display the next and previous arrow when there was something to display. <span style="color: #00ff00;">Check</span>
  * It should hide the arrows if it didn't have a next or a previous item to display. <span style="color: #00ff00;">Check</span>

The good news here, is that by doing this, I have automatically satisfied my second requirement, which was to make sure the user couldn't loop through to the first image when she reached the last image. By removing the arrows when necessary, I am able to stop the user from ever going back to the first image without going through the previous images.

because I was using "slide in" transitions, one thing I found to be a bit annoying, is that you can only define one kind of transition per slide, so when sliding in an image, you normally slide it in from left to right. If you want to slide it out (i.e. by clicking on the right arrow), you'd normally expect the image to disappear from right to left, as if it was leaving the screen.

This is how I've implemented it:

```javascript
$('#slider .nivo-nextNav').live('mouseover', function() {
  $('img').attr("data-transition", "slideInLeft");
});
$('#slider .nivo-prevNav').live('mouseover', function() {
  $('img').attr("data-transition", "slideInRight");
});
 ```

My final code ended up looking like this:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/3450832">Gist</a>.
  </noscript>
</div>

<!-- ### **<span style="color: #339966;"><a title="Finite Image Slider - Demo" href="https://s3-eu-west-1.amazonaws.com/files.placona.co.uk/finite-image-slider/index.html" target="_blank"><span style="color: #339966;">View Demo</span></a></span>** -->
