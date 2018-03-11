---
id: 1167
layout: post
title: Android - Where is my menu button?
date: 2013-02-09T22:16:54+00:00
dsq_thread_id:
  - "5435830709"
categories:
  - Android
tags:
  - Mobile Development
---
So you’ve created your super polished android application and added a navigation menu to it, so your users can go from a place to another in your application without having top jump to the main application screen. It’s great, they can now simply press the menu button, and and a little menu pops up showing them all options available in your application. You’ve obviously made sure to select the correct images, and use <a title="Android: Icon Design Guidelines" href="http://developer.android.com/guide/practices/ui_guidelines/icon_design.html" target="_blank">icons that adhere to the Android style</a>. Great! It’s time to start testing you application in as many devices as you can, and definitely make sure it works on any of the latest devices. Until you you see yourself facing a device that looks like this:

<p align="center">
  <img class="aligncenter size-full wp-image-1179" alt="WhereIsTheMenu" src="/images/2013/02/WhereIsTheMenu.png" width="450" height="123" srcset="/images/2013/02/WhereIsTheMenu.png 450w, /images/2013/02/WhereIsTheMenu-300x82.png 300w" sizes="(max-width: 450px) 100vw, 450px" />
</p>

<p style="text-align: center;">
  <em>Where is my flipping menu?</em>
</p>

<p align="left">
  It turns out most devices now don’t even come with a menu button (iPhone’s never had them for example), and more and more, developers are being discouraged to build applications that actually rely on a physical menu button.
</p>

> "So, does that mean you can’t use menu’s on your application?"

<!--more--> No, what it means, is that you’re now meant to use the action bar instead. A quick look on 

<a title="Android: Action Bar" href="http://developer.android.com/guide/topics/ui/actionbar.html" target="_blank">the documentation</a> clarified its usage and shows some examples of what your application would look like. Old school devices (pre Android 3.0) don’t support the action bar natively, and while this isn’t a major problem, you could simply end up without an action bar if you for example used “Theme.NoTitleBar” in the application context of your manifest. The scenario above would be catastrophic, since you’ve taken care of allowing your users to navigate through your application via a menu, that simply won’t exist if they don’t have a menu button, and you force the title bar to be hidden. If you then decide to show the title bar, your application’s menu will look cool(ish) on devices above <a title="Android: API level 11" href="http://developer.android.com/about/versions/android-3.0.html" target="_blank">API level 11</a>.

<p align="center">
  <img class="aligncenter size-full wp-image-1178" alt="MenuItemsNotShowing" src="/images/2013/02/MenuItemsNotShowing.png" width="492" height="142" srcset="/images/2013/02/MenuItemsNotShowing.png 492w, /images/2013/02/MenuItemsNotShowing-300x86.png 300w" sizes="(max-width: 492px) 100vw, 492px" />
</p>

<p style="text-align: center;">
  <em>Menu items being shown as “overflow”.</em>
</p>

<p align="left">
  And very naff on anything else:
</p>

<p align="center">
  <img class="aligncenter size-full wp-image-1175" alt="ActionBarNaff" src="/images/2013/02/ActionBarNaff.png" width="392" height="78" srcset="/images/2013/02/ActionBarNaff.png 392w, /images/2013/02/ActionBarNaff-300x59.png 300w" sizes="(max-width: 392px) 100vw, 392px" />
</p>

<p style="text-align: center;">
  <em>Menu items will be shown at the bottom, but the app name seems out of place here.</em>
</p>

<p style="text-align: left;" align="center">
  Whereas what we wanted in this case for older versions was something like:
</p>

<p align="center">
  <img class="size-full wp-image-1176" alt="ActionBarNotSoNAff" src="/images/2013/02/ActionBarNotSoNAff.png" width="397" height="61" srcset="/images/2013/02/ActionBarNotSoNAff.png 397w, /images/2013/02/ActionBarNotSoNAff-300x46.png 300w" sizes="(max-width: 397px) 100vw, 397px" />
</p>

<p align="left">
  With a menu like this:
</p>

<p align="center">
  <img class="size-full wp-image-1177 aligncenter" alt="GoodOldMenu" src="/images/2013/02/GoodOldMenu.png" width="392" height="81" srcset="/images/2013/02/GoodOldMenu.png 392w, /images/2013/02/GoodOldMenu-300x61.png 300w" sizes="(max-width: 392px) 100vw, 392px" />
</p>

<p align="left">
  The way around it is very simple. You can simply tell your application to use “windowNoTitle” for anything under <a title="Android: API level 11" href="http://developer.android.com/about/versions/android-3.0.html" target="_blank">API level 11</a> and to use it for anything above it.
</p>

So the trick here, is to create a custom style under `values` and another one under `values-11`. What this does, is tell the application to run the file under `values-11` for anything above and including `API Level 11`. For anything below that, the `values` folder will be used instead. The styles will look something like this: values/optional\_action\_bar.xml 

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/4747556">Gist</a>.
  </noscript>
</div> values-11/optional\_action\_bar.xml 

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/4747559">Gist</a>.
  </noscript>
</div> As you will see, we have named it “Theme.OptionalActionBar”, but you could have named it anything you wanted. To then use it, you can simply add “android:theme="@style/Theme.OptionalActionBar"” to your manifest (in the application tag), and your entire application will use it and “know” which custom style to use. There's one last thing we need to do after doing this though. Remember how our action bar looked a bit funny with the overflow?

<p align="center">
  <img class="size-full wp-image-1178 aligncenter" alt="MenuItemsNotShowing" src="/images/2013/02/MenuItemsNotShowing.png" width="492" height="142" srcset="/images/2013/02/MenuItemsNotShowing.png 492w, /images/2013/02/MenuItemsNotShowing-300x86.png 300w" sizes="(max-width: 492px) 100vw, 492px" />
</p>

What if we told our application to add those items directly into the action bar if it has enough space? Something more like:

<p align="center">
  <img class="size-full wp-image-1174 aligncenter" alt="ActionBarCool" src="/images/2013/02/ActionBarCool.png" width="498" height="118" srcset="/images/2013/02/ActionBarCool.png 498w, /images/2013/02/ActionBarCool-300x71.png 300w" sizes="(max-width: 498px) 100vw, 498px" />
</p>

> "Why, yes I'd like that!"

All you need to do, is modify the code on your menu.xml to have:

```
android:showAsAction="ifRoom"
```

And what this does, is basically "add a flag" to each of your menu items saying:

> "If I have the space, I'll make sure I show my icon proudly"

Your menus are now displayed correctly in new and old devices, and regardless of a menu button.