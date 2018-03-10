---
id: 1467
layout: post
title: Sending and Receiving SMS messages with Dart
date: 2014-07-04T11:12:32+00:00
dsq_thread_id:
  - "5434820749"
excerpt: "I wanted to be able to send SMS messages with Dart, and because it doesn't actually support it natively (not that I would expect it to anyway), I decided to write a library that allows me to do just that."
categories:
  - Dart
tags:
  - Open Source
---
<img class="aligncenter size-full wp-image-1468" src="http://www.placona.co.uk/wp-content/uploads/2014/07/dart_sms.png" alt="Dart - SMS example" width="695" height="170" srcset="https://www.placona.co.uk/wp-content/uploads/2014/07/dart_sms.png 695w, https://www.placona.co.uk/wp-content/uploads/2014/07/dart_sms-300x73.png 300w, https://www.placona.co.uk/wp-content/uploads/2014/07/dart_sms-676x165.png 676w" sizes="(max-width: 695px) 100vw, 695px" />

I wanted to be able to send SMS messages with Dart, and because it doesn't actually support it natively (not that I would expect it to anyway), I decided to write a library that allows me to do just that.

The library itself is a wrapper to the [Twilio API](https://www.twilio.com/docs/api/rest "Twilio API"), which is a wicked service that allows you to not only send or receive SMS/MMS messages, but also lets you make phone calls, start conference calls etc, all through their API. This offers immense scope to build applications on top of, since you could build an entire telecommunications central on top of their infrastructure without having to invest largely on buying and maintaining your own kit.

The principle is that all you should need to do before you can get coding, is <a title="Create a Twilio account" href="https://www.twilio.com/" target="_blank">crate a Twilio account</a>, and make a note of the account ID and the token it will provide you with. After that, you can get coding.

### <span style="text-decoration: underline;">Intro</span>

In a Dart application, you can do the following to get the library installed:

  1. Add a dependency to `twilio_dart` to your pubspec.yaml
  2. Run `pub get`

With the library now installed on your application, you can start using it as such:

```java
import 'package:twilio_dart/twilio.dart';

var key = "your_twilio_key";
var authToken = "your_auth_token";
var version = "2010-04-01";
Twilio twilio = new Twilio(key, authToken, version);
```

This gives you a Twilio object, and you can use that to call the methods in the API. Make sure you replace `key` and `authToken` with the appropriate values provided upon registration with Twilio. You can also find them on <a title="Twilio account dashboard" href="https://www.twilio.com/user/account" target="_blank">your dashboard</a>.

Everything being OK so far, you should now be able to actually send an SMS message using the number Twilio gave you when you created your account. You can also find this on your Twilio account under <a title="Twilio numbers" href="https://www.twilio.com/user/account/phone-numbers/incoming" target="_blank">the numbers section</a>.

### <span style="text-decoration: underline;">Sending</span>

An SMS message is composed of three main parts:

  1. A **from number** - this should be the number Twilio provided you.
  2. A **to number** - this can be any number capable of receiving text messages (i.e. your mobile number).
  3. A **message** - This is the text message you want to send.

```java
var from = "your_twilio_phone";
var to = "your_mobile_number";
var body = "Look ma! Dart can now send SMS's in under 15 lines";
```

All there is to do now is actually try and send this message. To do so, we will use the s`endSMS` method. The signature for it is as follows:

```java
Future sendSMS(String from, String to, String body, [String mediaUrl = null])
```

So straight away we know this method will return a <a title="Dart - Futures" href="https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/dart:async.Future" target="_blank">Future</a>, and that it takes a `from`, a `to`, a `body`, and optionally the URL for an image, which will then turn your message into an <abbr title='Multimedia Messaging Service' rel='tooltip'>MMS</abbr> by attaching that media directly to your message.

Therefore our code should look like the following when completed:

```java
import 'package:twilio_dart/twilio.dart';
main() {
    var key = "your_twilio_key";
    var authToken = "your_auth_token";
    var version = "2010-04-01";
    var from = "your_twilio_phone";
    var to = "your_mobile_number";
    var body = "Look ma! Dart can now send SMS's in under 15 lines";
    //
    //create a new twilio object
    Twilio twilio = new Twilio(key, authToken, version);
    //
    // Send SMS for LOLZ
    twilio.sendSMS(from, to, body).then((response) => print("Your message has been sent!")).catchError((error) => print(error.toString()));
}
```

Which even with all the line breaks and comments, still is just 15 lines.

If you execute this code, you will be able to verify two things:

  * you've now got a new message on the phone you've chosen
  * under your Twilio account, you will also be able to read this message if you <a title="Twilio - View logs" href="https://www.twilio.com/user/account/log/messages" target="_blank">view the logs</a>.

### <span style="text-decoration: underline;">Listing</span>

I bet you're somehow impressed by now as to how little you actually had to code to get our little application to send an SMS message. But we need a way to be able to retrieve those messages from the server without having to have a device in our hands all the time. the next thing we're going to do, is come up with a way to list our messages. We can do that by using the method `readSMSList`, which does exactly what it says in the tin, it will give you a list of all the SMS messages in an account.

```java
twilio.readSMSList().then((response){
  JSON.decode(response)['messages'].forEach((e) => print(e));
}).catchError((error) => print(error.toString()));
```

### <span style="text-decoration: underline;">Reading</span>

Very simple and very neat. Get a JSON packet back, and iterate through the results. Each of the messages has a `sid`, which is the ID for this message, so the next thing we need to do, is to be able to drill down to each of the messages from a list of messages.

To do so, we will use the method `readSMS`, which takes a message id as a parameter, and returns its full contents.

```java
twilio.readSMS(sId).then((response) => print(response.toString())).catchError((error) => print(error.toString()));
```

And the above will give you all the information pertaining a single message.

### <span style="text-decoration: underline;">Wrap up...</span>

So in this article, we've gone through the following:

  * how to send an SMS message with Dart through the Twilio API by using the method sendSMS.
  * how to read a list of received messages from the server by using the method readSMSList.
  * how to read the contents of a single message by using the method readSMS.

The source code to the library can be found on my <a title="Twilio-Dart" href="https://github.com/mplacona/twilio-dart" target="_blank">GitHub account</a> along with samples and documentation.
