---
id: 171
title: Updating Java on Centos
date: 2009-09-02T00:00:00+00:00
dsq_thread_id:
  - "5435152238"
categories:
  - Linux
tags:
  - General Techie Stuff
  - Technology
  - Website Optimization
---
<!-- <p style="text-align: center;">
  <img src="http://files.placona.co.uk/update_java_centos/java_linux.jpg" alt="Java on Centos" /><br /> (Photo: <a title="Photo by tutchiio" href="http://www.flickr.com/photos/tippy/245562070/" target="_blank" rel="nofollow">tutchiio</a>)
</p> -->

I'm only writing this blog post because I usually try to keep my VPS up to date, and usually one of the things I have to do to accomplish such thing is updating the <a title="Java" href="http://www.oracle.com/technetwork/java/index.html" target="_blank">Java</a> version.
  
I always need to do a little bit of "googling" in order to find my way around this, as there's a few steps that need to be taken, so you can make sure that your classpath is correct, and that the newly installed Java is running as your default installation.
  
I start by going to the <a title="Java website" href="http://www.oracle.com/technetwork/java/javase/downloads/index.html" target="_blank">Java website</a> and downloading the most recent version.
  
It can be a bit tricky to download Java using <a title="GNU WGET" href="http://www.gnu.org/software/wget/" target="_blank">wget</a>, as Java's wesbite uses your session in order to download the file, so if you try something like:

```bash
wget http://link_to_new_java_update
```

You will end up with a file called something like:

> http://cds.sun.com/is-bin/INTERSHOP.enfinity/WFS/CDS-CDS\_Developer-Site/en\_US/-/USD/VerifyItem-Start/jdk-6u16-linux-i586.bin?BundledLineItemUUID=ovdIBe.mkHUAAAEjoKEu23n3&OrderID=7iFIBe.
  
> mxpUAAAEjiKEu23n3&ProductID=Dx1IBe.prBgAAAEirRcTvuC_&FileName=/

I've just downloaded the file to my **downloads** folder.
  
It's got everything you need, but a big name you don't need, so let's simply rename it, and move it to where we want it to be installed.
  
If you want to find out where your java installation is, simply execute the following command:

```bash
which java
```

In my case I normally install things in "/opt/soft", so I simply issue the following command:

```bash
sudo mv *.bin /opt/soft/jdk-6u16-linux-i586.bin
```

This will move everything with a <span style="text-decoration: underline;"><strong>.bin</strong></span> extension to the place where I like to install my software. Notice that as I'm moving it to a protected folder "/opt", I need to use sudo in front, so I have the necessary permissions to create files.
  
The file should now be called "**jdk-6u16-linux-i586.bin**" and be located at "/opt/soft" in my case, so:

```bash
cd /opt/soft
```

We then need to give it some permissions, as we are going to have to call this file as an executable:

```bash
sudo chmod a+x jdk-6u16-linux-i586.bin
```

If you execute ls-l on the command line, you should now see that this file has execute permissions.
  
You can now execute the file by issuing:

```bash
./jdk-6u16-linux-i586.bin
```

It will then ask to read a bunch of **terms & conditions**, and you are going to have to type "<span style="text-decoration: underline;"><strong>yes</strong></span>" to accept it.
  
Once you've accepted it, you will have to change your classpath, so your system becomes "aware" that a new java version has been installed, and is going to be used.
  
Create or edit the file /etc/profile.d/java.sh:

```bash
sudo nano /etc/profile.d/java.sh
```

This file must have the following code:

```bash
export JAVA_HOME=/opt/soft/jdk1.6.0_16/
export PATH=$JAVA_HOME/bin:$PATH
export PATH=$PATH:$JAVA_HOME/bin
```

In this case we are updating to JDK 1.6 release 16, but you should replace it with whatever version you are installing.
  
By running:

```bash
java -version
```

You should see that the current version is the one you've just installed. If it's not, it means you've done something wrong, so just repeat all the steps carefully, and you should be ok.
