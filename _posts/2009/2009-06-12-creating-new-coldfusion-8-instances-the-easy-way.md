---
id: 148
title: Creating new ColdFusion 8 instances - The easy way
date: 2009-06-12T00:00:00+00:00
categories:
  - coldfusion
tags:
  - Adobe
  - 'CFML - 101'
---
I just had to write this guide at work, and thought it could be useful to somebody else.
  
Basically at work, we have ColdFusion 8 installed on each developer's computer, and in order to have everything separated, we have one ColdFusion instance per project, so we can save on resources, and can fine tune each of the instances according to the application needs.
  
There's a few ways to accomplis this task, but lately I found that the easiest way if to use ColdFusion Admin itself, and let it do all the work for you. here's how I do it, assuming you have ColdFusion 8 multi-server configuration already installed:

  1. Ensure the Macromedia JRUN Admin Server and Macromedia JRUN CFusion server are running
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image1.PNG" alt="CFusion Server started" width="444" height="174" />

  2. Go to 127.0.0.1:8000
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image2.PNG" alt="JSun Server" />

  3. Enter the username and password for the JRUN Admin, lowercase username of admin and the password used to install ColdFusion 8 default is password.
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image3.PNG" alt="JRun Server" />

  4. Once logged in your will see the servers that you already have installed.
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image4.PNG" alt="ColdFusion Services" />

  5. Now check on which port CFUSION is installed. Default is 8300
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image5.PNG" alt="ColdFusion Services" />

  6. You can now access the main ColdFusion server in order to create your new instance. You should be able to login to http://127.0.0.1:your\_cfusion\_port. In this case 8300, so you can bookmark [http://127.0.0.1:8300/cfide/administrator](http://127.0.0.1:8300/cfide/administrator "ColdFusion Administrator"){.broken_link}. The login details should be the same as your default JRun admin (**admin**, **_password_**)
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image6.PNG" alt="ColdFusion Admin" />

  7. On the left hand menu, click on **Enterprise Manager** and then **Instance Manager**.
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image7.PNG" alt="ColdFusion Enterprise Manager" />

  8. You should now see all your servers again, but this time you will click on the “_Add New Instance_” button.
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image8.PNG" alt="Add new ColdFusion Server" />

  9. Give your server a name, and add a path on the server directory field. ColdFusion will normally put this data automatically, but in this case we will change it to point to where we store our JRun servers (**c:JRunServers**). Could be anywhere really. Remember **NOT** to tick the options “_Create Windows Service_” and “_Auto Restart Service_”.
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image9.PNG" alt="Configure your new instance" />

 10. Go make some tea. It will take a while (10 minutes or so), as ColdFusion is creating all the necessary runtime, and deploying several files to your new server.
<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image10.PNG" alt="Make tea" />

 11. Once it’s finished, you should see a screen like this:

<img style="margin-left: 10px; margin-right: 10px;" src="http://files.placona.co.uk/cf8instances/image11.PNG" alt="ColdFusion instance created" /> </ol> 

The port will obviously vary, but this screen means your server has been created successfully, and is installed on port xxxx. You should now be able to access this new instance by going to http://127.0.0.1:new\_port\_here as the service is already up and running.
