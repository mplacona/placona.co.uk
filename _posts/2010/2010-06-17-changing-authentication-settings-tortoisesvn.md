---
id: 533
title: Changing authentication settings on TortoiseSVN
date: 2010-06-17T12:51:48+00:00
dsq_thread_id:
  - "5434820518"
categories:
  - Technology
---
I've had my virtual machine (the one I use for development) rebuilt today, and to minimize overhead, we simply cloned a VM that had the desired settings.

Normally when you do that, everything goes smoothly, and you should have your VM up and running in a matter of minutes (only the time taken copy the files across).

One thing that buggered me though, was the fact that when I tried to commit files via SVN, they got committed under another user name.

It didn't take me long to figure out that the username it was using, was from whoever did the last commit in the machine it was cloned from.

It's not very obvious from a context point of view what the necessary steps are for you to change the user name and password on <a title="Tortoise SVN" href="http://tortoisesvn.tigris.org/" target="_blank">Tortoise SVN</a>.

To do so, you simply need to:

  1. Right click in any folder, go to "**TortoiseSVN**" on the context menu;
  2. Select "**Settings**";
  3. In the settings box, locate the item called "**Saved Data**";
  4. Click the "**Clear**" button that sits next to "**Authentication Data**";

You won't have any sort of feedback by doing that, but next time you try to perform any action via TortoiseSVN, it will prompt you for login and password.

Don't forget to mark "**save password**" on the same prompt where you added your user name and password, so you don't need to type it every time you perform any action.
