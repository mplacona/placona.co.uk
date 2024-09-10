---
id: 359
title: Getting serial ports to work on Linux
date: 2010-05-09T20:09:11+00:00
dsq_thread_id:
  - "5434820492"
categories:
  - General Techie Stuff
  - Linux
  - Technology
image: 
  path: /images/2010/05/serial_ports_ubuntu.jpg
---
I've recently been "forced" to move my desktop from Windows to Linux again. Basically my current desktop "decided" it won't support Windows anymore, and any attempt to start it ends up in a <a title="Blue Screen of Death" href="http://en.wikipedia.org/wiki/Blue_Screen_of_Death" target="_blank">BSOD</a>, and I just got fed-up of trying to get it to work.

In fact, all of my development at home is done on Linux anyway, and I was just using windows as my dummy operating system, and using virtualization with my development environment. move to Linux works just as well.

As usual the move to Ubuntu 10.4 was a breeze, and I didn't even have to download any of the drivers for things like graphics card, wireless or external hard-drives. everything worked straight away.

However, after I started to play with my "new" box, I noticed that my external serial ports were not working properly. They were passing the right signal and voltage, but somehow not being able to receive any feedback.

<!--more-->

I use serial ports for RS-232 protocol a lot with my <a title="Pic midrocontroller" href="http://en.wikipedia.org/wiki/PIC_microcontroller" target="_blank">pic programming</a>, and although I could simply use a Serial-to-USB cable, I find that it's just an extra layer, and you could easily blow your USB module should you do anything wrong.

<!-- <img class="alignleft" title="PCI card to two serial ports" src="http://files.placona.co.uk/serial_ports_ubuntu/pci_rs232_serial_port_two_com_ports.jpg" alt="PCI card to two serial ports" width="200" height="131" />The device I'm using is a PCI card that gives me two serial ports. I got it off eBay for a couple of pounds, and so far it has been working flawlessly. -->

Its communication is a lot faster than via USB, as I'm connected directly to the motherboard, therefore, no "middle-man" is used during the process.

As described previously, it started to malfunction after I moved on to Ubuntu, and even after I installed the correct driver that accompanies it, I would still not be able to download anything to my pic. the error I was getting was:

> Verification error - 0x00 transmitted but 0xFFFFFF80 received at byte 1

After some research, I found out that  the driver that comes with the board, does little or nothing to make sure it works properly on Linux, and I would  have to make sure the board was properly "initiated" once the operating system loaded up.

A quick Google brought me to <a title="Getting Serial Port to work under Ubuntu!" href="http://www.electronicsfaq.com/2010/02/getting-serial-port-to-work-under.html" target="_blank">this</a>. This guy gives a whole explanation of all the inner-workings and reasons why thigs aren't working, and he happens to also be using the same board as I am.

He also mentions that you can list all the available COM ports on your system by issuing the following command on terminal:

```bash
setserial -g /dev/ttyS*
```

This was returning:

```bash
/dev/ttyS0, UART: undefined, Port: 0x03f8, IRQ: 4
/dev/ttyS1, UART: undefined, Port: 0x1108, IRQ: 18
/dev/ttyS2, UART: undefined, Port: 0x1100, IRQ: 18
/dev/ttyS3, UART: unknown, Port: 0x02e8, IRQ: 3
```

The software I use to program my pic micro-controller was able to detect it, on /dev/ttyS0, so that's what I needed to get working for now.

on the website mentioned above, the guy mentions he was able to get everything working by issuing the following command:

```bash
sudo setserial /dev/ttyS[YOUR-PORT_HERE] uart 16550A
```

I then issued it for each of my ports, and got everything to work fine.

```bash
sudo setserial /dev/ttyS0 uart 16550A
sudo setserial /dev/ttyS1 uart 16550A
```

Now, when I run **setserial -g /dev/ttyS***, I get:

```bash
/dev/ttyS0, UART: 16550A, Port: 0xe800, IRQ: 22
/dev/ttyS1, UART: 16550A, Port: 0xe400, IRQ: 22
/dev/ttyS2, UART: unknown, Port: 0x03e8, IRQ: 4
/dev/ttyS3, UART: unknown, Port: 0x02e8, IRQ: 3
```

Next step was add this to my /etc/rc.local so it runs on startup, and everything is fine again.

I know this is slightly off-topic, but I thought it might be of help to somebody in the future.
