---
id: 149
title: Creating new ColdFusion 8 instances - The easy way - Appendix
date: 2009-06-15T00:00:00+00:00
categories:
  - coldfusion
tags:
  - Adobe
  - 'CFML - 101'
  - VPS
---
Following [Andy Allan's comment](http://www.placona.co.uk/148/coldfusion/creating-new-coldfusion-8-instances-the-easy-way/ "New ColdFusion 8 instances - The easy way") on my previous post, I decided to write a new post and make some things clear here.

In fact, I didn't realize that creating the new instance as a Windows Service through **ColdFusion Administrator** would cause so much trouble as it does. Basically, if you do check "_Create Windows Service_", your new instnace will automatically be created as a Windows Service. It's not too bad, as you would normally want your new ColdFusion instance to start-up with your server.

The problem here is that it will be created as a "native" _Windows_ service; therefore using the same jvm.config for every single instance you create. Meaning that you have no control whatsoever of how much memory is used by the instance, or how often your garbage collector to be triggered.

It wouldn't be a problem for many, but if you are in production mode, I'm sure you will need to do some fine tuning on your jvm.config in order to have a good performance.
  
The solution then, is to create a jvm.config manually and turn your instance into a Windows Service manually. I've done this before, and I can assure you it's a very boring job, and you need to pay extra attention, otherwise your server won't even start-up, and you will lose hours trying to find out what's going one. I'm sure people will back me up on this.

That's why I've put together a quick and dirty <a title="Adobe Air" href="http://www.adobe.com/products/air.html" target="_blank"><strong><em>Adobe AIR</em></strong></a> app that does all the job for you, so you will only need to "tell" it what your configurations are, and it will create two files for you on your new instance's folder.
  
You then only need to execute a batch file (created "automagically" by my app), and your service will be created pointing to your newly generated jvm.conf file. Obviously, you can edit this jvm.conf file in order to do some fine tuning, but once the service is created, you only need to make your changes and restart the service, without the need of creating the service again.

It's a very basic application, as there's no reason to complicate. It does the job in a very clever way, and really saves you time and efforts. I'll be accepting suggestions in terms of functionality should anybody think there's anything else to be done.
  
 
  
<!--- Start Flash Content here --->



<div id="flashcontent" style="width: 215px; height: 180px;">
  <strong>Please upgrade your Flash Player</strong><br /> This is the content that would be shown if the user does not have Flash Player 6.0.65 or higher installed.
</div>
