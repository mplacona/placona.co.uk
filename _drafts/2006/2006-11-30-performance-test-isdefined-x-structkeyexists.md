---
id: 20
title: 'Performance Test: isDefined x structKeyExists'
date: 2006-11-30T00:00:00+00:00
categories:
  - coldfusion
---
The graphics will show it, but basically I was comparing the performance between the two of them. And guess what?

In my tests on CF7, isDefined seems to be slightly faster than structKeyExists.  The factor here is that isDefined() is super-fast when the scope exists, i.e. isDefined("session.userID"), but really slow if a non-existent scope is used, e.g. isDefined("unknownStruct.userID").

However, in CF8 and Railo, structKeyExists() simply leaves isDefined() behind.

The code:

```
<!--- Number of iterations --->
<CFSET iterations=100000>

<!--- Looping using isDefined --->
<cfset tmp1 = getTickCount() />
<cfloop from="1" to="#iterations#" index="i">
	<cfif isdefined("variables.blog")></cfif>
</cfloop>
<cfset tmp2 = getTickCount() />
<cfset total1 = tmp2 - tmp1 />

<!--- Looping using structKeyExists --->
<cfset tmp3 = getTickCount() />
<cfloop from="1" to="#iterations#" index="j">
	<cfif structKeyExists(variables,"blog")></cfif>
</cfloop>
<cfset tmp4 = getTickCount() />
<cfset total2 = tmp4 - tmp3 />

<!--- The cfchart --->
<cfchart format="gif" xaxistitle="function" yaxistitle="Loading Time">
	<cfchartseries type="bar" serieslabel="isDefined">
		<cfchartdata item="isDefined" value="#variables.total1#">
	</cfchartseries>
	<cfchartseries type="bar" serieslabel="structKeyExists">
		<cfchartdata item="structKeyExists" value="#variables.total2#">
	</cfchartseries>
</cfchart>
```

And the results:
  
<img src="http://files.placona.co.uk/isdefined_structkey/isdefinedxstructkeyexists.png" alt="StructKeyExists x IsDefined" width="320" height="240" />
