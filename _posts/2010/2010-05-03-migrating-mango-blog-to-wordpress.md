---
id: 317
title: Migrating Mango Blog to WordPress
date: 2010-05-03T11:00:48+00:00
categories:
  - coldfusion
tags:
  - General Techie Stuff
  - Mango Blog
  - Railo
image: 
  path: /images/2010/05/migrating_from_mango_to_wordpress.jpg
---

As <a title="A change is always welcome" href="https://www.placona.co.uk/a-change-is-always-welcome/" target="_self">previously promised</a>, today I'll be publishing my migration scrips from <a title="Mango Blog" href="http://www.mangoblog.org/" target="_blank">Mango Blog</a> to <a title="Wordpress" href="http://wordpress.org/" target="_blank">WordPress</a>.

As mentioned previously, I wrote this script entirely for my own benefit, so please excuse me if it doesn't meet your expectations. It has only been tested on mySQL, but should run on other SQL engines without major updates.

The script is supposed to deal with all the posts and comments, and will convert code snippets that use the <a title="Tony Garcia's syntax highlighter plugin for mango blog" href="http://objectivebias.com/entry/new-and-much-improved-syntaxhighlighter-plugin-for-mango" target="_blank">SyntaxHighlighter plugin</a> (by Tony Garcia) into the default <a title="Alex Gorbatchev Syntax highlighter" href="http://alexgorbatchev.com/SyntaxHighlighter/" target="_blank">Alex Gorbatchev</a>'s SyntaxHighlighter style. So the only thing you will need to do, is install a WordPress plugin that can deal with the tags. I'm using a plugin called <a title="Syntax highlighter plugin" href="http://wordpress.org/extend/plugins/syntaxhighlighter/" target="_blank">SyntaxHighlighter Evolved</a>, and am very happy so far.

It will also make sure all the categories are adequately created and asigned to your posts as they are created, so you won't have to manually create them, or import them in a separate batch. Categories in WordPress a very tricky, and it took me a great deal of time to understand exactly how they are stored, and how the relationships work, so this should save you a long time on the migration.

I'll briefly explain the script's functionality here, but the comments on the code should be enough ro help someone trying to extend it, or even make it work with other blogging engines.

There is only one file responsible for the actions, and as long as the right method is called (batchPostWordpress), everything should happen automatically, and your posts, along with comments and everything else will be migrated. The only thing this script does not deal with, are the images, but as you should already be using only image paths (i.e. you are not storing anything on the database), your images should still work as long as they are stored on the right path. In my case, as I normally store images on a separate server, I wouldn't have to worry about that.

#### <span style="text-decoration: underline;">Step ONE:</span>

You must have two ColdFusion DSN's on your server. One is for the current Mango Blog, and another for the new WordPress install. Obviously your WordPress won't be using this DSN after you have migrated, but as this is a ColdFusion script, and you will be using ColdFusion to migrate your content, you will need a DSN created on your ColdFusion server.

In my case, I was "creative", and called one **mango** (pointing to the mangoblog datrabase) ****and another one **wordpress** (pointing to the wordpress database). No rocket science up to here as you can see.

#### <span style="text-decoration: underline;">Step TWO:</span>

<a title="Mango2Wordpress download" href="https://github.com/mplacona/Mango2Wordpress" target="_blank">Download the files</a>, and extract them to your ColdFusion root, or anywhere where you can execute CFML files. For this example, I'm executing everything from ColdFusion's root (127.0.0.1 OR localhost).

Having the files in there, open runner.cfm, and change the variables **mango_dsn** and **wordpress_dsn** to suit your needs. Mine looks like this:

```
<cfset posts = createObject("component", "PostManager").init	(
											mango_dsn : 'mango',
											wordpress_dsn : 'wordpress'
											) />
```

On the next lines, you will find the following:

```
<cfset qPosts = posts.batchPostWordpress(
									start 	: 0,
									limit 	: 100
										) />
```

This pretty much says everything. It's calling the method batchPostWordpress and processing posts in batches of 100 posts. I ran this with batches of 200 posts without any problems, and it only took about 30 seconds running on Railo. The numbers may vary according to the number of posts you have, as well as the number of comments and categories. Remember that if you have too many comments, your posts will take longer to be migrated, as everything is created in one go.

#### <span style="text-decoration: underline;">Step Three:</span>

Run the file  runner.cfm (in my case http://127.0.0.1/runner.cfm), and wait till the page stops loading. Once everything is done, you should see a message saying "Done!" on the screen.

Well done, you've just migrated from Mango Blog to WordPress without any major hassle.

This script is dealing with a number of custom things I had on my setup, such as different ways of posting code snippets. It should be a problem to people using only one way, or not using it at all, as it tries to replace text only, and won't break anything should the text isn't available.

The private method cleanupPostCode, is the method that dos all the conversions, and it's there that you will need to add any other conversion you may need should you be using other form of syntax highlighting. I'd recommend that id you are not using it, you can simply replace lines 153 and 154 to read:

```
<cfset var cleanContent = arguments.content>
<cfset var cleanExcerpt = arguments.excerpt>
```

This way, you are not cleaning up your post's code, and that should make the code run considerably faster. if you leave it as it was before, it won't break anything as previously stated.

I hope this script is of any use to someone, and if you feel like modifying / improving the code, please contact me sending the updates, and I'll merge it and give credit where credit is due. Also, on the right-hand menu, you will find a link to PayPal, where you can make donations to help maintaining this website. Any amount will be much appreciated.
