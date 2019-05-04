---
layout: post
title: Android JetPack and Lifecycles
date: 2019-05-04T10:41:43+00:00
categories:
  - Android
tags:
  - jetpack
  - architecture
  - android
excerpt: "This post highlights the benefits of using Android JetPack and the Lifecycles components to guarantee integrity of your view's data"
comments: true
share: true
image: images/2019/04/android-jetpack-header.png
---
Handling [configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes) in Android can be a tricky subject. Configuration changes happen when you close an application, but also when you change the device's orientation for example. 

Historically it's been common practice to use [`onSaveInstanceState`](https://developer.android.com/guide/components/activities/activity-lifecycle#save-simple,-lightweight-ui-state-using-onsaveinstancestate) so your data survived configuration changes. The drawback to this is that using this doesn't allow for storing [much data about the view](https://stackoverflow.com/questions/9805441/onsaveinstancestate-limit). 

# The problem
Let's look at an example app that we've built that generates a random number between 1 and 42 when the application starts.

Running that application should give us a result like this:

<img class="alignnone size-full" src="/images/2019/04/android-jetpack-and-lifecycles-1.png" alt="Sample application running in portrait shows a random number" />

Great, we've been able to do this by writing the following code and calling that method from our activity:

```java
private fun createMagicNumber(){
    myRandomNumber = (1..42).shuffled().first()
}
```

Turning the device sideways should also give us that same result... right? Not really because that's a configuration change, so any data we have on the screen gets fetched again. Were this an expensive API request, for example, we'd be making it again.

<img class="alignnone size-full" src="/images/2019/04/android-jetpack-and-lifecycles-2.png" alt="Sample application running in landscape shows a different random number" />

While this is just a simple application and the data here could very easily be stored inside `onSaveInstanceState`, if we have a lot of data showing on the screen, this solution would be less than robust and limited to the amount of data we can save.

# The solution
When an activity is created or recreated, it handles a few different tasks such as 

- displaying the UI
- keeping track of user interaction
- handling the communication with the OS 

And obviously **loading any data from the network or database**. Doing this time and time again can be expensive and if you have a lot of data, it means the user needs to get that data from somewhere every-single-time.

Using [ViewModels](https://developer.android.com/topic/libraries/architecture/viewmodel) we can store and manage all of our UI-related data in a lifecycle conscious way.

Here are the changes I had to make to the number generator project in order to benefit from that.

I first started by adding a dependency to the lifecycle extensions into my project.

```diff
implementation 'com.android.support:appcompat-v7:28.0.0'
implementation 'com.android.support.constraint:constraint-layout:1.1.3'

+ def lifecycle_version = "1.1.1"
+ implementation "android.arch.lifecycle:extensions:$lifecycle_version"

testImplementation 'junit:junit:4.12'
androidTestImplementation 'com.android.support.test:runner:1.0.2'
androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
```
I then modified my Datasource class to extend `[ViewModel](https://developer.android.com/reference/androidx/lifecycle/ViewModel.html)`. This class generates a number between 1 and 42, but making it extend ViewModel as I did, changes its behaviour so it keeps state between configuration changes.

```diff
package uk.co.placona.jetpackdemo1

- class DataSource {
+ import android.arch.lifecycle.ViewModel
+ 
+ class DataSource: ViewModel() {
    private val tag = MainActivity::class.java.simpleName
    private lateinit var myRandomNumber:Number
```

Lastly, I changed the MainActivity so instead of calling the `getMagicNumber()` method directly, I now call it through the View Model Provider as follows:

```diff
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

-    val myData = DataSource()
-    tvMagicNumber.text = myData.getMagicNumber().toString()
+    val model = ViewModelProviders.of(this).get(DataSource::class.java)
+    tvMagicNumber.text = model.getMagicNumber().toString()
}
```

With that, we have the ViewModel now processing the data that needs to be sent to the UI as well as performing any logic. As an added bonus it also survives any configuration changes.

<img class="alignnone size-full" src="/images/2019/04/android-jetpack-and-lifecycles-3.gif" alt="A gif showing how the application behaves upon rotation after changes" />