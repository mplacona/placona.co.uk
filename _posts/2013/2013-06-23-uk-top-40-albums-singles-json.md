---
id: 1284
layout: post
title: UK Top 40 albums & singles JSON
date: 2013-06-23T22:46:10+00:00
dsq_thread_id:
  - "5438846022"
categories:
  - Technology
tags:
  - General Techie Stuff

---
[<img class="aligncenter size-full wp-image-1286" alt="top-40-albuns-singles" src="/images/2013/06/top-40-albuns-singles.png" width="560" height="350" srcset="/images/2013/06/top-40-albuns-singles.png 560w, /images/2013/06/top-40-albuns-singles-300x187.png 300w" sizes="(max-width: 560px) 100vw, 560px" />](/images/2013/06/top-40-albuns-singles.png)

So I had this idea for a little application and wanted to get the UK's Top40 singles to use in it. I started by writing something that would scrape <a title="Radio 1's Top 40 chart" href="http://www.bbc.co.uk/radio1/chart/singles" target="_blank">Radio 1's Top 40</a> chart and return me a list of songs since I couldn't find any feeds that would give me that.

I then thought this could be of use to somebody else, so turned it into a little service (built using Ruby and Sinatra) that returns a JSON object with all the singles and some useful information about the number of weeks it's been there, how much has it moved, and which direction (up or down) it's gone.

On the root of it, it returns the chart date as the current date and time, and the retrieval date to indicate which date it's been last retrieved. I am caching the feed to play nice with Radio 1, so I'm only making one HTTP request a day to their website.

Check it out at <http://top40.placona.co.uk/>{.broken_link}

Also feel free to fork it, and collaborate by adding your country's top 40