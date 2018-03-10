---
id: 25
title: Breaking the network?
date: 2006-12-05T00:00:00+00:00
categories:
  - Misc
---
I recently bought a brand new **Compaq Presario** desktop to my new flat. For the first week living there I was just using my laptop (also a Compaq Presario) to do whatever I needed to do. I'm not a big fan of working from the laptop as it's keyboard is a bit too small as well as it's screen.
  
I could use another dettached screen and keyboard, but IMHO it's just a whole bunch os paraphernalia, so I decided to buy a new desktop for my office at home.

The first thing I had to do was create a small/home network to be able to transfer some files I had on my laptop to my new desktop. The network creation was pretty straight forward and I could access my laptop at thse first attempt using my **wireless router**.

Then the pain started...

It didn't work the other way round (laptop to desktop). No matter what I changed, it would never work, even if I used cables instead of the normal wireless connection.

I then decided to dig into the **windows firewall** and there was nothing there. In a total mix of angry + hate I decided to switch both of the firewalls off. And guess what?

**THE DAMN THING STILL DIDN'T WORK!**

Whithout any other expectative about this I decided to try to recreate the network, just to make sure I didn't make any mistake on the first set-up. When I clicked "Finish" for the network connection I suddenly saw a very tiny (I wasn't wearing my glasses at the moment) **Norton Internet Security** box with the folowing text: "**The new rules for your network have been created**"

Dammit! I didn't even know this Norton Internet Security had a firewall. I don't use Norton since the version 2002, where after lots of headaches I uninstalled it and decided to use AVG forever ;-). I was just using this one because it came for free with the new desktop.

That was the problem. I just went to the Norton Firewall and added my laptop's IP, and things worked straight forward.

So here's the lesson:

Never ever forget to change the firewall configs when using Norton Firewall. You may end up breaking the whole thing before you realize the problem stands on the Computer Operator and not on software 😉
