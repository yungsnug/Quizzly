<h1>Getting Sails, Waterline, MySQL running on Mac OS X or Linux.</h1><br/>
<h2>For other OS's having any trouble follow: http://sailsjs.org/get-started#?getting-started-installation</h2><br/>
<hr>
(Note: if one of the installations from command line does not appear to be working try with sudo: <code>sudo [command]</code>)<br/>
(Extra Note: 10. checkout common errors before hitting me up)<br/>
<hr>
Overview:<br/>
1. First create a MySQL database - database used by sails-mysql adapter.<br/>
IMPORTANT: to run steps 6-9 need to start SQL server<br/>
2. Install nodejs - sails runs on nodejs (whenever you call npm).<br/>
3. Install Sails - sails provides an api model that is easy to navigate on top of nodejs<br/>
4. Create a sails project<br/>
5. Install Waterline and sails-mysql - waterline ORM provides sails with the ability to write server side code and alter said code using sails and use an adapter to transfer server side code to different databases using adapters.  Sails-mysql is the adapter which provides link to mysql from waterline.<br/>
6. Connecting waterline/sails-mysql to mysql database created in step 1.<br/>
7. Create Sails API (controller/model)<br/>
8. Code for API<br/>
9. Create path within API<br/>
10. Common Errors<br/>
11. Getting Started/Checkout More/Using Sails, Waterline, and sails-mysql<br/>
12. References<br/>

<hr>

<h1>1. First create a MySQL database.</h1><br/>

Always when replacing replace [] as well.

A. Install MySQL:<br/>
-Download and install MySQL community from: http://dev.mysql.com/downloads/mysql/<br/>
-Make sure to download the DMG, not the TAR!<br/>
-Make sure to save temporary password<br/>
-I like having sql in path.  See: http://coolestguidesontheplanet.com/add-shell-path-osx/<br/>

B. Turn on MySQL:<br/>
-From preference pane: click turn on - wait until says running<br/>
or<br/>
-From command line: <code>sudo launchctl load -F  /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist</code><br/>

C. Login to mysql:<br/>
-type (replace [temppwd] with temporary password): <code>mysql -uroot -p[temppwd]</code><br/>

D. Change temp mysql password:<br/>
-Now terminal should appear with: mysql><br/>
-Do not follow commented out code.<br/>
<!---type (make sure to include ; and replace xxxxxxxx with pword you want): <code>SET PASSWORD = PASSWORD('xxxxxxxx');</code>--><br/>
<!---make sure to record your new pword because you will need this--><br/>
-Type: <code>quit</code><br/>
-This will exit out of mysql and into command line<br/>

-Now change password (replace [temppwd] and [newpwd]):<br/>
<code>mysqladmin -u root -p[temppwd] password [newpwd]</code><br/>

E. Fix 2002 Socket Bug (note: check errors section if it happens at a later date)<br/>
-Type:<code>sudo mkdir /var/mysql</code><br/>
-Type:<code>sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock</code><br/>

F. Create database to use for project (note: replace testdb with db name you want):<br/>
-Login to mysql: <code>mysql -uroot -p[newpwd]</code> (if not working, go back to step D. and make sure using correct temppwd)<br/>
-From the mysql environment: mysql><br/>
-Type: <code>CREATE database testdb;</code>;<br/>
or<br/>
-From command line (replace [newpwd] with your newpwd):<br/>
-Type: <code>mysql -u root -p[newpwd] -e "create database testdb"</code>;<br/>

<h2>Note: Make sure you use a different terminal or quit from mysql by typing: <code>quit</code> before moving on to next steps.</h2><br/>

G. Make sure mysql is running<br/>
-Go to system preferences -> mysql<br/>
or<br/>
-In command line login.<br/>

H. Checkout different ways to run (from command line)<br/>
-Start: <code>sudo launchctl load -F  /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist</code><br/>
-Stop: <code>sudo launchctl unload -F  /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist</code><br/>
-Checkout: http://coolestguidesontheplanet.com/start-stop-mysql-from-the-command-line-terminal-osx-linux/<br/>


<h1>2. Install nodejs.</h1><br/>
<h2>Note: Make sure you use a different terminal or quit from mysql by typing: <code>quit</code> before moving on to next steps.</h2><br/>

