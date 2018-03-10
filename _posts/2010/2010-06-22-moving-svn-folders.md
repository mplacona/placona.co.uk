---
id: 539
title: Moving SVN Folders
date: 2010-06-22T11:32:42+00:00
dsq_thread_id:
  - "5434820521"
categories:
  - Technology
---
I recently had to move an entire folder on SVN from a place to another. When you think "folders", you simply imagine that would be an easy **drag & drop** task.

In fact, if you try to drag a folder into another, you will end up in a "missing" folder nightmare as such:

<img class="alignnone" title="Missing Folders on SVN" src="http://files.placona.co.uk/moving_svn_folders/missing_folders.jpg" alt="Missing Folders on SVN" width="602" height="130" />

This is not very good, as when you try to commit, it will most likely not let you. However,  if it lets you, it (SVN) will try to delete the folders first, and then re-create them again.

<a title="TortoiseSVN" href="http://tortoisesvn.tigris.org/" target="_blank">TortoiseSVN </a>makes it easier to do though, as with a very nifty trick, you can get it to use <a title="VSN Move" href="http://svnbook.red-bean.com/en/1.0/re18.html" target="_blank">svn move</a> properly.

To do so, simply right click (holding it) on the folders you want to move, and drag them to wherever you want them to be moved to.

Once you release the right click button, you should be presented with a screen like this:

<img class="alignnone" title="Moving SVN folders with tortoise SVN" src="http://files.placona.co.uk/moving_svn_folders/svn_move.png" alt="Moving SVN folders with tortoise SVN" width="355" height="312" />

This gives you various options of actions that can be performed with the selected folder, such as:

  1. Move the versioned items into the folder;
  2. Copy the versioned items into the folder;
  3. Export versioned items into the folder;

TortoiseSVN will then take care of everything for you, and when you commit, it will properly move your folders, and not give you any grief.
