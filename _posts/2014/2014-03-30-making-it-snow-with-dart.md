---
id: 1367
layout: post
title: Making it snow with Dart
date: 2014-03-30T20:57:06+00:00
categories:
  - Dart
tags:
  - Open Source
---
After my last example showing you [how to create a matrix effect with Dart](https://www.placona.co.uk-source/dart/matrix-effect-with-dart/ "Matrix effect with Dart"), I thought it would be cool, to follow up with another example that used the same concepts, but went into slightly more details.

It's also a bit more complex than the last one, as on this one, we use a few more canvas properties, such as <a title="CanvasRenderingContext2D - Arc" href="https://api.dartlang.org/apidocs/channels/stable/#dart-dom-html.CanvasRenderingContext2D@id_arc" target="_blank" class="broken_link">arc</a> to generate our flurries, and <a title="CanvasRenderingContext2D - beginPath" href="https://api.dartlang.org/apidocs/channels/stable/#dart-dom-html.CanvasRenderingContext2D@id_beginPath" target="_blank" class="broken_link">beginPath</a> to reset my objects so they're actual flakes, and not a long rain trace (more on this later).

As per the previous example, I will be using canvas to display my animation.

The final product should look like the following:

<img class="alignnone size-full wp-image-1368" alt="Dart Snow" src="/images/2014/03/dart_snow.gif" width="542" height="337" />

Although the animation will be way better than the gif image above.

I start by creating a class that will hold each of my flakes. Not much to explain here. This is only a <abbr title='Plain Old Dart Object' rel='tooltip'>PODO</abbr> (Patent Pending) 😉

```java
class Flake{
  double _x, _y, _r, _d;
  Flake(double x, double y, double r, double d){
    this._x = x;
    this._y = y;
    this._r = r;
    this._d = d;
  }
}
```

I then go ahead and initialize some of the variables and constants that will be used by my application. I do it in such way I can experiment with values and get my application to behave in different ways depending on what values I choose.

```java
// Holds all my flakes
var flakes = [];
 
// Maximum number of flakes at a time, and speed in which they fall
const int maxFlakes= 100; //max number of flakes
const int speed = 5; // snowfall speed
 
// Duration of the animation
const thirtyMills = const Duration(milliseconds:30);
 
// Set the screen initial properties
CanvasRenderingContext2D ctx;
var W = window.innerWidth;
var H = window.innerHeight;
 
// Randomizer instance variable to be used later on with positions and sizes
var rng = new math.Random();
```

Following, I have the brains of my little animation. Everything happens here, from canvas set-up, to flake creation to positioning. I have put together lots of different steps on the same method here. This is almost a <abbr title='Too long; didn't read' rel='tooltip'>tl;dr</abbr> for code. I don't want to bore anyone very semantic code. The idea here is to get people going. We all know separation of concerns and good semantics.

```java
void snowFall(){
  // draw background on canvas
  ctx.fillStyle="#000";
  ctx.fillRect(0,0,W,H);
  
  //drawing intitial snowflakes on canvas
  ctx.fillStyle = "#fff";
  // rain 
  ctx.beginPath();
  
  for(var i = 0; i < maxFlakes; i++){
    var f = flakes[i];
    ctx.moveTo(f._x, f._y);
    ctx.arc(f._x, f._y, f._r, 0, math.PI*2, true);
  }
  ctx.fill();
  
  //moving snow flakes
  var angl=0;
  for(var i=0; i < maxFlakes; i++){
    angl+=0.1;
    var f=flakes[i];
    f._x +=math.sin(angl).abs() + 0.1 ;
    f._y += math.cos(angl).abs() * speed;
    //resetting snowflakes when they are out of frame
    if(f._x > W || f._x < 0 || f._y > H){
      f._x = rng.nextDouble() * W;
      f._y=-10.0;
    }
  }
  
}
```

Notice we use <a title="W3Schools beginPath" href="http://www.w3schools.com/tags/canvas_beginpath.asp" target="_blank">beginPath</a> every time we call the `snowFall()` method. This is to make sure the path for each of our flakes get reset, and don't end up drawing its entire path ton the screen. If we hadn't used that, we would end up with something like:

<div id="attachment_1369" style="width: 552px" class="wp-caption alignnone">
  <img class="size-full wp-image-1369" alt="Dart Rain" src="/images/2014/03/dart_rain.gif" width="542" height="337" />
  
  <p class="wp-caption-text">
    This could be useful if you wanted rain instead of snow 🙂
  </p>
</div>

Finally on my main function, I do three things:

  1. I initialise my canvas object;
  2. create a pointer in memory for each of my flakes;
  3. make sure the animation runs every 30 milliseconds,

```java
void main() {
  var canvas = querySelector('#stage');
  ctx = canvas.getContext('2d');
  
  // resize canvas
  canvas.width = W;
  canvas.height = H;
  
  // create random flakes
  for(int i = 0; i < maxFlakes; i++){
    flakes.add(
        new Flake(
          rng.nextDouble() * W,
          rng.nextDouble() * H,
          rng.nextDouble() * 3,
          rng.nextDouble() * maxFlakes
        )
    );
  }
    
  // make the magic happen every 30 milliseconds
  new Timer.periodic(thirtyMills, (Timer t) => snowFall());
}
```

You can find the entire code published on my GitHub account, and obviously fork it and send me pull requests if you think you can make it any better.

[https://github.com/mplacona/snowy_dart](https://github.com/mplacona/snowy_dart "Git - Snowy Dart")