A. Download and install nodejs from https://nodejs.org/en/.  Mature and Dependable works.<br/>
B. Check node is in your path by typing: <code>node -v</code>. This should return the version number.<br/>
C. If not, add it to path. See: http://coolestguidesontheplanet.com/add-shell-path-osx/<br/>

<h1>3. Install Sails </h1><br/>

A. Install sails by typing: <code>sudo npm install sails -g</code><br/>

<h1>4. Create a sails project</h1><br/>

A. Create a folder for sails project:<br/>
-From command-line type: <code>mkdir projectName</code><br/>

B. Enter projectName folder:<br/>
-Type: <code>cd projectName</code><br/>

C. Create Sails App folder (replace testProject with name of folder wanted):<br/>
-Type: <code>sails new testProject</code><br/>

D. Navigate into Sails App folder:<br/>
-Type: <code>cd testProject</code><br/>

E. Test sails works:<br/>
-Type: <code>sails lift</code> and visit http://localhost:1337/ to see default home page<br/>

<h1>5. Install Waterline and sails-mysql</h1><br/>
From within Sails App folder<br/>

A. Install Waterline ORM:<br/>
-Type: <code>npm install waterline</code><br/>

B. Install sails-mysql:<br/>
-Type: <code>npm install sails-mysql</code><br/>

(Note: if one of the installations from command line does not appear to be working try with sudo: <code>sudo [command]</code>)<br/>

<h1>6. Connecting waterline/sails-mysql to mysql database created in step 1.</h1><br/>
From within Sails App folder -><br/>
A. Navigate/Open config/connections.js<br/>

