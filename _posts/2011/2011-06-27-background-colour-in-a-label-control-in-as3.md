---
id: 676
title: Background colour in a label control in AS3
date: 2011-06-27T22:33:52+00:00
categories:
  - Adobe
tags:
  - actionscript 3
  - as3
  - playbook
  - Adobe AIR
---

This is just a quick example of how to add a background colour to a label control in AS3.

Most people don't know, but the [label component](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/fl/controls/Label.html "AS3 Label Component") has a [TextField](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/text/TextField.html "AS3 TextField component") inside of it. What that means is that you can basically use all of the available methods within the TextField in a label. Here's an example of how to add a background colour to a label.

```
import fl.controls.Label;
// If you were doing Playbook development
// import qnx.ui.text.Label;
 
var lblName:Label = new Label();
lblName.textField.background = true;
lblName.textField.backgroundColor = 0xFFFFFF;
addChild(lblName);
```

And that's it. You now have a label with a white background. Seems pretty simple, but what is cool here, is the fact that your label can have pretty much the same behaviour as a text field, and you can modify it as you would in a text field.
