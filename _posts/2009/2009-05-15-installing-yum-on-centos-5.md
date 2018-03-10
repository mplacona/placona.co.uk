---
id: 139
title: Installing YUM on CentOS 5
date: 2009-05-15T00:00:00+00:00
dsq_thread_id:
  - "5434820224"
categories:
  - Linux
tags:
  - VPS
---
This is really for my future reference, but I thought someone would bump into that any time. I'm configuring a new CentOS 5 server and for my surprise it didn't come with [yum](http://en.wikipedia.org/wiki/Yellow_Dog_Updater_Modified) installed.

```
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/elfutils-libs-0.125-3.el5.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/gmp-4.1.4-10.el5.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/readline-5.1-1.1.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/python-2.4.3-21.el5.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/python-iniparse-0.2.3-4.el5.noarch.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/libxml2-2.6.26-2.1.2.1.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/libxml2-python-2.6.26-2.1.2.1.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/expat-1.95.8-8.2.1.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/python-elementtree-1.2.6-5.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/sqlite-3.3.6-2.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/python-sqlite-1.1.7-1.2.1.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/elfutils-0.125-3.el5.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/rpm-python-4.4.2-48.el5.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/m2crypto-0.16-6.el5.2.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/python-urlgrabber-3.1.0-2.noarch.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/yum-metadata-parser-1.1.2-2.el5.i386.rpm 
rpm -Uvh http://mirror.centos.org/centos-5/5.2/os/i386/CentOS/yum-3.2.8-9.el5.centos.1.noarch.rpm 
yum -y update
```
