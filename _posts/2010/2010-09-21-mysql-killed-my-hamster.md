---
id: 581
title: mySQL killed my hamster
date: 2010-09-21T21:56:51+00:00
categories:
  - Technology
tags:
  - VPS
---
Or my website even....

I've run some updates on my server today, and got prompted to upgrade mySQL.

All went well during the upgrade, but when trying to browse, I'd get the following message:

### **"Error establishing a database connection"**

Initially I thought it would be mySQL daemon trying to "kick in", and it would come back in just a sec. Two minutes passed, and I started to get worried.

I went on and tried to restart mySQL daemon to no success, as it would always give me the following message:

```
MySQL Daemon failed to start.
Starting mysqld:  [FAILED]
```

Not very helpful I thought, so I went to the logs located at:

/var/log/mysqld.log

There I found the following error:

```
"Option '--set-variable' is deprecated. Use --variable-name=value instead"
```

I then went to /etc/my.cnf and could verify that there were a few settings using "set-variable".

I simply replaced them for "variable-name=value" and it all came back to life.

Hope this helps anyone stuck with this problem.
