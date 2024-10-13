---
layout: post
title: 'Boost Your Website Domain Rating with Redirects and Bot Control'
date: 2024-10-13T20:54:42+00:00
categories:
  - Technology
tags:
  - cloudflare
  - SEO
excerpt: "Learn how to boost your website's Domain Rating (DR) with Cloudflare Workers by setting up 301 redirects and controlling Googlebot for better SEO performance."
comments: false
share: true
image: images/2024/10/boost-website-domain-rating.jpeg
---

## How to Boost Your Website's Domain Rating with Redirects and Bot Control

When you’re managing multiple domains, especially if you’re working on SEO for projects like I am, it’s important to take full advantage of the traffic your domains generate. After seeing [Oliver Fish's post](https://x.com/_Oliver_Fish/status/1844947412697190459){:target="_blank"} on how to make links from your directory/website look more valuable? I decided to give this a go and see how I could increase the DR for [MicroWidgets](https://MicroWidgets.dev){:target="_blank"} like that.

<img class="alignnone size-full" src="/images/2024/10/oliver-fish-post.png" alt="Oliver Fish talking about how to increase website DR" />

I love using **Cloudflare Workers** for everythign I can, and this seemed like the perfect opportunity. Let’s break down why this approach works, and how it  benefits my SEO strategy.

### What’s the Goal?

In my case, I have a domain, `postbits.net`, that I want to redirect to my another project, `microwidgets.dev`. Instead of just setting up a simple redirect, I’ve chosen to add a little intelligence into the mix by using a Cloudflare Worker. Specifically, I’m blocking Googlebots from crawling `postbits.net` and ensuring that all other traffic is cleanly redirected to `microwidgets.dev` with a 301 status code.

### Why Block Googlebot?

You might be wondering: why would you block Googlebot in the first place? After all, isn’t SEO all about getting Google to crawl your site?

True—but it’s also about **controlling** what Google indexes. I want Google to focus on my main project, `microwidgets.dev`, not the legacy, less important or in this case slightly polluted domain. By blocking Googlebot from the redirecting domain, I’m essentially telling Google to concentrate its efforts on my primary website and not on the other domain.

### The Power of 301 Redirects

A 301 redirect tells search engines that the domain or page has permanently moved. It’s one of the most effective ways to pass SEO value from one domain to another. By using a 301 redirect from `postbits.net` to `microwidgets.dev`, I’m transferring any link equity or authority that `postbits.net` has accumulated over time directly to `microwidgets.dev`.

The key here is **link consolidation**. Even if `postbits.net` has a few backlinks, I don’t want those to go to waste. With a well-placed 301 redirect, those backlinks now contribute to the SEO strength of `microwidgets.dev`, improving its Domain Rating.

### How Cloudflare Workers Make It Easy

Cloudflare Workers allow you to run lightweight JavaScript code directly on Cloudflare’s edge network. This is perfect for handling requests before they hit your server, meaning you can create efficient rules for bots and redirects without messing with your backend infrastructure.

Here’s a quick rundown of what I did:

1. **Block Googlebot** – Any request from Googlebot to `postbits.net` gets a 403 (Forbidden) response. This prevents Google from crawling and potentially indexing the redirecting domain.
   
2. **Redirect All Other Traffic** – Any other traffic is redirected to `https://microwidgets.dev` with a 301 status. This includes both users and non-Google bots.

With this setup, I’m ensuring that any SEO value associated with `postbits.net` is passed directly to my main site, while keeping Google’s focus sharp on `microwidgets.dev`.

### The Benefits for Your SEO

By redirecting one domain to another while controlling Googlebot, you get a few benefits that can directly contribute to boosting your Domain Rating (DR):

1. **Link Equity Transfer**: Any backlinks to `postbits.net` will now benefit `microwidgets.dev`, consolidating your SEO power.
   
2. **Improved Crawl Efficiency**: Blocking Googlebot from irrelevant domains helps optimize your crawl budget. Google will spend more time on your important pages, improving indexing and potentially your rankings.
   
3. **Focus on One Domain**: By directing all traffic to a single site, you reduce fragmentation. This means all SEO signals (backlinks, traffic, etc.) are focused on `microwidgets.dev`, which in turn can improve your DR over time.

### How I did it

Here’s exactly how I set up my Cloudflare Worker and configured the DNS for the `postbits.net` domain to redirect traffic to `microwidgets.dev` while blocking Googlebot. You can follow these steps to implement it on your own domains.

#### 1. Add Your Domain to Cloudflare

First, if you haven't already, add the domain you want to redirect, in my case `postbits.net`, replace that with whatever domain you bought:

- Log in to your Cloudflare account.
- Navigate to **Add a Site** in the dashboard.
- Enter `postbits.net` and choose a plan (the free plan works fine for this setup).
- Cloudflare will provide two nameservers. Go to your domain registrar (where you purchased `postbits.net`), and update the DNS settings by replacing the current nameservers with the ones provided by Cloudflare.

Once this is done, Cloudflare will manage your DNS, and you can proceed with the rest of the setup.

#### 2. Configure DNS for the Domain

Next, set up DNS records for `postbits.net` within Cloudflare. This is essential to ensure all traffic is routed through Cloudflare so that the Worker can intercept and process requests.

- In the Cloudflare dashboard, go to the **DNS** section.
- Add two **A records**:
  1. **A Record (root)**:
     - Name: `@`
     - Content: Use the IP `192.0.2.1` (this is a placeholder; Cloudflare handles the actual routing).
     - Proxy Status: Enabled (orange cloud).
  2. **A Record (www)**:
     - Name: `www`
     - Content: Same placeholder IP `192.0.2.1`.
     - Proxy Status: Enabled (orange cloud).

These settings ensure that both `postbits.net` and `www.postbits.net` are properly routed through Cloudflare’s network.

#### 3. Create and Deploy the Cloudflare Worker

Now, let’s set up the Worker that will handle the redirect and block Googlebot. Follow these steps:

-  In your Cloudflare dashboard, go to **Workers** > **Create a Service**.
-  Name your Worker (e.g., `postbits-redirect`).
-  Replace the default code with the following:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const userAgent = request.headers.get('User-Agent') || '';

  // Block Googlebot traffic with a 403 response
  if (userAgent.toLowerCase().includes('googlebot')) {
    return new Response('Forbidden', { status: 403 });
  }

  // Redirect all other traffic to https://microwidgets.dev with a 301 status
  return Response.redirect('https://microwidgets.dev', 301);
}
```

-  **Deploy** the Worker by clicking the "Deploy" button.

#### 4. Set Up Routes for the Worker

Now, you need to set up a route so that the Worker runs for all traffic to `postbits.net`.

1. In the Cloudflare dashboard, go to **Workers** > **Routes**.
2. Add a route for the domain `postbits.net/*` and `www.postbits.net/*`.
3. Select the Worker you just created (`postbits-redirect`).

This ensures that any requests to `postbits.net` or `www.postbits.net` will trigger the Worker, allowing it to perform the redirect and block Googlebot.

#### 5. Check SSL Settings

For the redirect to work smoothly over HTTPS, ensure that **SSL/TLS** is properly configured in Cloudflare.

- Go to the **SSL/TLS** tab in Cloudflare and set the mode to **Full** or **Full (Strict)**. This ensures secure traffic handling between Cloudflare and your origin server, even if you’re just redirecting.

### Final Thoughts

Setting up smart redirects with Cloudflare Workers might seem like a small tweak, but it can have a significant impact on your SEO strategy. By blocking bots and redirecting traffic correctly, you ensure that your primary site gets all the SEO value, while avoiding potential penalties or wasted crawl budget on irrelevant domains.

It’s all about maximizing the resources you already have and making sure your efforts are targeted. So if you’re looking to boost your Domain Rating, it’s worth taking the time to set up a similar approach.