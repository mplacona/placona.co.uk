---
layout: post
title: 'Modern Android Development: android.os.NetworkOnMainThreadException'
date: 2020-03-15T16:38:42+00:00
categories:
  - Android
tags:
  - modern android development
  - android
excerpt: "How to deal with android.os.NetworkOnMainThreadException in modern Android applications"
comments: true
share: true
image: images/2020/03/modern-android-android-os-networkonmainthreadexception-header.png
---

> This blog post is a part of a series that aims to fix the issue with too much inaccurate information out on the internet. It will focus on modern Android development. You can read more about the problem [here]({% post_url 2020/2020-03-15-modern-android-development %}).

Over the [last blog post]({% post_url 2020/2020-03-15-modern-android-development %}), I used an example of a StackOverflow question with over 80 answers where the answer marked as correct and with the most votes is no longer accurate.

A commit made to Android's source code deprecated [AsyncTasks](https://developer.android.com/reference/android/os/AsyncTask) going forward from API level R. Which means you can still use it, but it will soon disappear in favour of `java.util.concurrent` or [Kotlin Coroutines](https://developer.android.com/topic/libraries/architecture/coroutines).

## The Problem

When your application tries to perform a networking operation on the main thread, an exception is thrown. This exception is only thrown for applications targeting the Honeycomb SDK or higher, so pretty much any current application will have that restriction.

This is good because it stops your application from getting sluggish on the main thread, which is the one the user sees. Instead, you're supposed to make that request on a separate thread as follows:

```java
val url = URL("https://pokeapi.co/api/v2/pokemon/ditto/")

Thread(Runnable {
    with(url.openConnection() as HttpURLConnection){
        val allText = inputStream.bufferedReader().use(BufferedReader::readText)
        Log.d("threadRequest", allText)
    }
}).start()
```

## The suggested solution

If you look at the [AsyncTask Documentation](https://developer.android.com/reference/android/os/AsyncTask) you will see it suggests using `java.util.concurrent`, so if you're working with Java here's how you can implement the same thing.

### In Java

```java
MyTaskExecutor taskExecutor = new MyTaskExecutor();
taskExecutor.execute(new Runnable() {
    @Override
    public void run() {
        HttpURLConnection urlConnection = null; String result = null; InputStream in;
        try {
            urlConnection = (HttpURLConnection) url.openConnection();
            in = new BufferedInputStream(urlConnection.getInputStream());
            result = readStream(in);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            urlConnection.disconnect();
        }
        System.out.println(result);
    }
});
```

The other suggestion found in the [AsyncTask Documentation](https://developer.android.com/reference/android/os/AsyncTask) is to use Kotlin concurrency utilities. Here's an example of how to do that for the HTTP request above.

## In Kotlin

```java
GlobalScope.launch(Main) { // launch coroutine in the main thread
    suspend fun coroutineRequest(url: URL) =
        withContext(IO) { // runs at I/O level and frees the Main thread
            with(url.openConnection() as HttpURLConnection) {
                val allText = inputStream.bufferedReader().use(BufferedReader::readText)
                Log.d("coroutineRequest", allText)
            }
        }
}
```

The code above will launch a new coroutine on the main thread but run the HTTP request at I/O level. This is blocking code at I/O level, but no at the UI level. There's a good blog post explaining when to use which [here](https://medium.com/@vcanato/withcontext-async-or-launch-inside-coroutine-kotlin-17c332854a08).

> You can find all the code shown here on this repository. Make sure you also check the build.gradle file if you're using coroutines as it requires a couple of extra dependencies.
