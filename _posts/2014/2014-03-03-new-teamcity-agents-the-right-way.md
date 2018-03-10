---
id: 1327
layout: post
title: New TeamCity agents the right way
date: 2014-03-03T21:45:35+00:00
dsq_thread_id:
  - "5434820709"
categories:
  - dotnet
tags:
  - Technology
---
<img class="size-full wp-image-1337 alignnone" alt="TeamCity Logo" src="http://www.placona.co.uk/wp-content/uploads/2014/03/teamcity-logo.png" width="512" height="112" srcset="https://www.placona.co.uk/wp-content/uploads/2014/03/teamcity-logo.png 512w, https://www.placona.co.uk/wp-content/uploads/2014/03/teamcity-logo-300x65.png 300w" sizes="(max-width: 512px) 100vw, 512px" />

At work, I'm gradually moving our <abbr title='Continuous Integration' rel='tooltip'>CI</abbr> server from Hudson to TeamCity.

Nothing against Hudson really, but I feel that TeamCity is a much more robust CI Server when it comes to integrating with .Net. It allows you to publish artifacts from your builds, and has a killer integration between developers IDE's and itself, which is amazingly helpful to help developrs make sure they're not going to break the build... well before they break it.

But anyway, one thing that was slightly annoying me with TeamCity, is the fact that the build agents would often get disconnect, and all my builds would stay in a queue until I went and manually restarted the agents.

The "Build Agent Disconnected" quickly became very annoying, and by quickly looking up on Google, I found lots of people had the same issue, and while there were lots of responses or people claiming they found a solution to it, I never actually found anything of much use other than the screenshot <a title="TeamCity build agent disconnected" href="http://stackoverflow.com/a/19382047/279395" target="_blank" class="broken_link">this guy posted</a>.

When you add build agents on TeamCity, you get the option of adding them as a windows service, or simply as an agent that runs with TeamCity. I had tried to add multiple build agents as windows services before, but for a very strange reason, I would always end up with only one agent no matter what I did. TeamCity's documentation wasn't much help to be honest, and I ended up figuring this out after a couple of hours of trial and error. So here's how you do it properly.

<!--more-->

## Installing

### Download

Get the latest version of the MS Windows Installer at http://your\_local\_teamcity_url/update/agentInstaller.exe from within the build server

### Install

Run agentInstaller.exe and when the Choose Components screen is displayed, deselect "Windows Service" - I'll explain this later

<img class="size-full wp-image-1329 alignnone" alt="TeamCity install screen 1" src="http://www.placona.co.uk/wp-content/uploads/2014/03/img_1.png" width="498" height="380" srcset="https://www.placona.co.uk/wp-content/uploads/2014/03/img_1.png 498w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_1-300x228.png 300w" sizes="(max-width: 498px) 100vw, 498px" />

Choose a location where you would like to install

> Team City as of the current version is not particularly smart about suggesting a location, and will always suggest the location of an existing Agent, which will then overwrite your agent and mess things up. So make sure you chose one that doesn't already exist

<img class="size-full wp-image-1330 alignnone" alt="TeamCity install screen 2" src="http://www.placona.co.uk/wp-content/uploads/2014/03/img_2.png" width="500" height="383" srcset="https://www.placona.co.uk/wp-content/uploads/2014/03/img_2.png 500w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_2-300x229.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

### Configure

The following screen will then be shown once the installation is completed

<img class="size-full wp-image-1331 alignnone" alt="TeamCity installation screen 3" src="http://www.placona.co.uk/wp-content/uploads/2014/03/img_3.png" width="696" height="515" srcset="https://www.placona.co.uk/wp-content/uploads/2014/03/img_3.png 696w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_3-300x221.png 300w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_3-676x500.png 676w" sizes="(max-width: 696px) 100vw, 696px" />

Configure it as follows:

  * `env.TEAMCITY_JRE`: The location where your JRE is installed. Team city comes with its own, so you can use that. It will normally be under the team city installation folder in a folder called JRE (i.e. D:\apps\teamcity\jre)
  * `name`: This gets pre filled with the server name. Try and come up with something sequential that matches your installation directory (i.e. Build Agent 5). Spaces are cool here
  * `ownPort`: This is the port for your agent. it's important that each agent has a port and that the port is actually open. Anything above 9090 will be good. So suggest using 909{agent\_number}. Where agent\_number is the number of the agent you're installing. in this example our port would be 9095
  * `serverUrl`: this is the URL for your build server. It should also include any ports in it in case your build server is configured at a specific port (i.e. http://your\_local\_teamcity\_url:port\_if_any)
  * `tempDir`: you can leave that as default
  * `workDir`: you can leave that as default

## Adding your new agent as a windows service

### Preparation - Here is the trick {#Installingnewbuildagents-Preparation}

Edit the file wrapper.conf that has been created on the folder where you have installed your agent. In our example, it would be under D:\apps\teamcity\buildAgent5\launcher\conf

In that file, scroll all the way down and find:

<img class="size-full wp-image-1332 alignnone" alt="TeamCity wrapper.conf 1" src="http://www.placona.co.uk/wp-content/uploads/2014/03/img_4.png" width="840" height="381" srcset="https://www.placona.co.uk/wp-content/uploads/2014/03/img_4.png 840w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_4-300x136.png 300w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_4-676x306.png 676w" sizes="(max-width: 840px) 100vw, 840px" />

These will need to be updated so when you install this as a service, so you aren't overwriting an existing service you may already have.

<img alt="" src="http://confluence:8081/download/attachments/30507155/img_5.png?version=1&modificationDate=1393421013813&api=v2" data-image-src="/download/attachments/30507155/img_5.png?version=1&modificationDate=1393421013813&api=v2" />

For consistency we have named it after our initial configuration by appending the number 5 to both values.

### Installation {#Installingnewbuildagents-Installation}

From command prompt, go to the bin folder in your agent (D:\apps\teamcity\buildAgent5\bin in our case) and run the following:

<img class="size-full wp-image-1334 alignnone" alt="TeamCity install build agent terminal" src="http://www.placona.co.uk/wp-content/uploads/2014/03/img_6.png" width="661" height="153" srcset="https://www.placona.co.uk/wp-content/uploads/2014/03/img_6.png 661w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_6-300x69.png 300w" sizes="(max-width: 661px) 100vw, 661px" />

Verify that your service has been installed:

<img class="size-full wp-image-1335 alignnone" alt="TeamCity - List of services" src="http://www.placona.co.uk/wp-content/uploads/2014/03/img_7.png" width="611" height="88" srcset="https://www.placona.co.uk/wp-content/uploads/2014/03/img_7.png 611w, https://www.placona.co.uk/wp-content/uploads/2014/03/img_7-300x43.png 300w" sizes="(max-width: 611px) 100vw, 611px" />

Start it, and it should now appear as an active Build Agent in TeamCity agents
