# Quizzly App

a [Sails](http://sailsjs.org) application

To run locally:
-after cloning, cd into directory Quizzly
-Run <code>npm install</code>
-Then run the following 2 commands in-order to not edit default files (config/connections.js and config/models.js):
-Run <code>git update-index --assume-unchanged config/connections.js</code>
-Run <code>git update-index --assume-unchanged config/models.js</code>

You must run this command every time you change a React file: `browserify -t [ babelify --presets [ react ] ] components/app.js -o assets/js/bundle.js`

I recommend having 2 terminal windows open.  In one window you run the compile line above and in the other window you run the server with `sails lift`

