---
id: 17
title: 'Tag of the day: CFIMAGE Captcha (part 2)'
date: 2006-11-29T00:00:00+00:00
categories:
  - Tag of the day
---
As this tag does a whole bunch of things, I decided to show one more usage example.
  
Today I'm gonna show some captcha:

```
<cfimage action="captcha" fontSize="18" width="150" height="75" text="placona" difficulty="low">
```

Which will display something like this:
  
<img src="http://files.placona.co.uk/cfimage/captcha_1.png" alt="Captcha placona 1" width="150" height="75" />

```
<cfimage action="captcha" fontSize="18" width="150"
height="75" text="placona" difficulty="medium">
```

Displaying something like:
  
<img src="http://files.placona.co.uk/cfimage/captcha_2.png" alt="Captcha placona 2" width="150" height="75" /> 

```
<cfimage action="captcha" fontSize="18" width="150" height="75" text="placona" difficulty="high">
```

Which displays my favorite and hardest one.

<img src="http://files.placona.co.uk/cfimage/captcha_3.png" alt="Captcha placona 3" width="150" height="75" />
  
See how easy we go from very simple to very complex captchas by only changing the attribute difficulty?
  
Hope you liked the examples.
