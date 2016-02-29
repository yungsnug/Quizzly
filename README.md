# Quizzly App

a [Sails](http://sailsjs.org) application

To run locally:<br/>
A. Have nodejs installed (only step 1): <a href="https://github.com/freyconner24/Quizzly/blob/master/docs/SailsLocally.md#1-install-nodejs">NodeJS installation</a><br/>
B. After cloning, cd into directory Quizzly<br/>
C. To setup connections and models from barebone files run the following:<br/>
-Run <code>cp config/connections.js.template config/connections.js</code><br/>
-Run <code>cp config/models.js.template config/models.js</code><br/>
-If using MySQL-> install MySQL (only step 1): <a href="https://github.com/freyconner24/Quizzly/blob/master/docs/SailsOnMySql.md#1-first-create-a-mysql-database">MySQL Guide for Mac OS X</a>, <a href="http://dev.mysql.com/doc/refman/5.7/en/windows-installation.html">MySQL Guide for Windows</a>, and <a href="http://dev.mysql.com/doc/refman/5.7/en/linux-installation.html">MySQL Guide for Linux</a>. And change both files (config/models.js and config/connections.js) - see comments. (In connections make sure to read comments at top) <br/>
D. To install/build application do the following: </br>
-Run <code>npm install</code><br/>


You must run this command every time you change a React file: `browserify -t [ babelify --presets [ react ] ] components/app.js -o assets/js/bundle.js`

I recommend having 2 terminal windows open.  In one window you run the compile line above and in the other window you run the server with `sails lift`

