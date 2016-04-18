# Quizzly App

a [Sails](http://sailsjs.org) application

To run locally:<br/>
A. Have nodejs installed (only step 1): <a href="https://github.com/freyconner24/Quizzly/blob/master/docs/SailsLocally.md#1-install-nodejs">NodeJS installation</a><br/>
B. Run <code>sudo npm install sails -g</code><br/>
C. After cloning (<a href="https://github.com/freyconner24/Quizzly/blob/master/docs/githubStartup.md#github-guidecommands">Git Commands Guide w/ Clone Command</a>), cd into directory Quizzly<br/>
D. To setup connections and models from barebone files run the following:<br/>
-Run <code>cp config/connections.js.template config/connections.js</code><br/>
-Run <code>cp config/models.js.template config/models.js</code><br/>
-If using MySQL-> install MySQL (only step 1): <a href="https://github.com/freyconner24/Quizzly/blob/master/docs/SailsOnMySql.md#1-first-create-a-mysql-database">MySQL Guide for Mac OS X</a>, <a href="http://dev.mysql.com/doc/refman/5.7/en/windows-installation.html">MySQL Guide for Windows</a>, and <a href="http://dev.mysql.com/doc/refman/5.7/en/linux-installation.html">MySQL Guide for Linux</a>.<br/>
-Note: if using Windows or Linux Guide follow OSX guide for creating database, changing password (note-syntax may be different).<br/>
E. Change both files (config/models.js and config/connections.js) - see comments. (In connections make sure to read comments at top) <br/>
F. To install/build application do the following: </br>
-Run <code>npm install --save</code><br/>
G. Make sure MySQL server is running if using MySQL (check password and db name in config/connections.js)<br/>
H. Run the server with `sails lift` <br/>
I. For MySQL, get MySQLWorkbench and CSV files loaded in database: <a href="https://github.com/freyconner24/Quizzly/blob/master/docs/mySQLWorkbench.md#mysql-workbench-guide">MySQLWorkbench Guide</a>


Git commands trouble? Start here:<a href="https://github.com/freyconner24/Quizzly/blob/master/docs/githubStartup.md#github-guidecommands">Git Commands Guide</a>

To change react files (located in components/*) run once `sudo npm install -g browserify` then...

You must run this command every time you change a React file: `browserify -t [ babelify --presets [ react ] ] components/app.js -o assets/js/bundle.js`

If changing component files (running react code above^), have two tabs.  One tab with sails lift (only run once), and then one where you run browserify (run any times you want to test changes in component file).  This allows you to stay logged in.

Sails Blueprints docs: http://sailsjs.org/documentation/reference/blueprint-api

Sails Blueprints examples:
<code>http://localhost:1337/professor/create?firstName=miller&email=miller@usc.edu&lastName=jeffrey&password=test</code>
<code>http://localhost:1337/professor/find</code>
	- this will get all the professors
<code>http://localhost:1337/professor/find</code>
<code>http://localhost:1337/professor/find</code>
<code>http://localhost:1337/professor/find</code>
