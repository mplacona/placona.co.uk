---
id: 166
title: A more elaborated jQuery Drag & Drop (with cloning)
date: 2009-08-21T00:00:00+00:00
dsq_thread_id:
  - "5434820387"
categories:
  - Javascript
tags:
  - JQuery
  - Technology
---
I've decided to get back at jQuery <a title="jQuery - Draggables" href="http://docs.jquery.com/UI/Draggables" target="_blank">draggable</a> and <a title="jQuery - Droppables" href="https://docs.jquery.com/UI/Droppables" target="_blank">droppable</a> to a personal project I've been working on. In the past, I've demonstrated how to do <a title="Quick and Dirty jQuery Drag and Drop" href="https://www.placona.co.uk/93/javascript/quick-and-dirty-jquery-drag-drop/" target="_blank">basic drag and drop</a>, but this time I needed something a little bit more elaborated.
  
I won't spoil my personal project by showing what it before it gets done, but I'll show here an example of what I wanted to accomplish which will use pretty much the same functionality, but in other application.
  
The idea is:
  
I have a stage where I have a bunch of components that should be dragged from one side to another. Those components have to be cloned, and not totally dragged as I might want to use them more than one time.
  
A sketch of it would be on the lines of:
  
<img alt="jQuery drag & Drop Example" src="http://files.placona.co.uk/drag_drop/drag_drop.png" width="342" height="430" />
  
As you can see, my icons need to stay on the left, but a clone of it can always be dragged to the right. This is not a finished version, but show pretty much all of the steps I had to follow in order to accomplish it. It's not a simple solution, and did involve loads of researching and asking around. The jQuery's documentation is not really vast, and does not cover (and should not really) every single example.
  
I start with importing all my necessary libraries from Google Servers.

```javascript
<!-- import necessary libraries -->
<script src="http://www.google.com/jsapi" type="text/javascript">
</script>
<script type="text/javascript">
   google.load("jquery", "1.3.2");
   google.load("jqueryui", "1.7.3");
</script>
<!-- Include stylesheets -->
<link rel="stylesheet" type="text/css" href="stylesheets/style.css" media="all" />
```

Then I start with my JavaScript code for <a title="jQuery - Draggables" href="http://docs.jquery.com/UI/Draggables" target="_blank">draggable</a> and <a title="jQuery - Droppables" href="http://docs.jquery.com/UI/Droppables" target="_blank">droppable</a>:

```javascript
$(document).ready(function () {
    //Counter
    counter = 0;
    //Make element draggable
    $(".drag").draggable({
        helper: 'clone',
        containment: 'frame',
        //When first dragged
        stop: function (ev, ui) {
            var pos = $(ui.helper).offset();
            objName = "#clonediv" + counter
            $(objName).css({
                "left": pos.left,
                "top": pos.top
            });
            $(objName).removeClass("drag");
            //When an existiung object is dragged
            $(objName).draggable({
                containment: 'parent',
                stop: function (ev, ui) {
                    var pos = $(ui.helper).offset();
                    console.log($(this).attr("id"));
                    console.log(pos.left)
                    console.log(pos.top)
                }
            });
        }
    });
    //Make element droppable
    $("#frame").droppable({
        drop: function (ev, ui) {
            if (ui.helper.attr('id').search(/drag[0-9]/) != -1) {
                counter++;
                var element = $(ui.draggable).clone();
                element.addClass("tempclass");
                $(this).append(element);
                $(".tempclass").attr("id", "clonediv" + counter);
                $("#clonediv" + counter).removeClass("tempclass");
                //Get the dynamically item id
                draggedNumber = ui.helper.attr('id').search(/drag([0-9])/)
                itemDragged = "dragged" + RegExp.$1
                console.log(itemDragged)
                $("#clonediv" + counter).addClass(itemDragged);
            }
        }
    });
});
```

The code above is responsible for the dragging and dropping iterations.
  
I just want to highlight that even though the draggable component has an attribute called helper, and you can set it to clone, it does not necessarily clone the objects, but give a "false impression" of objects being dragged.
  
The object only is cloned when it's dropped at the stage.
  
Just after I've created my JavaScript, I create some HTML to hold it all. It's really simple and crude, but will do the job and show what's to be shown.

```javascript
<div id="wrapper">
  <div id="options">
    <div id="drag1" class="drag">
    </div>
    <!-- end of drag1 -->
    <div id="drag2" class="drag">
    </div>
    <!-- end of drag2 -->
    <div id="drag3" class="drag">
    </div>
    <!-- end of drag3 -->
    <div id="drag4" class="drag">
    </div>
    <!-- end of drag4 -->
    <div id="drag5" class="drag">
    </div>
    <!-- end of drag5 -->
    <div id="drag6" class="drag">
    </div>
    <!-- end of drag6 -->
  </div>
  <!-- end of options -->
  <div id="frame">
    <span id="title">
    <h2>
      What do you know?
    </h2>
    </span>
    <table id="tbldevs" border="1">
      <thead>
        <tr>
          <th>
            <span id="names">John</span>
          </th>
          <th>
            <span id="names">Paul</span>
          </th>
          <th>
            <span id="names">George</span>
          </th>
          <th>
            <span id="names">Ringo</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- end of frame -->
</div>
<!-- end of wrapper -->

```

It really is very simple and only creates some divs (which will be manipulated), and a table with a bunch of lines.
  
The css is then applied, so all the images load, and show the pretty stuff.
  
I've added comments to my code, so I think it's pretty simple to follow it. I'll be using this same code for a next example which will add a little more functionality to it. In the meantime, you can check the [working example](http://examples.placona.co.uk/drag_drop "Complex Drag & Drop - example"){.broken_link} or [download the code](/images/2009/08/example.rar "Drag & Drop example").
  
And that's my take on it. Obviously someone might have a better way of doing it, so if you do, by all means  bring it on, and I shall update this post.
  
Hope you enjoy it!
