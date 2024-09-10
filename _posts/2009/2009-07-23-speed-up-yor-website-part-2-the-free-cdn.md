---
id: 159
title: Speed up yor website - Part 2 - The Free CDN
date: 2009-07-23T00:00:00+00:00
categories:
  - Technology
tags:
  - General Techie Stuff
  - VPS
  - Website Optimization
---
To continue with our series of website optimization tricks, I'll talk a little bit more about <a title="Content Delivery Network" href="http://en.wikipedia.org/wiki/Content_delivery_network" target="_blank">Content Delivery Network (CDN)</a>, and will talk you though the steps of creating a totally **free** CDN for your website.
  
Basically, as I've already stated on my <a title="Speed up your website - Part 1" href="https://www.placona.co.uk-techie-stuff/speed-up-yor-website-part-1/" target="_self">previous post</a>, a CDN is an external network which specializes in serving static content. It normally consists of a few servers spread around the world, so the data will travel the shortest route to get to their destination based on <a title="Wikipedia - Geolocation" href="http://en.wikipedia.org/wiki/Geolocation" target="_blank">Geolocation</a>.
  
In other words, if you're in Japan, why should you have to wait for the data to travel from Europe, if there's a server just next door to you.

![CDN With multiple=](http://files.placona.co.uk/cdn/mockup3.png)

What you can see from the image, is that you have all of your servers in a "<a title="Wikipedia - Cloud Computing" href="http://en.wikipedia.org/wiki/Cloud_computing" target="_blank">Cloud of Computers</a>", and the requests are mapped to the nearest one. In some cases you have more than one server per country or region. The beauty of it, is that applications deployed on the cloud are highly <a title="Wikipedia - Scalability" href="http://en.wikipedia.org/wiki/Scalability" target="_blank">scalable</a>, and you normally don't need to manage the servers, as they are managed by the provider.
  
There are <a title="Amazon S3" href="http://aws.amazon.com/s3/" target="_blank">some</a> <a title="Edgecast CDN" href="http://www.edgecast.com/services/content-delivery/" target="_blank">companies</a> offering CDN for a very reasonable price, but today we're gonna be talking about **free stuff**!
  
Before I start with this tutorial, I have to make it clear that the form of CDN we're going to be using here, is not truly CDN, as it doesn't offer a very high scalability, and hasn't been developed for the sole purpose of serving static files, so it won't have the same high performance of a service designated only for the task.
  
For some (like myself), it won't make such a huge difference, as this method still is better than nothing, and is immensely faster than much servers around. I host my applications on my own VPS and don't have bandwidth limitations. But for most people who use Hosting Companies and have limited bandwidth, this will be a huge improvement.

### <span style="text-decoration: underline;">Step one - The Idea:</span>

Google provides us with it's wonderful <a title="Google App Engine" href="https://developers.google.com/appengine/" target="_blank">Google App Engine</a>. It's free for anyone, you can store up to 500mb (enough for static content), and have about 5 million page views a month. Anything beyond it is charged (very tiny fee). Everybody knows Google, so you know they have servers almost everywhere. Put this all together, and you'll get started.
  
To make this idea start to happen, simply create an account with Google App Engine. Simply use your Google login details, and and confirm your application with the code Google sends to you visa SMS (you need to have a mobile phone).
  
Now, you will need to download and install Python (it's only required for the App Engine can run on your computer). I find Python 2.5 works better than Python 3, so you can get it from <a title="Python 2.5" href="http://www.python.org/download/releases/2.5.4/" target="_blank">here</a>.
  
It's time to install the <a title="App Engine Install" href="https://developers.google.com/appengine/downloads" target="_blank">App Engine Client</a> on your computer. Once it's installed, you should be ready to go.

<h3 style="font-size: 1.17em;">
  <span style="text-decoration: underline;">Step two - Create an Application:</span>
</h3>

Simply login to your newly created App Engine Account and click the button Create an Application

<img src="http://files.placona.co.uk/cdn/create_application_small.JPG" alt="App Engine - Create Application" width="447" height="242" />
  
Give it a name and title, and then save it. Use a short name, as it will be you application's handler, and you'll access it by going to [app_name].appspot.com

<h3 style="font-size: 1.17em;">
  <span style="text-decoration: underline;">Step three - Create your Application Folder:</span>
</h3>

If you are on a windows environment, normally the App Engine will be installed on "C:\Program Files\Google\google_appengine". If not, it will be installed wherever you chose during installation.

Go to this folder, and create a new folder with the same name as the application you have just created on step 2.

You will now copy your assets folder into this folder. I like to keep the same structure, so by only changing one variable on my website, I can change the the domain it uses to look for images.

So if for example my website was looking for images at http://images.domain.com/images, I'd just change this variable to point to [app_name].appspot.com/images

So, on my folder I'll have exactly the same structure as I had on my website plus a few files I'll describe now:
  
**app.yaml:** this is our application configuration including URL's and versions. More info <a title="App.yaml" href="https://developers.google.com/appengine/docs/python/config/appconfig" target="_blank">here</a>.

```bash
application: my-application
version: 1
runtime: python
api_version: 1
handlers:
- url: /images
static_dir: images
- url: /styles
static_dir: styles
```

Notice I'm specifying my static directories and their relative paths. You have to change it accordingly.

**deploy.bat:** This is a file I create for convenience. It executes command lines for me, so i don't have to type them all the time I want to deploy. The contents of this file will normally be:

```bash
"C:\Python25\python" "C:Program Files\Google\google_appengine\appcfg.py" update "C:Program Files\Google\google_appengine\[app_name]"
```

Notice that on the first part of, I'm simply telling my script what I use when it comes to running python scripts. I then **update** my application by its name, and giving the application folder.

So manually it would be something like:

```bash
python "C:Program Files\Google\google_appengine\appcfg.py" update "C:Program Files\Google\google_appengine\[app_name]"
```

<h3 style="font-size: 1.17em;">
  <span style="text-decoration: underline;">Step four - Deploying your Application:</span>
</h3>

Now it's the big time. Simply double click the file called deploy.bat and you should see a screen like this:
  
<img src="http://files.placona.co.uk/cdn/deploy_application_small.JPG" alt="Deploying to CDN" width="447" height="226" />

If it doesn't give you any warning or error message, you should be ready to access your file.

If you decide to delete this file, simply delete it from the folder, and deploy again, and the file will be deleted. You don't need to worry about minor versions, as the App Engine will deal with it for you.

To be honest, I never worry too much about the version numbers, as I'm constantly uploading stuff to my server. But if for some reason you do, you can simply change the "version" flag on you app.yaml file.

I hope this article is helpful. please don't hesitate asking me questions or sending suggesting on how to improve this article.
