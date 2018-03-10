---
id: 1524
layout: post
title: Multi-Line C# Strings
date: 2016-02-22T11:28:01+00:00
dsq_thread_id:
  - "5435414137"
categories:
  - dotnet
tags:
  - .net
  - 'c#'
---
I’ve seen this question being asked on StackOverflow so many times I event thought about writing a bot to automatically reply to it.

The answers vary slightly according to the experience of each developer but the question is always the same. How do you create multi-line C# strings?

## Assigning multi-line strings to a variable

Say you’re trying to assign an XML string to a variable and want your code to still look presentable. The correct way to do that would be as follows:

```csharp
string twiml = @"
<Response>
    <Dial>
        <Number>+441234567890</Number>
    </Dial>
</Response>
";
```

Notice all I had to do was add an `_@_` before the speechmarks, and this gives multi-line capabilities to my string.

But what if I wanted to have dynamic values inside my string? Say values coming from variables for example.

## Assigning dynamic multi-line strings to a variable

What most people will do here is make the assumption you can use concatenation to inject variables in by doing something like this.

```csharp
string twiml = @"
<Response>
    <Dial>
        <Number>" + To + @"</Number>
    </Dial>
</Response>
```

That is a horrible way of doing this though. Every time you add a new variable, you need to use an `@` again to tell the compiler you’re starting a new multi-line string.

To assign dynamic values to a multi-line string you can use interpolation by adding the variables with curly braces within the string and then using _string.Format()_ to tell it to replace those with the values I provide.

```csharp
string twiml = @"
<Response>
    <Dial>
        <Number>{0}</Number>
    </Dial>
</Response>
";
return string.Format(twiml, To));
```

So much more elegant right? My string remains the same but I can now replace values in it in compile time and just keep increasing the number within the curly braces.

Let’s kick it up a notch and say your string has attributes. We’d now be looking at adding speechmarks in each of them as such:

```csharp
string twiml = @"
<Response>
    <Dial callerId="{0}">
        <Number>{1}</Number>
    </Dial>
</Response>
";
return string.Format(twiml, CallerId, To);
```

Unfortunately it would also mean your code is now broken and you will start getting something like `_CS1002: ; expected_`. To go around that just make sure you double the speechmarks wherever you need them within your string.

```csharp
string twiml = @"
<Response>
    <Dial callerId=""{0}"">
        <Number>{1}</Number>
    </Dial>
</Response>
";
return string.Format(twiml, CallerId, To);
```

And that will make your code work again and best of all – look really neat!
