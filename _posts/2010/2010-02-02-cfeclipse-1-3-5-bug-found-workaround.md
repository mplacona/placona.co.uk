---
id: 181
title: CFEclipse 1.3.5 - Bug found + workaround
date: 2010-02-02T15:00:00+00:00
categories:
  - coldfusion
tags:
  - 'CFML - 101'
image: 
  path: /images/2010/02/screen_bug.jpg
  caption: "Photo by: [http://www.flickr.com/photos/slowafternoon/](slowdown)"
---
Earlier today, I <a title="CFEclipse 1.3.5 Released" href="http://www.placona.co.uk/180/coldfusion/cfeclipse-1-3-5-released/" target="_self">posted about CFEclipse 1.3.5</a> being released. Right after doing that, I found this and tried reporting on track, but it wouldn't let me register for some reason.

This will only work for newly installed CFE 1.3.5, as if you've already tweaked your install, you most likely "fixed" it.

After updating to 1.3.5, I've noticed that whenever I copied and pasted a tag, a bloody space (indent) would be added before the tag. While this helps, it's a bit annoying when you're pasting things that are not supposed to be indented.

<div>
  i.e.
</div>

<div>
  Let say you have:
</div>

```
<cfset tmp = true />
```

<!--more-->

<div>
  You then copy it, and want to paste it right on the next line. Currently you'd get something like this:
</div>

```
<cfset tmp = true />
<cfset tmp = true />
```

<div>
  This is really annoying.
</div>

<div>
  Turns out the setting responsible for this is "auto-indent pasted tags", which will be on Window -> Preferences -> CFEclipse -> Editor -> Auto-insertion and Closing.
</div>

<div>
  <img src="http://files.placona.co.uk/cfeclipse_release/cfeclipse_bug.jpg" alt="CFEclipse Auto-Indent pasted Tags" width="480" height="249" />
</div>

When you get there, you will see it's disabled.

I first tried disabling everything else, but still had the indentions being added.

I then tried enabling everything, and got the same results.

I then disabled only the "auto-indent pasted tags", and that did the trick.

It turns out it needs to be enabled first, in order to be disabled. Must be a default variable set to true lurking around, but that indeed fixed the annoying auto-indent.
