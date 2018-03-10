---
id: 655
title: Quick tip on Flash Builder and application internationalization
date: 2011-06-01T22:58:10+00:00
categories:
  - Adobe
tags:
  - Adobe AIR
  - Flex
  - Mobile Apps
---
I'm building a new <a title="Blackberry Playbook" href="http://www.amazon.co.uk/gp/product/B004UL34EY/ref=as_li_tf_tl?ie=UTF8&tag=marplasblo-21&linkCode=as2&camp=1634&creative=6738&creativeASIN=B004UL34EY" target="_blank">Blackberry Playbook</a> app, and when starting to work with internationalization, I got stuck with a bug that wouldn't go away. I'm pretty sure this won't just affect just this kind of application, but anything that is built using Flash Builder and requires resource bundle files.

It's a pretty common standard to name resource bundle files as \*.properties, but it turns out Flash Builder ignores \*.properties files when packaging, and you end up with an error like:

<span style="color: #ff0000;">Error: Error #3003: File or directory does not exist.</span>

It actually took me quite a long time to figure that one out, since I was pretty sure the files were in the correct location. Changing the file extension to .prop did the trick, and now Flash Builder will package them successfully.

I believe there must be another way in Flash builder settings to make it not ignore *.properties files, but for the time being, simply renaming its extension will do.

Hope that helps someone in the future searching for this error.
