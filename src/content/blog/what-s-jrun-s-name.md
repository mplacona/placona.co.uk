---
title: "What's Jrun's name?"
description: "Just found it on my old ColdFusion installation and thought it might be useful for someone in a multiple Jrun installations environment."
pubDate: "2006-12-05T00:00:00.000Z"
slug: "what-s-jrun-s-name"
categories: ["coldfusion"]
tags: []
draft: false
---

Just found it on my old ColdFusion installation and thought it might be useful for someone in a multiple `Jrun` installations environment.

```
<cfscript>
    //Instatiate JRUN
    jrunObj = createObject("java", "jrunx.kernel.JRun");
    //Get it's name
    thisServer = variables.jrunObj.getServerName();
    You're on #thisServer#
</cfscript>
```
