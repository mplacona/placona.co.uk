---
id: 38
title: Binary clock in CF
date: 2006-12-15T00:00:00+00:00
categories:
  - coldfusion
---
Early today I was looking for some Christmas presents and found a very nice [Binary Watch](http://www.gadgets.co.uk/item/BINARYW/Binary-LED-Watch.html){.broken_link}.
  
I was wondering who uses this kind of stuff, but I'm sure somebody uses. Imagine yourself in a club when that hot chick comes to you asking what time is it. Would you show that nerd piece on your wrist?
  
On the other hand a ColdFusion Clock would be very nice. So when the hot chick comes to you with that question, you could use your blackberry to say the time.
  
Nahh... The time is already on your blackberry, but... Well, it was a nice exercise at least.

Here's the CF code:

```
<cffunction name="getBinary">
    <cfargument name="value" required="true">
    <cfargument name="mask" required="true" hint="Four (Hours) or six (minutes) numbers are returned">
    <cfreturn numberformat(formatBaseN(arguments.value,2),arguments.mask)>
</cffunction>
<cffunction name="isChecked">
    <cfargument name="position" required="true">
    <cfargument name="value" required="true">
    <cfset var marked = "off">
    <cfif mid(arguments.value,position,1)>
        <cfset marked = "on">
    </cfif>
    <cfreturn "<img src=" &amp; marked &amp; ".jpg />">
</cffunction>
<cfset hour = getBinary(hour(now()),"0000") />
<cfset minutes = getBinary(minute(now()),"000000") />
```

And then some crappy HTML to display the clock

```
<table border="1" width="20%">
    <cfoutput>
        <tr>
            <td colspan="6">Hours</td>
        </tr>
        <tr id="hours" align="center">
            <td>8</td>
            <td>4</td>
            <td>2</td>
            <td>1</td>
            <td> </td>
            <td> </td>
        </tr>
        <tr align="center">
            <td>#isChecked(1,variables.hour)#</td>
            <td>#isChecked(2,variables.hour)#</td>
            <td>#isChecked(3,variables.hour)#</td>
            <td>#isChecked(4,variables.hour)#</td>
            <td> </td>
            <td> </td>
        </tr>
        <tr>
            <td colspan="6"></td>
        </tr>
        <tr>
            <td colspan="6">Minutes</td>
        </tr>
        <tr id="minutes" align="center">
            <td>32</td>
            <td>16</td>
            <td>8</td>
            <td>4</td>
            <td>2</td>
            <td>1</td>
        </tr>
        <tr align="center">
            <td>#isChecked(1,variables.minutes)#</td>
            <td>#isChecked(2,variables.minutes)#</td>
            <td>#isChecked(3,variables.minutes)#</td>
            <td>#isChecked(4,variables.minutes)#</td>
            <td>#isChecked(5,variables.minutes)#</td>
            <td>#isChecked(6,variables.minutes)#</td>
        </tr>
    </cfoutput>
</table>
```

Hope you like it!
