---
id: 1196
layout: post
title: Installing Visual Studio on a different drive
date: 2013-02-13T14:16:53+00:00
dsq_thread_id:
  - "5434820614"
categories:
  - dotnet
comments: true
share: true
---
I've got a pro license of Visual Studio 2012, and decided to install it instead of my existing VS 2010 Express install.

Because I didn't actually have anything very important on my current install, I decided to uninstall my current VS 2010. When I originally installed it, I made sure it got installed on my `E:\` drive. To give you a bit of context on my setup, I've got an SSD as a boot drive (`C:\`) and a specific drive (`E:\`) which I use to install all my programs. I find it helps me backing up my stuff, as well as "separating concerns", since my boot drive is only used for... well booting 🙂

I then set off about installing VS2012, and the first screen I was presented with was where you actually define where your install is going to go. So I just change the drive letter to be `E:\` instead of `C:\`.

To my surprise, this is what I saw in the next screen:

<div id="attachment_1198" style="width: 460px" class="wp-caption aligncenter">
  <img class="size-full wp-image-1198" alt="VS2012 Install screen" src="http://www.placona.co.uk/wp-content/uploads/2013/02/batVv.jpg" width="450" height="512" srcset="https://www.placona.co.uk/wp-content/uploads/2013/02/batVv.jpg 450w, https://www.placona.co.uk/wp-content/uploads/2013/02/batVv-263x300.jpg 263w" sizes="(max-width: 450px) 100vw, 450px" />
  
  <p class="wp-caption-text">
    VS2012 Installation screen
  </p>
</div>

"No good!", it still wants to use over 2Gb of my `C:\` drive, even though I told it to only use my `E:\` drive.

After a bit of Googling, it it turns out more people have had this same problem, and there's even been a <a title="Why Visual Studio 11 Requires Space on the System Drive" href="http://blogs.msdn.com/b/heaths/archive/2012/03/07/why-visual-studio-11-requires-space-on-the-system-drive.aspx" target="_blank">blog post</a> on MSDN about it. While there's been some conversation on the comments in the blog post aforementioned, none one really seems to have come up with a decent (or at least temporarily decent) solution to the problem.

So here's a "temporarily decent" solution to this problem:

Simply create a <a title="Symbolic Link" href="http://en.wikipedia.org/wiki/Symbolic_link" target="_blank">SymLink</a> from the folder where `VS` "wants" to be installed, to the folder where "you" want to install it. This way, you "trick" the installer to think it's being installed on the system drive, but is is in reality installing it to the drive you defined on your symlink.

Think of it as a shortcut to a folder deeply nested within your file system. You can have it sitting on your desktop, but when you actually open it, you will find that the path to it is something like _`<letter>\my\deeply\nested\directory`._

So in order to do that, all you will need to do is the following:

  1. <span style="line-height: 13px;">Open command line as an administrator (you can type "<strong>cmd</strong>" and right click on it to run as admin)</span>
  2. Enter `mklink /J "C:\Program Files (x86)\Microsoft Visual Studio 11.0" "E:\Program Files (x86)\Microsoft Visual Studio 11.0"` 
      1. Where the `J` flag indicates you're creating a directory junction (see more <a title="MS create symlink" href="http://technet.microsoft.com/en-us/library/cc753194(v=ws.10).aspx" target="_blank">here</a>)
      2. The first path is where VS is trying to install itself
      3. The second path is where you want it to be installed
  3. Carry on and let it install

You will now notice the whole of it (except for things it adds to the registry) will have been installed on your preferred drive.

### Q & A

> Q: Why are you calling your solution "temporarily decent"? It seems perfect.

> A: It turns out that when you install any updates to VS, they will end up in your system drive, since VS updates don't "understand" symlinks, and in fact remove them.


> Q: And you only say that now? What do I do then?

> A: A comment added to <a title="Stack Overflow - How to change VS11 install directory?" href="http://stackoverflow.com/a/10455300/279395" target="_blank" class="broken_link">this answer</a> on StackOverflow seem to imply that you can do the update, and then merge your files manually by copying them into your other drive. You will need to re-create the symlink after that, but considering you don't get udpates every day, it's probably worth.


> Q: Will this be a problem for ever? 

> A: By the looks of it, yes! If you read the blog post I linked above, MS seems to think that's the way to go now, and you should have bigger drives if you wanted to have to avoid this whole workaround.