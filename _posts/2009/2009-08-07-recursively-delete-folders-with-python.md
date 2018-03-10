---
id: 161
title: Recursively delete folders with Python
date: 2009-08-07T00:00:00+00:00
dsq_thread_id:
  - "5434820354"
categories:
  - Technology
tags:
  - General Techie Stuff
  - Python
---
<p align="center">
  <img src="http://files.placona.co.uk/py_remover/recursion_flat.png" alt="Recursion" width="320" height="90" />
</p>

At work we've been doing some deploy optimization, and the need of automatically deleting (recursively) specific folders came up.
  
We use <a title="MXUnit" href="http://mxunit.org/" target="_blank">MXUnit</a> to **<a title="Unit Testing" href="http://en.wikipedia.org/wiki/Unit_testing" target="_blank">Unit Test</a>** our applications, and store all of our tests based on what they're related (inside _test folders). So basically we end up having lots of folders in our file structure that are not supposed to go into production for security reasons.

We use SVN for development, but don't use it on production for security reasons as well, so we always end up with a deploy package (SVN export) containing all of the files necessary for a specific release.

At the moment this package is generated, we still have our test cases in it, and it would be really painful to delete all the "**_test**" folders
  

  
one by one if the release is too big.

We easily end up with something like:

<img src="http://files.placona.co.uk/py_remover/folders.png" alt="Messy folders" width="200" height="356" />

We then thought of an automated way of removing all this folders. 

I first looked at a simple batch file that would "spider" the folder and delete all occurrences of an specific folder name. Not too long after I realized this is a rather complex task for someone who doesn't really know his way around batch files.

I've been a <a title="Python Programming Language" href="http://www.python.org/" target="_blank">Python</a> enthusiast for a few months, so I thought I should give it a try and write something using it. The script turned out to be ridiculously simple.

I first do my necessary imports and read information from a configuration xml file:

```ruby
import os
import sys
from xml.dom import minidom

emptyDirs = []

""" Read XML Settings """
doc = minidom.parse('settings.xml')
file    = doc.getElementsByTagName("files")
file    = file[0]

"""
    Set the path if it's not empty, or use current folder.
    Use sys.frozen to detect if we're coming from an executable
"""
path = file.attributes["path"].value
if path == "":
    try:
        sys.frozen
    except AttributeError:
        path = os.path.dirname(sys.argv[0])
    else:
        path = os.path.dirname(sys.executable)


# the folder name to be removed
remove = file.attributes["remove"].value
```

I then define the two methods responsible for deleting files and directories

```python
""" Delete files inside directories prior to its deletion """
def deleteFiles(dirList, dirPath):
    for file in dirList:
        print "Deleting " + file
        os.remove(dirPath + "/" + file)
""" Delete the directory itself ""
def removeDirectory(dirEntry):
    print "Deleting files in " + dirEntry[0]
    deleteFiles(dirEntry[2], dirEntry[0])
    emptyDirs.insert(0, dirEntry[0])
```

The next bit of code is considered the most important, as it walks through the directories and it's children

```python
# Walk through the tree recursively
tree = os.walk(path)
```

I then loop throuh my tree results calling my methods defined above.

```python
""" Call the functions recursively and remove files &amp; directories """
for directory in tree:
    if remove in str(directory[0]):
        removeDirectory(directory)
for dir in emptyDirs:
    if remove in dir:
        print "Removing " + dir
        os.rmdir(dir)
```

I first need to make sure I'm deleting all the files inside the folders prior to the folders deletion, otherwise I'll get errors saying the folder is not empty.
  
And that's all I had to do. I then thought I'd need to have a way to distribute it, as some people at work won't have python installed, so I didn't wanna have them going through the hassle of installing and running files from the command line.

On my next post, I'll be showing how to generate self-contained .exe files with <a title="Py2exe" href="http://www.py2exe.org/" target="_blank">py2exe</a>.
  
In the meantime, you can download the [source here](http://files.placona.co.uk/py_remover/test_remover_source.rar "Recursive Folder Remover - Source") and the <a title="Recursive Folder Remover - Binaries" href="http://files.placona.co.uk/py_remover/test_remover.rar" target="_blank">binaries here</a>.
