---
id: 59
title: Yet another first Apollo app - Lyric Finder
date: 2007-03-21T00:00:00+00:00
categories:
  - Adobe
tags:
  - Apollo
  - Flex
---
I was going through the blogs and found that I was pretty late in releasing my **first Apollo app**.
  
So I decided to play around with Apollo and build something. It's a **Lyric Finder** (I know... very <span style="text-decoration: line-through;">stupid</span> creative name).
  
It uses <a href="http://lyrics.wikia.com/Lyrics_Wiki" target="_blank">lyricwiki</a> as source and some regular expressions to interpret the results.
  
I know there should be an easier way to do that using some sexy webservices, but as I'm still learning the stuff....

And it also helped me to realize that I'm still pretty bad in AS3.

```xml
<mx:ApolloApplication xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute">
```

```xml
<mx:Script>
        <![CDATA[
            import mx.rpc.events.ResultEvent;
            private function getResults(event:ResultEvent):void
            {
                var str:String = event.result.toString();
                var pattern:RegExp = "/<div id="lyric">.*?</div>/"
                var returnStr:String = pattern.exec(str)
                if(returnStr != null){
                requestResult.htmlText = pattern.exec(str);
            }
            else{
                requestResult.htmlText = "No Matches Found";
            }
            
            }
            private function doSearch():void
            {
                import mx.controls.Alert;
                var url:String = "http://lyricwiki.org/";
                var queryStrURL:String = prepareString(artistCriteria.text,songCriteria.text);
                var newURL:String = url + queryStrURL;
                trace(newURL);
                pageRequest.url=newURL;
                pageRequest.send()
                lbl_res.text="Results For:";
                lbl_details.text = capFirst(artistCriteria.text," ") + " - " + capFirst(songCriteria.text," ");
            }
            private function prepareString(artist:String,track:String):String
            {
                var newArtist:String = capFirst(artist,"_");
                var newTrack:String = capFirst(track,"_");
                return newArtist + ":" + newTrack;
            }
            private function capFirst(txt:String,delimiter:String):String{
                var str:String = txt;
                var aSTR:Array = str.split(" ");
                var i:int;
                var uString:String;
                var newStr:String = "";
                var strSpace:String = "";
                for (i = 0; i < aSTR.length; i++) {
                    uString = aSTR[i].substr(0, 1).toUpperCase() + aSTR[i].substr(1);
                    newStr = newStr + strSpace + uString
                    strSpace = delimiter;
                }
                return newStr
            }
        ]]>
    </mx:Script>
```

```xml
<mx:HTTPService url="http://www.placona.co.uk" id="pageRequest" method="GET" resultFormat="text" result="getResults(event)"/>

    <mx:TextInput 
        id="artistCriteria" 
        width="127.5" 
        text="Type the artist name" 
        click="artistCriteria.text=''"
        bottom="10" 
        right="272.5"/>

    <mx:TextInput 
        id="songCriteria" 
        width="135.5" 
        text="Type the song name" 
        click="songCriteria.text=''" 
        bottom="10"
        right="83"/>

    <mx:Label 
        text="Artist:" 
        bottom="10" 
        right="403"/>

    <mx:Label 
        text="Song:" 
        bottom="10" 
        right="226.5"/>

    <mx:Label 
        width="75" 
        height="17" 
        left="24" 
        top="10" 
        id="lbl_res" 
        fontFamily="Verdana" 
        fontWeight="bold" 
        alpha="0.0"/>

    <mx:Label 
        y="28" 
        horizontalCenter="0" 
        width="265" 
        id="lbl_details" 
        textAlign="center" 
        fontWeight="bold" 
        color="#ff0000" 
        fontSize="12"/>

    <mx:HTML 
        width="445" 
        id="requestResult" 
        height="263" 
        verticalCenter="2.5" 
        horizontalCenter="0" 
        fontFamily="Verdana" 
        fontSize="10"/>

    <mx:Button label="Search" id="loadWeb" bottom="10" click="doSearch()" right="10"/>

    <mx:Text 
        text="placona.co.uk" 
        top="10" 
        alpha="0.5" 
        color="#400000" 
        fontWeight="bold" 
        id="placona" 
        click="" 
        right="8"/>
</mx:ApolloApplication>
```
