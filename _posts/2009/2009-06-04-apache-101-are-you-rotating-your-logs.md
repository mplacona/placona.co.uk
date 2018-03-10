---
id: 147
title: Apache 101 - Are you rotating your logs?
date: 2009-06-04T00:00:00+00:00
categories:
  - VPS
---
It came to my attention today that my website was _serving blank pages_, and I got really intrigued with it. I checked the memory, and everything was fine, and my logs wouldn't indicate any obvious error. I did a quick research, and some people were saying this happens due to your log files being full which cause your OS's open file to go nuts, and you run out of file slots. 
  
By running out of slots, your Apache starts serving blank pages, and won't work properly either. A quick way around to it, is cleaning up your logs.

<h2 style="color:red">
  STOP!
</h2>

We are not gonna simply get rid of the log files, as they are important, and can be used when something really goes wrong, or for access monitoring. One nice way of doing that is by rotating your log files, so the "full log files" will be backed up, and new ones will be created.
  
This is where <a title="Logrotate" href="http://whoopis.com/howtos/man.php?query=logrotate&apropos=0&section=0&type=2" target="_blank">logrotate</a> comes into place. By creating a simple script on etclogrotate.d (assuming you have logrotate already installed), you can rotate your logs automatically. This is how I created mine:

```bash
/var/www/mywebsite/logs/*log {
    rotate 5
    weekly
    missingok
    compress
    olddir /var/www/mywebsite/logs/old
    notifempty
    sharedscripts
    postrotate
        /bin/kill -HUP `cat /var/run/httpd.pid 2>/dev/null` 2> /dev/null || true
    endscript
```

Refer to the documentation to see what everything does, but basically I tell my system to backup my log files to a backup folder, and create a new one. The files will only be deleted after the 5th rotation, and the rotations will happen in a weekly basis.
  
Normally it should be done automatically for apache, but as I use a custom log file for each of my website, i need to create this new script for each of my websites.
