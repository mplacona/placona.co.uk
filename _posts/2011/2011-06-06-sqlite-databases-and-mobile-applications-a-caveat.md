---
id: 665
title: SQLite databases and mobile applications - A caveat
date: 2011-06-06T14:18:41+00:00
dsq_thread_id:
  - "5434820565"
categories:
  - Adobe
tags:
  - Adobe AIR
  - Flex
---
As some of you might have noticed, I have been building <a title="Magic Ball for Blackberry Playbook" href="http://appworld.blackberry.com/webstore/content/34957/?lang=en" target="_blank">some</a> <a title="Time Traveller for Blackberry playbook" href="http://appworld.blackberry.com/webstore/content/36687/?lang=en" target="_blank">mobile applications</a> lately on my spare time specifically for the <a title="Blackberry Playbook" href="http://www.amazon.co.uk/gp/product/B004UL34EY/ref=as_li_tf_tl?ie=UTF8&tag=marplasblo-21&linkCode=as2&camp=1634&creative=6738&creativeASIN=B004UL34EY" target="_blank">Blackberry Playbook</a>. They are mainly built in Adobe Air using Actionscript 3 and Blackberry's <a title="Blackberry Tablet SDK" href="https://developer.blackberry.com/air/" target="_blank">Tablet SDK</a>.

On my latest application, I have found the need for a database, as it needs to store lots of user input data. The first option that comes to mind is <a title="SQLite" href="http://www.sqlite.org/" target="_blank">SQLite</a>, as it's very simple to integrate, and has native support.

I will show here an integration example, and focus on a caveat I found while trying to use it on a real device.

For starters, here are the classes you need to import on your main class:

```
import flash.data.SQLConnection;
import flash.data.SQLStatement;
import flash.filesystem.File;
```

I then create a method to initialize my database connection:

```
private var dbConnection:SQLConnection = new SQLConnection;
private function initDB():void{
	var embededSessionDB:File = File.applicationDirectory.resolvePath("assets/db.sqlite");
	var writeSessionDB:File = File.applicationStorageDirectory.resolvePath("assets/db.sqlite");
	// If a writable DB doesn't exist, we then copy it into the app folder so it's writteable
	if (!writeSessionDB.exists) {
		embededSessionDB.copyTo(writeSessionDB);
	}
	var dbFile:File = writeSessionDB;

	dbConnection.open(dbFile);
}
```

What is important to mention here, is that most people (myself being one of them) will be completely tempted to skip the bit where it copies the local file (coming from the application itself) into the local storage. Funnily enough, if you skip this step, when you test it locally, it will all work wonderfully, but when you deploy it into a real device (or even a simulator) nothing happens at all.

After some research, I found out that you need to be using the database from the local storage, and just like this is that you will have read and write permissions.

After getting that small "detour" out of the way, I can go on and write my first query against that database.

```
private function getWords(intTabID:int):Array{
	var stmt:SQLStatement = new SQLStatement();
	stmt.sqlConnection = dbConnection;
	stmt.text = "SELECT key, word FROM WORDS WHERE category_id = (:wordID)";
	stmt.parameters[':wordID'] = intTabID;
	stmt.execute();
	var result:Array = stmt.getResult().data;
	return result;
}
```

And this will return a nice array with all my data from the SQLite database.
