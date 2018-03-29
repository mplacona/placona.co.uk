---
id: 182
title: CFML 101 - Grouping arrays for column presentation
date: 2010-02-04T00:00:00+00:00
categories:
  - coldfusion
tags:
  - 'CFML - 101'
---
This is an idea I got from a <a title="Ruby on Rails extensions" href="http://api.rubyonrails.org/" target="_blank">Ruby on Rails</a> extension called <a title="Rails in_groups_of" href="http://api.rubyonrails.org/classes/Array.html#method-i-in_groups_of" target="_blank">in_groups_of</a>.
  
Basically the idea behind this method, is to be able to get an array of any size, and split it up in groups of arrays with smaller sizes.
  
One application that keeps coming back over and over again, is the ability to display tabular data in columns instead of rows.
  
Imagine the following array as an example:

```<cfset ArrFruits = ["Orange", "Apple", "Peach", "Blueberry",
"Blackberry", "Strawberry", "Grape", "Mango",
"Clementine", "Cherry", "Plum", "Guava",
"Cranberry"]>
```

<!--more-->

Which would generate the following:
  
![Array created in CFML](http://files.placona.co.uk/array_grouping/arrayComplete.jpg)

If you try to display the contents of this array in a table with four columns, you'd have to come up with a kind of a hack some people have used for ages which generates "" messing up with your HTML.What we really wanna do here is group this array by the number of items you want to show in each of the columns of your table.
  
So let's say we want to display the elements of our arrays in three columns, wouldn't it be nice it we had three groups, and used one array per groups?
  
Well, that's how my UDF works. You give it an array, tell how many groups you want returned, and in case you have groups with less items (i.e. you have 13 items, and want three groups, that means one of your groups will need to have two empty items as 13 is not divisible by 3.
  
My UDF would return something like:
  
<img src="http://files.placona.co.uk/array_grouping/arrayGrouped.jpg" alt="" width="170" height="602" />
  
Here's the code for it:</p> 

```
<cffunction  name="arrayGroupsOf" access="public" output="false" returntype="array">
	<cfargument name="arrObj" type="array" required="true" hint="An array object that will be split up in groups">
	<cfargument name="intGroup" type="numeric" required="true" hint="Number of items on each group">
	<cfargument name="padding" type="string" required="false" default="" hint="What should it be filled with in case there's empty slots">

	<cfset var resArray = createObject("java", "java.util.ArrayList").Init(arguments.arrObj) />
	<cfset var arrGroup = arrayNew(1) />
	<cfset var arrObjGroup = arrayNew(1) />
	<cfset var arrObjSize = resArray.size()>
	<cfset var subStart = 0>
	<cfset var subEnd = arguments.intGroup>

	<cfset arrGroupSize = ceiling(arrObjSize / arguments.intGroup)>
	<cfset arrArrayGroupSize = arrGroupSize * arguments.intGroup>

	<cfif arrArrayGroupSize GT arrObjSize>
		<cfset difference = arrArrayGroupSize - arrObjSize>
		<cfloop from="1" to="#difference#" index="ii">
			<cfset resArray.add(arguments.padding) />
		</cfloop>
	</cfif>

	<cfloop from="1" to="#arrGroupSize#" index="jj">
		<cfset arrGroup = resArray.subList(subStart, subEnd)>
		<cfset arrayAppend(arrObjGroup, arrGroup)>
		<cfset subStart = subStart + arguments.intGroup>
		<cfset subEnd = subEnd  + arguments.intGroup>
		<cfset arrGroup = arrayNew(1) />
	</cfloop>

	<cfreturn arrObjGroup>
</cffunction>
```

As you can see, the last group has two empty slots, and that's intentional, as this means you don't need to care about any kind of array validation on your loop, and that also means in case you want to display it in a table, all the cells will have a start and an end.
  
Now, what if you don't want to display something instead of showing empty spaces?
  
you can just pass the options parameter "padding", and specify what you want instead of empty spaces, and the function automatically pads the empty values for you.
  
An example of a call to it would be:

```
<table border="1">
	<cfoutput>
	<cfloop array="#GroupsOf(ArrFruits, 5)#" index="arrFruitsIX">
	 <tr>
	<cfloop array="#arrFruitsIX#" index="arrFruit">
	   	<td>#arrFruit#</td>
	</cfloop>
	 </tr>
	</cfloop>
	</cfoutput>
</table>
```

With an output that looks like:
  
<img src="http://files.placona.co.uk/array_grouping/arrayGroupedDisplay.jpg" alt="" width="342" height="85" />
  
Passing the argument padding will return the same thing, but with the string you specified instead of the blank spaces.</td> </tr>
