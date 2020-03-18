---
layout: post
title: 'Modern Android Development: The problem of sources'
date: 2020-03-15T16:30:42+00:00
categories:
  - Android
tags:
  - modern android development
  - android
excerpt: "Below is my series proposal for fixing the problem of too many sources of information and advocating modern Android Development one gist at a time."
comments: true
share: true
image: images/2020/03/modern-android-development-header.png
---

I often find myself answering StackOverflow questions I'm sure to have answered differently before. I also often find myself reading answers that I'm sure I've read differently before.

Let's look at an example [here](https://stackoverflow.com/questions/6343166/how-to-fix-android-os-networkonmainthreadexception). If you've written a single line of Android code over the past decade you're sure to have encountered this at some point.

<img class="alignnone size-full" src="/images/2020/03/sources-00.png" alt="StackOverflow answer with multiple sources of truth" />

Now the problem here is not the fact that this question is **eight years old** and has over **80 different answers** to it. The problem is that right now, the answer is not even correct anymore since [AsyncTasks have been deprecated in Android](https://android-review.googlesource.com/c/platform/frameworks/base/+/1156409/6/core/java/android/os/AsyncTask.java).

When you scroll into the other answers, the one that is just remotely correct at the time of writing is way further from what I describe as TAIC - `The Answer I Copy`.

## My Proposal

Even if I asked every one of you to upvote what the correct answer on that question is (providing we could all agree on that 🙈), we would only be postponing the problem because that answer is also likely to become obsolete.

So my proposal is very simple: Together, we can help fix this problem by writing punchy blog posts that fix the issue and through [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) outrank the wrong sources of answers.

## My Pledge

I will make sure to keep this content up to date and provide this space as a platform for anyone to contribute. [This blog is Open Source](https://github.com/mplacona/placona.co.uk) after all. If I see enough traction on this, I will turn it into its own project.

An alternative is that you can roll your own content on places like [dev.to](https://dev.to/) for example. They're free and very friendly.

## The Content

I can't possibly tell you how many posts this series will have, but the intention is to exhaust [this StackOverflow query](https://stackoverflow.com/questions/tagged/android?tab=Frequent). These are the most frequently active questions in the Android tag.

This is where new Android developers are getting stuck right now, and back to the original problem, they have no way of discerning a good from a bad answer other than the number of votes and whether that is the answer the original author chose as the answer that solved their problem at the time.

## Want to help?

Ping me on Twitter [@marcos_placona](https://twitter.com/marcos_placona), [send me a PR](https://github.com/mplacona/placona.co.uk) or just write your own content and prefix your title with `Modern Android Development:`.
