---
id: 759
title: Upgrading Castle from 2.1 to 2.5
date: 2012-07-23T11:16:46+00:00
categories:
  - dotnet
---
I was recently working on a .Net project that uses [Castle](http://www.castleproject.org/) as it's [IoC Container](http://en.wikipedia.org/wiki/Inversion_of_control). At some point I realized it would be beneficial to have Castle running on its latest version, so I could benefit of the new functionalities. More specifically I was hoping to be able to use [Startable Facility](http://docs.castleproject.org/(X(1)S(jbxi1n45ybiymnmoillaea55))/Default.aspx?Page=Startable-Facility&NS=Windsor&AspxAutoDetectCookieSupport=1) in order to get the objects to be started as soon as they are loaded.

The post linked above does describe how you can accomplish the same on older versions, but I thought it would be a nice touch to actually get the library updated, since we could potentially benefit of bug fixes and improvements.

The first thing I tried was to simply drop all of Castle's dlls, and replace them with the new ones. At that point I had about 170 compiling errors, and most of them looked like this:

> Error 6 The type or namespace name 'DictionaryComponent' could not be found (are you missing a using directive or an assembly reference?)

and

> Error 64 The type or namespace name 'DictionaryKey' could not be found (are you missing a using directive or an assembly reference?)

and

> Error 27 The type or namespace name 'DictionaryKeyAttribute' could not be found (are you missing a using directive or an assembly reference?)

For starters, DictionaryAdapter.dll was now part of the Core dll, so it now comes bundled with it when you add Castle.Core.dll into the references of your project.

I then had **DictionaryComponent**, **DictionaryKey** and **DictionaryKeyAttribute**error'ing. That is because when the library's author moved DictionaryAdapter.dll into Castle.Core.dll, he also renamed the methods to be **ComponentAttribute, ****Key**, **KeyAttribute**. It could have been just me, but I haven't seen any mention on this on the release notes. And while it makes sense that they get renamed, I would rather have not had to find out the hard way.

Another thing I had to do, was change all of my container registration to use "container_name".Register. Although this doesn't error, the author recommends you initialize them this way for future compatibility.

I've not been able to find anything about this kind of upgrade, so I reckon either I've gone wrong somewhere, or no one has actually tried to upgrade from castle 2.1 to Castle 2.5.

Hope that helps someone then.
