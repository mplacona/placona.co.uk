---
id: 58
title: AS3 my own implementation of capFirst()
date: 2007-03-21T00:00:00+00:00
categories:
  - Adobe
tags:
  - Apollo
  - Flex
---
I'm just studying a little bit of Flex and Action Script 3. Basically to be able to build some tiny gadgets using Apollo.

While building one of them, I came up with the following function:

```
private function capFirst(txt:String):String{
    var str:String = txt;
    var aSTR:Array = str.split(” “);
    var i:int;
    var uString:String;
    var newStr:String = “”;
    var strSpace:String = “”;
    for (i = 0; i < aSTR.length; i++) {
           uString = aSTR[i].substr(0, 1).toUpperCase() + aSTR[i].substr(1);
           newStr = newStr + strSpace + uString
           strSpace = ” “;
    }
    return newStr
}
```

What it does, is take all the first letters of each word of the string given and return them in upper case.

Not sure if there's any easier way of doing that, but for my first steps it's just fine.