B. Create new mysql connection in connections.js for sails-mysql<br/>
-inside <code>module.exports.connections = {</code><br/>
-type (make sure to input password for mysql and database for mysql you created in step 1 in for xxxxxxxx and testdb):<br/>
<code>
	mysql: {
    adapter    : 'sails-mysql',
    host      : 'localhost',
    port      : 3306,
    user      : 'root',
    password  : 'xxxxxxxx',
    database  : 'testdb',

    // OR (explicit sets take precedence)
    // adapter    : 'sails-mysql',
    // url       : 'mysql://root:xxxxxxxx@localhost:3306/testdb'

    // Optional

    charset   : 'utf8',
    collation : 'utf8_swedish_ci'
  }
</code><br/>

C. Connect to database<br/>
-Navigate/Open config/models.js<br/>
-Inside: <code>module.exports.models = {</code><br/>
-Type: <code>connection: 'mysql'</code><br/>

D. Test Connection is working<br/>
-Type: <code>sails lift</code><br/>
-If prompted to input 1, 2, or 3. Input <code>2</code><br/>
-If no errors you're good to go!<br/>

<h1>7. Create a Sails API (controller/model)</h1><br/>

A. Create an API<br/>
-Type: <code>sails generate api Employee</code><br/>

This creates a controller called EmployeeController.js under the api/controller folder and creates a model called Employee.js under the api/model folder.<br/>

B. Create an API model and controller separately<br/>
-Type: <code>sails generate model User name:string email:string password:string</code><br/>
-Type: <code>sails generate controller User create show edit delete</code><br/>

This creates a controller called UserController.js under the api/controller folder and creates a model called User.js under the api/model folder.<br/>


<h1>8. Code for API</h1><br/>

A. Fill code in for Create function in UserController<br/>
-Navigate/Open api/controller/UserController.js<br/>
-Type/create function should appear like:<br/>
	<code>
		create: function(req, res){
 			var params = req.params.all();
 			User.create({name: params.name}).exec(function createCB(err,created){
   				return res.json({
     				notice: 'Created user with name ' + created.name
   				});
 			});
		},
	</code><br/>


<h1>9. Create path within API</h1><br/>

A. Add route (Don't Do - see Blueprints API on sails website)<br/>
-Navigate/Open config/routes.js<br/>
-Inside <code>module.exports.routes = {</code>
-Type/code within should appear like:<br/>
	<code>
		'/': {
    		view: 'homepage',
    		'post /User': 'UserController.create'
  		}
  	</code><br/>

B. Test route/create function<br/>
-Type: <code>sails lift</code><br/>
-If prompted to input 1, 2, or 3. Input <code>2</code><br/>
-Visit http://localhost:1337/ to see default home page<br/>

<h1>10. Common Errors</h1><br/>

<h2>A. ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)<br/>
-FIXED!!!!!</h2><br/>
A-1. Check process is running - go to preference pane, if preference pane says process is stopped- try to turn on. Then test mysql in command line.<br/>

A-2. To see if something is using the port (3306), run: <code>sudo lsof -i tcp:3306</code><br/>

A-3. To check if mysql is running on a different port use: <code>ps ax | grep mysql</code><br/>

-If the result is something like: <code>1105   ??  Ss     0:00.56 /usr/local/mysql/bin/mysqld --user=_mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --plugin-dir=/usr/local/mysql/lib/plugin --log-error=/usr/local/mysql/data/mysqld.local.err --pid-file=/usr/local/mysql/data/mysqld.local.pid --port=3307</code> continue on.<br/>

-If not like above, skip to step A-4 (uninstall/reinstall).<br/>

-Change the port number (check result first).<br/>
-Edit /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist<br/>

-Change <code><string>--port=3307</string></code> to <code><string>--port=3306</string></code><br/>

-Then restart mysql:<br/>
-To stop: <code>sudo launchctl unload -F  /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist</code><br/>

-To start: <code>sudo launchctl load -F  /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist</code><br/>

A-4. To uninstall:<br/>
-If process is running and still same error (2002) try first using preference pain to shutdown.  If preference pane not working use:<br/>
-To stop process: <code>sudo launchctl unload -F  /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist</code><br/>

<br/>
-Check if mysql still running: <code>ps ax | grep mysql</code><br/>
-(Note that the result: <code>[PID] s000  S+     0:00.00 grep mysql</code>) is the grep command you just entered<br/>

-If mysql is running, you need to kill the process:<br/>
-first try: <code>kill [PID]</code><br/>

-Check if mysql still running (kill didn’t work): <code>ps ax | grep mysql</code><br/>
-then try: <code>kill -9 [PID]</code><br/>

-Check if mysql still running (kill didn’t work): <code>ps ax | grep mysql</code><br/>
-try with sudo: <code>sudo kill [PID]</code><br/>

-Check if mysql still running (kill didn’t work): <code>ps ax | grep mysql</code><br/>
-try with sudo: <code>sudo kill -9 [PID]</code><br/>

-Check if mysql still running (kill didn’t work): <code>ps ax | grep mysql</code><br/>

-If still running you will need to restart - this will kill the process.<br/>

-Now run:<br/>
-<code>sudo rm -rf /usr/local/mysql*</code><br/>
-<code>sudo rm -rf /Library/StartupItems/MySQLCOM</code><br/>
-<code>sudo rm -rf /Library/PreferencePanes/MySQL*</code><br/>
-<code>rm -rf ~/Library/PreferencePanes/MySQL*</code><br/>
-<code>sudo rm -rf /Library/Receipts/mysql*</code><br/>
-<code>sudo rm -rf /Library/Receipts/MySQL*</code><br/>
-<code>sudo rm -rf /var/db/receipts/com.mysql.*</code><br/>

(Preference Pane should be gone)
IF THESE COMMANDS DON'T WORK - SEE/FOLLOW: http://community.jaspersoft.com/wiki/uninstall-mysql-mac-os-x<br/>

-Now, start this tutorial from the beginning.<br/>

<h2>B. Add other errors that pop up - we will solve them together</h2><br/>

<h1>11. Getting Started/Checkout More/Using Sails, Waterline, and sails-mysql</h1><br/>
-Great reference for how the API Sails works: http://sailsjs.org/documentation/concepts/<br/>
-Github for sails: https://github.com/balderdashy/sails<br/>
-Github for Waterline ORM: https://github.com/balderdashy/waterline<br/>
-Github for sails-mysql: https://github.com/balderdashy/sails-mysql<br/>

<h1>12. References</h1><br/>
-Website from Conner?<br/>
-Stackoverflow<br/>
-http://sailsjs.org/get-started#?getting-started-installation<br/>
-http://coolestguidesontheplanet.com/add-shell-path-osx/<br/>
-http://jumpstartsails.blogspot.in/2015/09/introduction-to-waterline-orm-and-sails.html<br/>
-http://coolestguidesontheplanet.com/start-stop-mysql-from-the-command-line-terminal-osx-linux/<br/>
-http://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/<br/>
