---
id: 1535
layout: post
title: How to secure Apache with Let's Encrypt and CloudFlare on Centos
date: 2016-03-28T17:16:36+00:00
dsq_thread_id:
  - "5434820759"
image: /wp-content/uploads/2016/03/secure2.jpg
categories:
  - Technology
tags:
  - centos
  - cloudflare
  - Failed authorization procedure
  - letsencrypt
  - security
  - ssl
  - tls
  - wordpress
  - VPS
  - Website Optimization
  - General Techie Stuff
---
I took it upon myself to converting a couple of my domains to use [Let's Encrypt](https://letsencrypt.org/) in order to offer a secure connection to them. If you haven't heard about Let's Encrypt by now you' have probably been living under a rock. If that's the case though, have a read at [this page](https://letsencrypt.org/how-it-works/) and you'll get up to speed with it.

Their [getting started page](https://letsencrypt.org/getting-started/) describes the entire process of installation, but that didn't really resonate with me. Upon some googling I found a great [Digital Ocean article](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-centos-7) which made a lot more sense to me. That is an absolutely fine tutorial if you're not using [CloudFlare](https://www.cloudflare.com). If you came to this article from a Google search though, chances are you're also using CloudFlare and are having issues like some of the following:

  * _Failed authorization procedure_
  * _The following 'urn:acme:error:unauthorized' errors were reported by the server_
  * _urn:acme:error:unauthorized :: The client lacks sufficient authorization ::_

Hopefully this article will show you how to get that nice green padlock showing on your website. Props to the [article on Cloudflare's support page](https://support.cloudflare.com/hc/en-us/articles/214820528-How-to-Validate-a-Let-s-Encrypt-Certificate-on-a-Site-Already-Active-on-CloudFlare) that took me halfway the process.

### Install the dependencies

I usually SSH to my server to get these things done, but this step may vary if you access your server differently.

On your terminal start by installing EPEL (Extra Packages for Enterprise Linux) repository:

```bash
sudo yum install epel-release
```

Then install GIT. We will use it to get the latest version of the Let's Encrypt Client.

```bash
sudo yum install git
```

### Download and install Let's Encrypt Client

Start off by cloning the repository and then saving it to _/opt/letsencrypt_. Feel free to save it elsewhere but _/opt_ is a good location for third party packages.

```bash
sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
```

### Generate a new SSL certificate

```bash
cd /opt/letsencrypt
```

This is where we go differently from the Digital Ocean article as we will generate our SSL certificate using the webroot option.

```bash
sudo /root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /var/www/placona.co.uk --renew-by-default --email my_email.com --text --agree-tos -d placona.co.uk -d www.placona.co.uk
```

We've used the following flags for this setup.

  * `-webroot-path` is the directory on your server where your site is located. This is not your webserver's root directory but your website's
  * `-renew-by-default` selects renewal by default when domains are a superset of a previously attained cert
  * `-email` is the email used for registration and recovery contact.
  * `-text` displays text output
  * `-agree-tos` agrees to Let’s Encrypt’s Subscriber Agreement
  * `-d` specifies hostnames to add to the SAN. You can specify as many domains and subdomains as you need here as shown above

After you run that you should get a message saying your certificate chain has been saved.

<div id="attachment_1537" style="width: 697px" class="wp-caption aligncenter">
  <img class="wp-image-1537 size-full" src="/images/2016/03/letsencrypt.png" alt="letsencrypt" width="687" height="354" srcset="/images/2016/03/letsencrypt.png 687w, images/2016/03/letsencrypt-300x155.png 300w, images/2016/03/letsencrypt-676x348.png 676w" sizes="(max-width: 687px) 100vw, 687px" />
  
  <p class="wp-caption-text">
    Apparently I also need to read about upgrading Python on Centos without breaking everything
  </p>
</div>

### Setting up the SSL certificate with Apache

With your certificate created it's time to tell Apache that you want it to use that. On terminal run:

```bash
sudo ./letsencrypt-auto --apache -d placona.co.uk -d www.placona.co.uk
```

And you should get a screen that looks like this:

<img class="aligncenter size-full wp-image-1538" src="/images/2016/03/letsencrypt2.png" alt="letsencrypt2" width="574" height="293" srcset="/images/2016/03/letsencrypt2.png 574w, images/2016/03/letsencrypt2-300x153.png 300w" sizes="(max-width: 574px) 100vw, 574px" />

Apache still doesn't know about this new certificate but we're about to change that by selecting option 1 and on the subsequent screen choosing whether we want to make HTTP required or optional. I chose _Secure_ here as I want all of my requests to be redirected to HTTPS.

You should then end up with a confirmation screen that tells you to check that your certificates are correctly installed. This procedure will have modified your httpd.conf file to add redirects so all requests that are non HTTPS are now redirected to be HTTPS.

<img class="aligncenter size-full wp-image-1539" src="/images/2016/03/letsencrypt3.png" alt="letsencrypt3" width="665" height="269" srcset="/images/2016/03/letsencrypt3.png 665w, images/2016/03/letsencrypt3-300x121.png 300w" sizes="(max-width: 665px) 100vw, 665px" />

Go ahead and hit those URL's and you should see that they both get a grade A pass.

<img class="aligncenter size-full wp-image-1540" src="/images/2016/03/letsencrypt4.png" alt="letsencrypt4" width="1097" height="514" srcset="/images/2016/03/letsencrypt4.png 1097w, images/2016/03/letsencrypt4-300x141.png 300w, images/2016/03/letsencrypt4-768x360.png 768w, images/2016/03/letsencrypt4-1024x480.png 1024w, images/2016/03/letsencrypt4-676x317.png 676w" sizes="(max-width: 1097px) 100vw, 1097px" />

### Updating Cloudflare

We need to tell CloudFlare that we now have an SSL certificate and want the communication to our website to use it. On CloudFlare's dashboard for your chosen website choose _Crypto_ and under _SSL_ choose _Full (Strict)_. You will probably want to use _Flexible_ here if during the previous step you chose HTTPS to be optional.

<img class="aligncenter size-full wp-image-1541" src="/images/2016/03/letsencrypt5.png" alt="letsencrypt5" width="973" height="495" srcset="/images/2016/03/letsencrypt5.png 973w, images/2016/03/letsencrypt5-300x153.png 300w, images/2016/03/letsencrypt5-768x391.png 768w, images/2016/03/letsencrypt5-676x344.png 676w" sizes="(max-width: 973px) 100vw, 973px" />

At this point you should be done and your website should be showing a nice green padlock on the URL bar.

### Unless...

You're using WordPress. In this case you will also want to update it so the URL is always HTTPS. You can do that by going into WordPress Admin, and then navigating to Settings > General.

<img class="aligncenter size-full wp-image-1542" src="/images/2016/03/letsencrypt6.png" alt="letsencrypt6" width="957" height="327" srcset="/images/2016/03/letsencrypt6.png 957w, images/2016/03/letsencrypt6-300x103.png 300w, images/2016/03/letsencrypt6-768x262.png 768w, images/2016/03/letsencrypt6-676x231.png 676w" sizes="(max-width: 957px) 100vw, 957px" />

And that will make sure every image and every URL on your WordPress site is served via HTTPS.
