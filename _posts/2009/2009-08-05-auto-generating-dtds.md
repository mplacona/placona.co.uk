---
id: 162
title: Auto-Generating DTDs
date: 2009-08-05T00:00:00+00:00
dsq_thread_id:
  - "5434820358"
categories:
  - Technology
tags:
  - Misc
---
I've used this [DTD](http://en.wikipedia.org/wiki/Document_Type_Definition "DTD - Document Type Definition") generator tool a long time ago, but today I had to use it again, so I thought I should put an entry on my blog about it and keep it archived for future reference.
  
Download the file dtdgen.jar and copy it to your [java_installation]jrelibext (assuming it’s on your classpath)
  
Test to see if you can run java stuff by opening a command line and running: 

```bash
java
```

You should get some usage example text.
  
 
  
<!-- <img src="http://files.placona.co.uk/dtd_generator/java_dtd.JPG" alt="Testing Java Install" width="447" height="225" /> -->
  
 
  
If you do, you’re ready to generate DTD’s.
  
Copy your XML file to the desired folder and run the following script:
  
java DTDGenerator "path\_to\_my\_xml\_file.xml">"path\_to\_my\_generated\_dtd_file.dtd"
  
<!-- <img src="http://files.placona.co.uk/dtd_generator/java_dtd1.JPG" alt="DTD Generator Command" width="447" height="226" /> -->
  
 
