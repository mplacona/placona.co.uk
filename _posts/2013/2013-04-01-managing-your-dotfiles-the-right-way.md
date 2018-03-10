---
id: 1224
layout: post
title: Managing your dotfiles the right way
date: 2013-04-01T21:12:09+00:00
dsq_thread_id:
  - "5434820656"
categories:
  - Technology
tags:
  - General Techie Stuff
  - Linux
---
It's no secret that on the UNIX world, <a title="dotfiles on wikipedia" href="http://en.wikipedia.org/wiki/Dot-file" target="_blank">dotfiles</a> play a very important part when it comes to making your terminal look good. Be it on Linux, be it on a Mac. Dotfiles are there so you can configure your favourite software to look just the way you like it.

I especially use dotfiles to customize the look on my terminal, and to manage bundles I use with <a title="Vim on wikiledia" href="http://en.wikipedia.org/wiki/Vim_(text_editor)" target="_blank">Vim</a>. One thing that normally annoys me, is the fact that whenever I rebuild my machine (or build a new one) I need to copy over my dotfiles, and obviously make sure they are kept up-to-date on all my devices when I change something.

I've heard about people adding their dotfiles to GitHub, and even noticed GitHub themselves <a title="Dotfiles on GitHub" href="http://dotfiles.github.com/" target="_blank">encourage you to do the same</a>. I decided to give it a go, and will describe here what you need to do in order to have your dotfiles stored there, and most importantly, how to quickly load them up on any other computers boxes you may have.

Start by creating a folder called "dotfiles" on your home directory, and move all your dotfiles into it.

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/5281333">Gist</a>.
  </noscript>
</div>

In the example above, I'm only covering my vim and bash dotfiles. You can cover as many as you like by simply moving your files into the dotfiles directory.

Now it's time to create your install script also under our ~/dotfiles directory. You should use this script every time you want to install your dotfiles on a given machine. So let's open vim (or your favourite text editor) and create the following file:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/5286861">Gist</a>.
  </noscript>
</div>

The file is pretty simple, as it contains a list of files which you want to have copied, and a loop to put them on the right location and create symlinks on your home directory.

Now, it's really important that you name this file correctly, as you want to be able to execute it. And after having created it, we need to give it execute permissions, as we want to be able to run it

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/5286898">Gist</a>.
  </noscript>
</div>

If you run this file now, you should see the following happening on your screen:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/5286921">Gist</a>.
  </noscript>
</div>

Good. We're ready to push this to GitHub, so we never have to go through this process again.

Go ahead and create  a new repository on GitHub called `dotfiles`.

Now, back to your terminal and run the following commands:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/5286960">Gist</a>.
  </noscript>
</div>

From top to bottom we've done the following:

  1. <span style="line-height: 13px;">navigated to our newly created directory</span>
  2. turned it into a local git repository
  3. added all the files it contained into our local Git repository
  4. committed all the added files into the new local repository
  5. hooked up our local git repository with the GitHub repository
  6. pushed our files to the remote (GitHub) repository

If everything went OK, you should now be able to browse your remote repository (mine is <https://github.com/mplacona/dotfiles>) and see all your dotfiles (as well as your installer) listed there.

Now, the beauty of it, is the fact that whenever you want your dotfiles in any other box, you can simply do the following:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/5287006">Gist</a>.
  </noscript>
</div>

All your settings will be copied and applied.

As previously mentioned, my dotfiles are in <https://github.com/mplacona/dotfiles>, so fell free to fork it, modify and maybe even collaborate.
