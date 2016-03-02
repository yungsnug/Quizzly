# Quizzly App

a [Sails](http://sailsjs.org) application

To run locally:<br/>
A. After cloning, cd into directory Quizzly<br/>
B. To setup connections and models from barebone files run the following:<br/>
-Run <code>cp config/connections.js.template config/connections.js</code><br/>
-Run <code>cp config/models.js.template config/models.js</code><br/>
-If using MySQL-> change both files (config/models.js and config/connections.js) - see comments. <br/>
C. To install/build application do the following: </br>
-Run <code>npm install --save</code><br/>


You must run this command every time you change a React file: `browserify -t [ babelify --presets [ react ] ] components/app.js -o assets/js/bundle.js`

I recommend having 2 terminal windows open.  In one window you run the compile line above and in the other window you run the server with `sails lift`

Sails Blueprints docs: http://sailsjs.org/documentation/reference/blueprint-api

Sails Blueprints examples:
<code>http://localhost:1337/professor/create?firstName=miller&email=miller@usc.edu&lastName=jeffrey&password=test</code>
<code>http://localhost:1337/professor/find</code>
	- this will get all the professors
<code>http://localhost:1337/professor/find</code>
<code>http://localhost:1337/professor/find</code>
<code>http://localhost:1337/professor/find</code>