---
id: 144
title: New version of Railo released
date: 2009-05-30T00:00:00+00:00
categories:
  - coldfusion
tags:
  - Railo
---
This is only a point release (3.1.0.015) for Railo, but it addresses many bugs we reported in the last couple of weeks. Moreover, when I say last couple of weeks, it really is it. It is breath taking to see how quickly the Railo team nails down all of our requests and bug reports. Railo is still in beta, but according to Gert, it will soon have its final version released (Gert says it is sometime in June 2009).
  
Updating could not be any easier if you are on Railo 3.1x already. Simply go to your server admin, click on updates in the left menu, and click the button execute update. It's all done via admin interface, and there's no need to move *.jar files or anything.
  
Here is a list (from the official changelog) of what’s included within this update:

  * add support for HTTPS Resource
  * fixed several issues with FusionDebug integration
  * add flag to disable timserver (not in admin frontend yet)
  * add support for build in tag based on cfc custom tags
  * add support for metadata for cfc based custom tags
  * add support for flesystem placeholder {railo-config}
  * optimize check if a open datasource connection still is valid
  * fixed bug in tag dump (format classic and html) "when attribute label is defined and attribute expand is set to false the dump disappears"
  * fixed bug in tag cfcatch/cfscript-catch "can not handle native exception names"
  * fixed bug in tag LSCurrencyFormat/LSEuroCurrencyFormat "empty string should be returned as 0"
  * struct function now also can handle query objects
  * optimized image processing
  * add support for constanr "NULL" to json serialization
  * add support for load escaped characters in json serialized text
  * improve performance loading application.cfc
  * add support for handling complex object types to BalzeDS Caster
  * improve performance in handling of java.util.Map Objects in Railo.
  * add support fpr pausing scheduled tasks
  * add support for type "url" to cfindex
  * add support for action "getPluginDirectory" to tag admin
  * add support for action "list" to tag index
  * fixed bug in tag invoke "can not forward argumentcollection with tag invoke"
  * fixed bug in tag queryparam "can not handle empty list"
  * fixed bug in tag storedproc "missing returncode when more data are popuated in cfstoredproc"
  * fixed bug in tag table "missing last row from query"
  * fixed bug in tag thread "initialization when parent thread is finalized fails"
  * fixed bug in Arguments Scope "if a value is defined but not set, it has to return null"
  * fixed bug in CGI Scope "structKeyExists does not work with CGI Scope"
  * improve performance in Undefined Scope
  * improve performance in Component Loader
  * improve performance of function ListFindNoCase
  * fixed bug in tag case "empty value as part of a list can not be handled"
