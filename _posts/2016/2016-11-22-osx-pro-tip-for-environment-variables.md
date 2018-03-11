---
id: 1592
layout: post
title: OSX Pro Tip for .NET Environment Variables
date: 2016-11-22T10:41:43+00:00
categories:
  - dotnet
tags:
  - .net core
  - visual studio for mac
  - Misc
layout: post
excerpt: "This post will take you through the steps of using environment variables from within you Visual Studio Code or Visual Studio for Mac"
comments: true
share: true
image: images/2016/11/vs-mac-slide.png
---
I use [environment variables](https://en.wikipedia.org/wiki/Environment_variable) in all my apps to make sure none of my secret keys end up in GitHub. In C#, if you want to get environment variables in your app you just need to use the [Environment class](https://msdn.microsoft.com/en-us/library/system.environment(v=vs.110).aspx) and call the method `GetEnvironmentVariable()` passing the name of the variable you've already defined.

```csharp
accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
```

I have recently switched from building and running apps directly on the terminal and Visual Studio Code to using [Visual Studio for Mac](https://www.visualstudio.com/vs/visual-studio-mac/). I opened up an application I had already built and knew worked and tried it out. I started to get some weird errors where it would claim to not find my environment variables.

I went ahead and run my application from terminal and it worked as expected.

A bit of Googling and I landed on this StackOverflow [thread](http://stackoverflow.com/questions/35643759/c-sharp-environment-getenvironmentvariable-not-working-on-osx/35644532). But here's the gist of it:

> OS-X GUI apps will not inherit your private/custom env vars that are defined via a shell (bash, zsh, etc...) if they are launched from Finder/Spotlight

The solution to that is to instead of starting Visual Studio for Mac from finder, you can start it from terminal and it will then inherit your environment variables. You can start it like this:

```bash
/Applications/Visual\ Studio.app/Contents/MacOS/VisualStudio &
```

But remembering that will be hard, and you will end up tabbing through your terminal until you get to it every single time. So here's an alias:

```bash
alias vs='/Applications/Visual\ Studio.app/Contents/MacOS/VisualStudio &'
```

If you run that on your terminal, you can then just run `vs` afterwards, and Visual Studio for Mac will start inheriting your environment variables.

This will disappear every time you restart your terminal though, so add it to your `.bash_profile` or equivalent if you wanna make it permanent.
