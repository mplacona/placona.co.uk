---
id: 80
title: How to Drive Fusebox 5.5 - Book Review
date: 2008-09-13T00:00:00+00:00
categories:
  - Books
tags:
  - Book Reviews
  - coldfusion
  - Fusebox
---
I asked **Niall O'Doherty** (a fellow CF Developer) to give me his initial feelings on the book [How to drive Fusebox 5.5](https://www.placona.co.uk/77/fusebox/how-to-drive-fusebox-5-5/), and he came up with an excellent review, that left me wanting the book even more. I asked him if he would mind me posting his review on my blog, as his website is still not ready; he kindly said **yes**.
  
I just changed some of the styles, but the text is still exactly the same thing.
  
_Book reviewer <strong style="color:red">Niall O'Doherty</strong> | Publisher: Proton Arts. Author(s): Jeff Peters_
  
[<img style="float:left; width:89px;height:110px;padding-right:5px" src="http://i2.cpcache.com/product/297794563/how_to_drive_fusebox_55.jpg?side=Size3Front&height=240&width=240" border="0" alt="" />](http://www.cafepress.com/protonarts.297794563)
  
The book is 110 pages, including Intro, TOC, Appendices and Indexes.
  
In summary the book contains the following chapters:
  
**1.Introduction**
  

  
Provides a basic introduction to Fusebox 5.5 and the book itself.
  
**2.Fusebox Basics**
  

  
A quick introduction to the "what and why" of fusebox. This includes Code Organization, Managing and ways to think about your applications, technical principals of fusebox etc. Mainly content related to the architecture and flow control of your application and how Fusebox evolved from a Framework that did not simulate inheritance techniques to a more flexible framework enabling more independent circuits.
  
**3.Traditional "modern" Fusebox**
  

  
Reviews the Fusebox 4 approach to Fusebox, using XML to configure the application and circuits. By modern, Jeff pertains to FB4 or later versions of the Framework (configured using XML). Here a traditional application is dissected before moving into the chapters which use the same application and the different approaches available with the new Fusebox 5.5 version of the framework.
  
**4.Going XML-less**
  

  
Issues related to using Fusebox without the XML files and how Fusebox 5.5 goes about it. This is essentially where the book starts breaking down the actual main differences between traditional fusebox apps and new fusebox apps, for example, new method of setting Fusebox Parameters and omitting the Fusebox.xml configuration file etc. It then leads to the Implicit loading of Circuits and their precedence.
  
**5.Other New Topics**
  

  
Additional Features added in Fusebox 5.5 delves into the new features to Fusebox:

  * i.Dymanic Do: basically invoking the "do" method of the "myFusebox" object.
  * ii.The Event Object: Created by fusebox and handles the passing of attributes scoped var's into CFCs (expanded on from FB 5.1) i.e. event.getValue("variableName");
  * iii.Application.cfc support: basically Application.cfc can extend the fusebo5.Application object and invoke it's methods.
  * iv.myFusebox updates: to make keeping track of what's going on in your application easier.
  * v.showDebug property
  * vi.getApplication(), getOriginalCircuit(), getOriginalFuseaction() and variables() methods explained

**6.Directories as Circuits: Circuit.xml**
  

  
An overview of the Wegot Widgets reference application using directories for implicit circuits and circuit.xml.
  
**7.Directories as Circuits: CFM Fuseactions**
  

  
CFML Templates as Fuseactions: The Wegot Widgets reference application using directories for implicit circuits and CFML Templates for Fuseactions.
  
**8.Directories as Circuits: CFC Fuseactions**
  

  
CFCs as Fuseactions: The Wegot Widgets reference application using directories for implicit circuits and CFCs for Fuseactions.
  
**9.CFC's as Circuits**
  

  
The Wegot Widgets reference application using CFCs for implicit circuits and CFC methods for Fuseactions.
  
**10.Summary**
  

  
The previous book Fusebox 5 and FLiP provided a complete overview of the Fusebox and Fusebox LifeCycle Process, but this is more focused on the new approaches that are available using Fusebox 5.5.

There is a little Deja-vu when reading the early chapters of this book in terms of the analogies Jeff uses when describing the Fusebox framework characteristics, and illustrations (PHB and Start, Bus Ring networks).

Other than that though: If you do use Fusebox or plan on using Fusebox as one of your development frameworks, I would probably highly recommend BOTH books.

Links to the books can be found [here](http://www.protonarts.com/index.cfm?fuseaction=Books.showBookDept)
