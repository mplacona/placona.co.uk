---
id: 1547
layout: post
title: Picasso - Same URL but different content
date: 2016-09-17T23:26:34+00:00
categories:
  - Android
tags:
  - android
  - caching
  - http request hack
  - picasso
image: images/2016/09/sample-676x324.png  
---
I love using Square's [Picasso](http://square.github.io/picasso/) library whenever I need to load images into my Android applications. It lets me load images from the internet into ImageViews with a single line of code.

```java
Picasso.with(context).load("http://i.imgur.com/DvpvklR.png").into(imageView);
```

Doing the same thing without the library is a whole different story, and Picasso even takes care of [caching and transformations](http://square.github.io/picasso/#features) for me.

### Until I hit a snag

Today I was working on a [demo](https://medium.com/@mplacona/exploring-the-vastness-of-realm-a-cross-platform-mobile-database-cda48ad76616) with a [RecyclerView](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.html) that loads random images from the internet to display as icons for each one of the items. The naive implementation on my View Adapter looked like this:

```java
private static final String ICON_URL = "https://unsplash.it/50/50?random";

...

@Override
public void onBindRealmViewHolder(ViewHolder viewHolder, int position) {
    final Note note = realmResults.get(position);
    viewHolder.mText.setText(note.getText());
    viewHolder.mDate.setText(note.getDate().toString());

    Picasso.with(getApplicationContext())
            .load(ICON_URL)
            .placeholder(R.mipmap.ic_launcher)
            .error(R.mipmap.error)
            .into(viewHolder.mIcon);
}
```

I've highlighted the code above to get you to think about what is going to happen with the result on the RecyclerView. Make sure you open the [ICON_URL](https://unsplash.it/50/50?random) on a new tab and refresh a few times to help you out.

<img class="alignnone size-full" src="https://media2.giphy.com/media/5gjGk5uuhRuVi/giphy.gif" alt="thinking..." width="500" height="213" />

If your guess was that all the images would be loaded the same for every single item on the RecyclerView, then you've either come across this problem or are pretty good at guessing.

Enabling logs show distinct requests being created from Picasso to the URL, which should in theory result in different images right?

```
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R4] Request{https://unsplash.it/50/50?random}
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R5] Request{https://unsplash.it/50/50?random}
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R6] Request{https://unsplash.it/50/50?random}
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R7] Request{https://unsplash.it/50/50?random}
```

As it turns out, it seems like the default behaviour for when you try to load the same URL with Picasso is that it only ever queues your request once. A deeper look into the log showed me only one of the requests was enqueued and executed. And this was not the easiest thing to realise in all honesty.

```
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R29] Request{https://unsplash.it/50/50?random}
6978-13784/uk.co.placona.realmnotes D/Picasso: Dispatcher  enqueued     [R29]+5ms 
6978-13787/uk.co.placona.realmnotes D/Picasso: Hunter      executing    [R29]+7ms 
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R30] Request{https://unsplash.it/50/50?random}
6978-13784/uk.co.placona.realmnotes D/Picasso: Hunter      joined       [R30]+0ms to [R29]+14ms, [R30]+0ms
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R31] Request{https://unsplash.it/50/50?random}
6978-13784/uk.co.placona.realmnotes D/Picasso: Hunter      joined       [R31]+0ms to [R29]+22ms, [R30]+9ms, [R31]+0ms
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R32] Request{https://unsplash.it/50/50?random}
6978-13784/uk.co.placona.realmnotes D/Picasso: Hunter      joined       [R32]+3ms to [R29]+43ms, [R30]+30ms, [R31]+21ms, [R32]+11ms
```

Theoretically loading up the same page over and over again should always result on the same content and if you remember well, in the beginning of this post I mentioned Picasso takes care of caching for me, and I presume in this case the URL will be the key.

Let's make a small change to the code and check whether we can force Picasso to think that it needs to enqueue and execute every single one of our URLs regardless.

```java
Picasso.with(getApplicationContext())
                    .load(ICON_URL + "&" + position)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.error)
                    .into(viewHolder.mIcon);
```                    

Doing pretty much the same thing as before, but notice I now have a number that gets appended to each URL. This should make my URLs look like this: https://unsplash.it/50/50?random&{number}.

<img class="alignnone" src="http://media0.giphy.com/media/qdBHt01vnl972/giphy.gif" alt="I'm ugly and I'm proud" width="500" height="375" />

Now let's look at the logs:

```
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R43] Request{https://unsplash.it/50/50?random&0}
6978-1213/uk.co.placona.realmnotes D/Picasso: Dispatcher  enqueued     [R43]+1ms 
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R44] Request{https://unsplash.it/50/50?random&1}
6978-1225/uk.co.placona.realmnotes D/Picasso: Hunter      executing    [R43]+35ms 
6978-1213/uk.co.placona.realmnotes D/Picasso: Dispatcher  enqueued     [R44]+22ms 
6978-1230/uk.co.placona.realmnotes D/Picasso: Hunter      executing    [R44]+37ms 
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R45] Request{https://unsplash.it/50/50?random&2}
6978-1213/uk.co.placona.realmnotes D/Picasso: Dispatcher  enqueued     [R45]+0ms 
6978-1252/uk.co.placona.realmnotes D/Picasso: Hunter      executing    [R45]+2ms 
6978-6978/uk.co.placona.realmnotes D/Picasso: Main        created      [R46] Request{https://unsplash.it/50/50?random&3}
6978-1213/uk.co.placona.realmnotes D/Picasso: Dispatcher  enqueued     [R46]+1ms 
6978-1225/uk.co.placona.realmnotes D/Picasso: Hunter      decoded      [R43]+669ms 
6978-1225/uk.co.placona.realmnotes D/Picasso: Hunter      executing    [R46]+477ms
```

Each one of my URLs now started a request that was _created_, _enqueued_ and _executed_. And sure enough, now each one of the items on my RecyclerView has a different image for its icon.

### But there is a better way. Right?

I found a few threads like [this one](https://github.com/square/picasso/issues/438) indicating that a combination of the [invalidate()](https://square.github.io/picasso/2.x/picasso/com/squareup/picasso/Picasso.html#invalidate-java.lang.String-) method,  [MemoryPolicy](https://square.github.io/picasso/2.x/picasso/com/squareup/picasso/MemoryPolicy.html) and [NetworkPolicy](https://square.github.io/picasso/2.x/picasso/com/squareup/picasso/NetworkPolicy.html) should get this to work. So something like this should do the trick right?

```java
Picasso.with(mContext).invalidate(file);
Picasso.with(mContext)
                    .load(ICON_URL)
                    .memoryPolicy(MemoryPolicy.NO_CACHE, MemoryPolicy.NO_STORE)
                    .networkPolicy(NetworkPolicy.NO_CACHE, NetworkPolicy.NO_STORE)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.error)
                    .into(viewHolder.mIcon);
```                    

Nope! Doing so presented the same behaviour as before, where only one item is ever enqueued.

So for the time being, I will stick to the solution where I add a query parameter to each one of the images to make sure I always get random results on the same URL.

### Know the solution?

I would love to hear from you what the correct/less hacky solution you found to this problem. Drop a comment bellow if you know how to make this work without having to fiddle with the URL.
