---
id: 19
title: 'Performance Test: CFMODULE x CFIMPORT'
date: 2006-11-30T00:00:00+00:00
categories:
  - coldfusion
---
I have about 50 files to be used as modules in a particular system. You may ask me: "Why don't you use them as CFC's?"
  
The problem is that I don't have the time to translate all the 50 modules into a Big and Fat CFC.
  
We've been using CFMODULE to access this modules for years, but now we suddenly had to change all the file structure, and will probably have to do it again in a non distant future.
  
I thought about using mappings with the cfmodule, so whenever I need to change the file's path, I could just go to the admin and change the mapping. Also I thought about using CFIMPORT, so when I need to change the path, I just go to my Application and change the path there.
  
I then decided to do some performance tests, and found that CFMODULE is way faster than CFIMPORT as you can see:

```
<!--- CFMODULE on 100 iterations --->
<cfset tmp1 = GetTickCount() />
<cfloop from="1" to="100" index="i">
    <cfmodule template="../import/test.cfm" time="#now()#">
</cfloop>
<cfset tmp2 = getTickCount() />
<cfset totalModule = tmp2-tmp1 />


<!--- CFIMPORT on 100 iterations --->
<cfset tmp3 = getTickCount() />
<cfimport taglib="../import" prefix="mods">


<cfloop from="1" to="100" index="j">
    <mods:test time="#now()#">
</cfloop>
<cfset tmp4 = getTickCount() />
<cfset totalImport = tmp4-tmp3 />
```
