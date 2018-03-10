---
id: 132
title: Full Google Mail / SMTP power for your domain
date: 2009-05-07T00:00:00+00:00
categories:
  - Technology
---
I've recently been playing with Google apps for domains, where it lets you create Gmail based emails for your domain. Basically you can configure Google apps to manage your domain's email therefore saving a few things. The first few that spring to mind are:

  * the effort to configure a mail server properly;
  * the money you will save, for such a great engine;
  * all the bandwidth (believe me, this this thing is expensive);
  * space on your server;
  * memory and processing;

I could probably mention some other things, but in my opinion those above are the most critical.

Well, I'm not getting any commission, so I better get started with this "how to".

<span style="color: #ff0000;"><span style="text-decoration: underline;">First things first. Create an account for your domain:</span></span>

Go to <a style="text-decoration: underline;" href="https://www.google.com/a/cpanel/domain/new" target="_blank">this link</a> and follow the whole process.

It's a bit boring I know, but hey! It's all worth it at the end.

It will then ask you for some confirmation. Either you have to upload a file to the root of your webserver, or change an MX Record. It will then go to your
  
server and check if you did what it asked you to. Once it's confirmed, you're ready to go.

You can now create your users, but be aware that you're domain is still not fully hooked to gmail, as you need to "tell" it to use Google's service.

Easiest way to do that, is by going to your DNS Manager and creating a few records. In my case I simply go to my Slice Manager on <a style="text-decoration: underline;" href="https://manage.slicehost.com/customers/new?referrer=364963b4bf874397d68118e4a711817a" target="_blank" class="broken_link">Slicehost</a> and click **DNS**, then select my domain, and click **records**. I then create 7 new MX records as follows:

<img style="display: block; text-align: center; margin-left: 10px; margin-right: 10px;" src="http://img378.imageshack.us/img378/7128/slicehost1241617158522.png" alt="SliceHost MX Records - Google" width="451" height="131" />
  
 
  
After having created all this records, you're almost ready to go. It takes a few hours for everything to propagate, and Google to recognize all your newly created records; but once it's done, you can start sending and receiving emails.

<span style="text-decoration: underline;"><span style="color: #ff0000;">Now for phase two:</span></span>

We have be able to use it for sending emails from your server, so you'd be able to use something like: **smtp.gmail.com** 

The way to go is create an account responsible for sending emails, and every single email will be sent from this account. Obviously you can skip this step if you would like to have proper clients using this service.

In my case, I only need to send emails from forms and stuff like that, so I created an account specifically for this task.

If you were configuring this on your server, you would do it like this for ColdFusion Server:

<img style="display: block; text-align: center; margin-left: 10px; margin-right: 10px;" src="http://img5.imageshack.us/img5/2543/coldfusionadministrator.png" alt="SMTP - ColdFusion Server configuration" width="451" height="131" />

Notice I'm using port 587, as it's the required port for Gmail. You would also need to have a few extra things on your <cfmail> tag, as it requires authentication.

An example would be:

```&amp;lt;cfmail
	from = &amp;quot;e-mail address&amp;quot;
	to = &amp;quot;comma-delimited list&amp;quot;
	subject = &amp;quot;string&amp;quot;
	username = &amp;quot;username@yourdomain.com&amp;quot;
	password = &amp;quot;string&amp;quot;
	useTLS = &amp;quot;yes&amp;quot;&amp;gt;
```

Notice the last three lines on the code. They are the responsible for the authentication. Sadly Google requires <a style="text-decoration:underline;" href="http://en.wikipedia.org/wiki/Secure_Sockets_Layer" target="_blank">TLS Authentication</a> and only ColdFusion 8 (or upwards) and Railo (not sure about BlueDragon)
  
can handle that.

On Railo though, it's a much easier configuration, as you only need to configure your webserver's context with your details, and use CFMAIL as you would normally, straight out of the box.

An example of configuration would be:

<img style="display: block; text-align: center; margin-left: 10px; margin-right: 10px;" src="http://img11.imageshack.us/img11/3868/railowebadministrator12.png" alt="Railo - SMTP COnfiguration" width="451" height="131" />

Notice I specify port 587, and tick TLS to be used. It took me a while to get this configuration right, and I'd like to thank <a style="text-decoration:underline;" href="http://www.andyjarrett.com/blog/" target="_blank">Andy Jarrett</a> for helping me with it.

You should now be all set, and have your email configured. The free version only allows you to have up to 50 emails, but you can always buy the pro version
  
if you think it's not enough.

You can now create a new record on your DNS Manager in order to have mail.yourdomain.com, so you don't need to use Gmail's big URL in order to access your webmail. This is how I did it:

<img style="margin-left: 10px; margin-right: 10px;" src="http://img2.imageshack.us/img2/4603/slicehostcname124162434.png" alt="DNS - MAIL" width="442" height="17" />

Notice I point it to ghs.google.com, and call it mail, so I can access mail.mydomain.com. 

And that should be all you need to have a fully functional email for your domain. 

I hope you enjoyed it, and let me know if you have any problems with it.
