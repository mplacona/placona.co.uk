---
id: 594
title: ColdFusion 9 Developer Tutorial - Book Review
date: 2010-10-03T19:00:55+00:00
categories:
  - Books
tags:
  - Adobe
  - Book Reviews
  - coldfusion
---
_Book reviewer Marcos Placona | Publisher: Packt | Author: John Farrar_

The book starts with a very brief introduction to ColdFusion, and what the basic language capabilities are.

**<span style="text-decoration: underline;">On chapter 1 - Web Pages - Static to Dynamic</span>**

The author begins by explaining what variables are for, and then moves into strings and scopes. He then moves into structures, loops, arrays , conditional processing through if's and case statements, and explains some of the wonders on exception handling. This chapter is merely a run through around the CFML language, and will help programmers familiar with the technology to understand the conventions used by the book through the code samples.

**<span style="text-decoration: underline;">Chapter 2 - Basic CFCs and Database Interaction</span>**

Things start to get a bit more exciting on chapter two, where the topic moves into CFC creation, some objects (beans), and a little bit of database interaction. I like how basic terminologies are described here, and pretty much every example is showed through tags and scripting.

The book uses a very simple product management system as example, and the examples show what a bean object is, and what it can be used for. I could see the author did not focus too much on explaining what object oriented programming is, but the concept is shown through the whole book.

In this chapter, some simple database interaction is demonstrated, and at around page 60, you are already writing full blown objects, which are database reliant, and give you the ability to encapsulate most of the logic.

<!--more-->

**<span style="text-decoration: underline;">Chapter 3 - Power CFCs and Web Forms</span>**

Things start to get a lot more interesting now, and the book starts to explain why restricting access to methods is so important. All of the four access types (public, private, package and remote) are described, and the author briefly exemplifies when which of them should be used.

Some more database examples are given here, and what was only a set of screen dumps with database objects on chapter two, starts to take some form, and the examples already show how to properly create, update and delete data from the database through in-line SQL. At this point, I reckon anyone who's never seen ColdFusion, would be able to get a pretty good idea of its capabilities.

**<span style="text-decoration: underline;">Chapter 4 - ORM Database Interaction</span>**

