---
id: 156
title: ColdFusion 9 ORM and why I see deception
date: 2009-07-03T00:00:00+00:00
categories:
  - coldfusion
tags:
  - Adobe
  - Technology
---
Not trying to be contradictive here (maybe a little bit) or rain on anyones parade, but I've been hearing and seeing loads of fuss from people who are "just waiting" for ColdFusion 9 ORM to be released, or some people who have projects where ColdFusion 9 ORM "would suit just perfectly".

Whilst I find it to be perfectly normal and very exciting, I can also predict some deception is to come.

Obviously this doesn't apply to everybody, but to some people who are expecting too much of it. When I say expecting too much of it, I mean people who think it will be a life saver, and everything that is ugly will become pretty.

[ORM](http://en.wikipedia.org/wiki/Object-relational_mapping "Object-relational mapping") is no big news for us ColdFusion developers, as we've been using it for a while with Reactor and Transfer. But I still feel the need of explaining a few things in here to avoid people being mislead by the hype that is to come.

On a side note, I think it's necessary to state that ColdFusion ORM **will not** write code for you (although it will save you many hours witting it), and it **will not** make your ugly "Select *" on the database any uglier or prettier than they are.

A few weeks ago, Terry Ryan from Adobe made a [blog post](http://www.terrenceryan.com/blog/post.cfm/on-cform-and-dbas- "Terrance Ryan - On ColdFusion ORM and DBAs"){.broken_link} stating that DBA's are still necessary, and to be very honest, I think they will be necessary now more than they have ever been.

Also, we need to realize that ColdFusion 9 ORM will be powered by [Hibernate](http://www.hibernate.org/ "Hibernate"), which is a pretty serious and very well tested ORM. It's great news, as we are inheriting years of hard work on it, but it's also worth mentioning that Hibernate can be dangerous if not properly handled.
  
"_Tell me something new Marcos, it's like that with everything_"
  
You're probably right, but I can already see lots of "bad" things being released in the very beginning, as some people will misjudge and probably misuse the ORM features only to stay afloat and be part of the "cool kids on the block" who use ORM powered applications.

We can't forget about the [KISS principle](http://en.wikipedia.org/wiki/KISS_principle "Keep it Short and Simple") that has always been present in the ColdFusion life.
  
You might think I'm exagerating here, but from what I've been seeing, people could be very wrong (and precipitated) about the whole concept. Obviouly when things go wrong, they will blame on the technology, instead of blaming themselves for not planning ahead, and getting necessary education on what ORM really is.

One of the main gaps I can see here, is the lack of knowlewdge most of us have when it comes to Hibernate. I've been reading some stuff about it for a while, and can tell it's pretty cool stuff, but the learning curve is a bit steep, and while you can probably have something up and running after a few hours of research and reading, you never know if that's the right way to do it. In that sense, you could easily end up with the biggest overkill ever, when your project is the most up-to-date as it could go, but it's simply not functional. Raise your hands if this doesn't sound familiar.

I would like to hear some other people's opinions on that matters, in regards to experiences. and if my gut feeling make sense only for me.
