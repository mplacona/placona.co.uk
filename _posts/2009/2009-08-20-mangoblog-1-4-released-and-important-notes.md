---
id: 169
title: MangoBlog 1.4 Released and Important notes
date: 2009-08-20T00:00:00+00:00
categories:
  - coldfusion
tags:
  - Mango Blog
  - Railo
---
I'm probably late on this one, but [mangoBlog v1.4 has just been released](http://www.mangoblog.org/docs/downloads "MangoBlog 1.4 Released"). From the changelogs:

#### What's new in version 1.4

  * Revisions of posts and pages are now stored and user can "restore" an older version
  * Added a permission for users to not to be able to access the administation (thanks to Seb Duggan)
  * Added a replacement for Verity search to search in database
  
    directly (this search now includes comments). It is the default search
  
    now.
  * Plugin settings are now stored in database, which should make it easier to migrate a blog
  * TinyMCE editor upgraded
  * Configuration file now has placeholders for base path so that directories do not need to be hardcoded in configuration file
  * Ability to disable or enable threading
  * Plugins made for ColdFusion 8 only can extend org.mangoblog.plugins.BasePlugin without including BasePlugin in their own folder
  * Friendly URLs for author archives

**Changes in theme tags:**

  * Added a descending order option for the comments tag
  * Enhanced Posts tag to be able to show posts for a given author
  * AuthorProperty tag can now output the name of the role of the author
  * Added AuthenticatedAuthor tag that allows the theme to know if the current visitor is logged in

**Administration:**

  * Post pagination and search
  * Session will be maintained while user is writing a post or page
  * Added permission to manage pods and to run blog updates
  * Drafts now always "float" to the top of the list
  * Ability to remove plugins
  * Added "beforeAdminPageContentEnd" event to the bottom of the page
  
    edit screen and "beforeAdminPostContentEnd" to the bottom of the post
  
    edit screen
  * Ability to manually set the post URL (thanks to Seb Duggan)
  * Added more functionality to BasePlugin to make it easier to write plugins.
  * Plugins can now run their own upgrade method when a new version is installed via the administration
  * Paging for authors screen
  * Cosmetic changes: Add ons renamed to Plugins, go directly to edit
  
    mode after adding a new post or page (thanks to Seb Duggan), changed
  
    Pod Manager icon

**Updates to new installs:**

  * Added new plugin that allows keeping the old BlogCFC URLs functional
  * Added sample data
  * Include CFFormProtect (enabled by default instead of Captchas)
  * New default theme called Cutline
  * New installs on Railo will now have an error on main page (thanks to Andrea Campolonghi)

**Plugins updated:**

  * formRememberer (included in update)
  * CFFormProtect (not included in automatic update)

**Bug fixes:**

  * Solved some compatibility issues with Railo
  * Fixed XSS vulnerability (themes need to be updated to take advantage of this)
  * Preview link was wrong in future posts
  * Comments are now rejected if comments are closed for a post or page
  * Error when entering an empty search string
  * Error when not using friendly URLs
  * and more...

<h2 style="color: #ff0000;">
  Important:
</h2>

Now, for those who are using Railo and are updating via admin interface. There is a **bug with the mango updater and Railo**, Laura (Mango blog's developer) explains:
  
"This is a known issue with Railo (we should report it, since it is an incompatibility with CF). I thought 1.3.1 included the fix, but apparently not.
  
Open file components/Updater.cfc and change line 436 from

```
<cfhttp url="#arguments.zipAddress#" method="get" path="#tempdir#">
```

to:

```
<cfhttp url="#arguments.zipAddress#" method="get" path="#tempdir#" file="#filename#">
```

"
  
More info can be found here:
  
[Mango 1.4 upgrade bug / Railo 3.1 / Centos 5](http://www.mangoblog.org/forums/messages.cfm?threadid=3255A200-3048-2A53-70FA001CE1EE3C89 "Mango 1.4 update Bug")