This is [the chapter](https://www.packtpub.com/sites/default/files/0249-chapter-4-ORM-Database-Interaction.pdf "ORM Database Interaction") everyone has been waiting for. The CFML language has used in-line SQL (or stored procedure calls) all along its 15 years, and a new way of interacting with databases was long overdue. Chapter 4 starts by taking you through the necessary steps to "ORM enable" your application and CFCs. In all honesty I was expecting to be put off by this chapter, as ORM in itself is a pretty big a complex subject. The author exposes the topic in a very nice way, and I felt really comfortable reading and coding through the examples.

ORM really seems magical, and will do wonders for small to medium projects, where high performance is not  the major concern.

The code samples are really fun to do, but I felt there was a lack of explanation on when and why people should be using ORM as opposed to the good old inline SQL or stored procedure calls.

** <span style="text-decoration: underline;">Chapter 5 - Application, Session, and Request Scope</span>**

After a very exciting chapter 4, the author touches back again on scopes, and starts to talk about the application.cfc, and what the life span for each of the scopes is. It's not nearly as exciting or elegant as ORM, but as the request and session scopes are widely used across ColdFusion applications, it's important to know what can, and what can't be done with them, as well as settings you can apply to the through simple directives on the application.cfc

Again the author gives some examples on how these directives can be used in real life, and also shows some of the new cool things added to ColdFusion 9, such as the ability to create universal data sources, or setting custom tag paths per application.

**<span style="text-decoration: underline;">Chapter 6 - Authentication and Permissions</span>**

This chapter describes the built-in authentication framework and methods that can be found inside ColdFusion. The example given here is a simple user login, where each group consists of a set of roles. This is particularly useful on CMSs, where only users within a specific group can interact with xyz system modules.

I specifically like how the author employs the cflayout tag to create the screens here.

**<span style="text-decoration: underline;">Chapter 7 - CFScript</span>**

Every CFML developer has been waiting for this day to come, and it finally did on ColdFusion 9. ColdFusion is now fully "script-able", and developers no longer need to write code through tags. Until ColdFusion 9, you were only able to use a limited set of functionalities with cfscript.

In this chapter, the author describes what each operator is, and exemplifies the most common functionalities through script. there aren't too many things to be said here, and the examples pretty much show what needs to be shown.

**<span style="text-decoration: underline;">Chapter 8 - CF AJAX User Interface</span>**

Everybody loves ajax, and ColdFusion has helper tags that will help you get up and running with it, even if you are not a JavaScript wizard. most of the examples given on this chapter are related to presentation and user interaction. a simple pod system is demonstrated, and after only a handful of lines, the example turns into a very interactive interface.

Things get a bit more colour once the author starts to describe the cfmap tag usage. this in my opinion is one of the most impressive new tags in ColdFusion 9. It allows you to interact with Google maps, and display live data on your website.

As every every back-end technology that generates JavaScript, the code becomes really obtrusive, and most very specific setting will need to be set through JavaScript.

**<span style="text-decoration: underline;">Chapter 9 - CF AJAX Forms</span>**

This is pretty much an extension of chapter 8, but the author focuses a lot more on forms. ColdFusion has a nice set of built-in UI capabilities, and the examples here really demonstrate them in full colours. The first example  shows a product data-grid with pagination functionality. It also allows you to delete and update products "in-screen", without the need for refresh.

Some other examples demonstrated here are:

Auto-complete field, date-picker, related drop-downs, wysiwyg editors, directory trees, message boxes and progress bars. All of them can mostly be accomplished in less than 10 lines of code, and look really slick.

**<span style="text-decoration: underline;">Chapter 10 - CF AJAX Programming</span>**

I have to admit a got a bit bored of Ajax t this stage, and another chapter on Ajax seems a bit overkill. In fact, Ajax is a pretty extensive topic, and there's entire books covering the topic from front to back.

In this chapter, the author demonstrates how to bind HTML objects, JavaScript, URLs and events to CFC's. It also briefly touches debugging both on client and server side, as well as describes the functionality of each variable available through the ColdFusion JavaScript API.

**<span style="text-decoration: underline;">Chapter 11 - Introduction to Custom Tags</span>**

Custom tags are mainly created for code reuse, and have been widely used for a long time. In this chapter, the author explains the differences between them and CFCs or includes.

The book exemplifies the usage of custom tags by building a dynamic page layout where common things such as the header and footer and invoked via custom tags.

At the end f the chapter, the author describes how the same results can be accomplished through  tag libraries or cfmodule.

**<span style="text-decoration: underline;">Chapter 12 - ColdFusion Powered Views</span>**

This chapter shows how to manipulate the presentation layer with ColdFusion, and gives some very nice examples on how to manipulate the DOM with ColdFusion code. Basically, from ColdFusion you could for example modify the entire page style with the click of a button.

**<span style="text-decoration: underline;">Chapter 13 - Control Logic Processing</span>**

It's now time to put everything we learned in practice, and the book briefly explains MVC (model, view, controller). this is a very complete chapter, where the author has put a lot of effort to try and use most of what's been explained in the previous chapters, but in a more organized way (through MVC)

**<span style="text-decoration: underline;">Chapter 14 - Guide to Unit Testing</span>**

Unit testing is one of my favourite topics, hence, this is my favourite chapter. Most software developers don't really know when, where or why a system needs to be tested. the most popular ColdFusion testing framework is called MXUnit, and is freely available for download.

In this chapter, the author exemplifies how and when to use unit tests as well as some simple assertions. He also shows what the different views for unit tests results can be used, and briefly touches built-in assertions.

**<span style="text-decoration: underline;">My personal notes</span>**

It's been a pleasure reading this book, and although I cold not really learn a lot from it, as it's mostly targeted to new developers, I was able to update myself on many of the new functionalities included on ColdFusion 9. I don't necessarily agree with all the code samples used on the book, and would not use some of the same approaches described by the author. That said, I think this is an amazing book for any ColdFusion developer at any level. It's not the kind of book you will want to keep on your desk as reference, but surely is an excellent complement for any level of knowledge.

I'd like to leave here my special thanks to the fine guys at <a href="http://www.packtpub.com/" target="_blank">Packt</a> who sent me this book for evaluation and technical review.
