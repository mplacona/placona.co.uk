---
id: 32
title: ColdFusion on Ubuntu
date: 2006-12-08T00:00:00+00:00
categories:
  - coldfusion
tags:
  - coldfusion
  - Linux
---
After problems with the wifi (which is almost working at the moment), I decided then to install ColdFusion.

I found some good stuff on google about this installation, which by the way is pretty straight forward, as you basically press enter in the console instead of pressing next in the interface installation.

The version I installed was CF 7.02 for Linux. After the installation, I checked the install logs, and there wasn't anything wrong.

I had Apache 2 installed on my laptop, but decided to try the built in on port 8500, and didn't have any problem until I tried to start the ColdFusion service.

I got and error with a message like this:
  
"Error: please check cfserver.log"
  
When checking the logs I found only one message.
  
"Unknown Id: placona"

So... what the hell is it? Bloody hell it was too good to be true!

I then uninstalled and tried to install it logged as "root", instead of using "sudo" for the installation.

The installation was straight forward again, same configuration, but decided to change the login for CF.
  
This time I used "CFMX" instead of "placona".
  
At first I thought this might be the problem as I created a login for CF using the same computer's name.
  
When I tried to start CF again, I got the same error, but this time on the logs I saw:
  
"Unknown id: CFMX".

I was wrong, this had nothing to do with the machine name, but with the user name I was using for CF.
  
I then went to Ubuntu user manager and created a user with the exact user name and password as I created for ColdFusion administrator.
  
When I tried to start CF again...
  
"ColdFusion is running..."
  
So here's my tip:
  
Everytime you install CF, create a system user with the same details as provided for the installation.
