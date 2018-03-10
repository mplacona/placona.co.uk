---
id: 1109
title: What breaks WP Super Cache
date: 2012-08-29T08:09:52+00:00
dsq_thread_id:
  - "5437267041"
categories:
  - Technology
tags:
  - General Techie Stuff
---
> **Disclaimer:** This blog post is not meant to be timeless, meaning it will lose its relevancy as soon as the stuff I'll mention below gets updated. I will do my best to keep up with the updates, and delete this blog post as soon as it becomes irrelevant.

I've recently noticed my WordPress blog (latest version) caching functionality was broken due to the error:

> **The pages do not match! Timestamps differ or were not found!**

This would make my blog not cache at all.

I then started on a "Google mission" to see if I could find reasons to why this was happening. As far as I could see many people were having this same error and it seemed to have started inexplicably.

I found some people were reporting that the error started to happen after they'd installed JavaScript minifying plugins.

I do have one of those plugins, but after disabling it, my cache still wasn't working. However, this convinced me the problem could be related to some other plugin I had installed.

I decided to go on and disable every single plugin in my blog, except for WP Super Cache. I then confirmed this was the problem, as my caching started to work again.

There were 20 plugins installed, and I decided to activate all the ones that's were less likely to cause a conflict; such as administrative tools, email management and form processing.

That left me with about 10 plugins to investigate.

I started to enable one by one, and found that what was causing my cache to fail, was an advertising plugin I had, that I used to display textlinkads.

More precisely, <a title="TextLinkAds" href="wordpress.org/extend/plugins/text-link-ads/" target="_blank">TextLinkAds</a> on versions 3.9.7 and 3.9.8. It was then easy to find <a title="TextLinkAds breaks WP super cache" href="http://wordpress.org/support/topic/text-link-ads-plugin-stops-wp-super-cache-form-caching" target="_blank">a post</a> reporting this exact same problem. The only way around it is disabling the plugin. In my case, it was a no-brainer choice between giving my blog a massive performance boost, or making a few bucks showing sponsored ads, but I guess you'll have to make a call on that yourself.

Like I said, I presume the authors of TextLinkAds will fix this incompatibility soon, and I'll remove this blog post as soon as they do so. In the meantime, I think it's worth having it here so other people can benefit from it.
