---
id: 42
title: Regexp saves the day
date: 2007-01-19T00:00:00+00:00
categories:
  - coldfusion
tags:
  - Adobe
  - coldfusion
  - Misc
---
So, we just upgraded one of our servers to version 7.0.2. Everything was working fine, except for some stored procedures being called by tag.
  
What was wrong?
  
Basically, the versions before 7.0.2 **didn't bother** if the contents of the attribute **dbvarname** were being sent using an "@" before or not.
  
It means the something like:

```
<cfstoredproc procedure="my_proc" datasource="#request.ds#">
	<cfprocparam     
		type="In"
		cfsqltype="CF_SQL_INTEGER"
		dbvarname="@i_id"
		value="#attributes.i_id#"
		null="No">
	<cfprocresult name="content">
</cfstoredproc>
```

Will become:

```
<cfstoredproc procedure="my_proc" datasource="#request.ds#">
	<cfprocparam     
		type="In"
		cfsqltype="CF_SQL_INTEGER"
		dbvarname="@i_id"
		value="#attributes.i_id#"
		null="No">
	<cfprocresult name="content">
</cfstoredproc>
```

Apparently nothing changes, unless you have a look at the attribute dbvarname, and you'll see that an "@" was added before the variable name.

The way to fix it?
  
Very easy, just use your favorite IDE and replace using regular expression.

Search for: **dbvarname="([^@])**

Replace with: **dbvarname="@1**

And it's done! The regExp speaks for itself, as it's looking for something starting with the string dbvarname and that doesn't contain an "@" at the beginning. Then it replaces the result for the string **dbvarname="@** and the variable name.
  
Hope it helps someone.
