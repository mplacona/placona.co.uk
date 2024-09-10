---
id: 172
title: IPTABLES - Opening server ports to specific IP addresses
date: 2009-09-06T00:00:00+00:00
dsq_thread_id:
  - "5434820438"
categories:
  - Linux
tags:
  - VPS
---

  
</div>



<!-- <p style="text-align: center;">
  <img src="http://files.placona.co.uk/iptables/iptables.jpg" alt="Iptables shell script" width="480" height="276" /><br /> (Photo: <a title="Photo by Jordan W" href="http://www.flickr.com/photos/welshboy/100250487/" target="_blank" rel="nofollow">Jordan W</a>)
</p> -->

I have been doing some housekeeping on my VPS, and decided there's a few ports that should only be accessed by certain IP addresses for security purposes.
  
My VPS uses Linux, so I had to find a way to somehow changing my [iptables](http://en.wikipedia.org/wiki/Iptables "iptables - Wikipedia") settings to block the specific ports to every IP address, except for the ones I specified.
  
It's pretty straight forward, and here  how you can block a specific port to everyone except for some IP addresses (the instructions are for Centos 5.5, but should work for other distros without problems):
  
Open our iptables settings file:

```bash
sudo nano /etc/sysconfig/iptables
```

Above your ACCEPT settings, include:

```bash
#IPs accepted to access port 5000
-A INPUT -p tcp -s 127.0.0.1 --dport 5000 -j ACCEPT
-A INPUT -p tcp -s 175.74.74.74 --dport 5000 -j ACCEPT
-A INPUT -p tcp -s 200.138.5.2 --dport 5000 -j ACCEPT
```

On the lines above, I create one exception per IP, as all of the IP's I want to access port 5000 are different and come from different geolocations. I could use a range of IP's as well:

```
-A INPUT -p tcp -s iprange -src-range 11.22.33.10-11.22.33.50 -dport 5000 -j ACCEPT 
```

Therefore, it would aggregate all the IP's starting at 11.22.33.10 until 11.22.33.50.
  
After making all my changes, I simply restart iptables:

```bash
service iptables restart
```
