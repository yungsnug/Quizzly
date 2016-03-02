<h1>Getting Sails, Waterline on Mac OS X.</h1><br/>
<h2>For other OS's having any trouble follow: http://sailsjs.org/get-started#?getting-started-installation</h2><br/>
<hr>
(Note: if one of the installations from command line does not appear to be working try with sudo: <code>sudo [command]</code>)<br/>
(Extra Note: 10. checkout common errors before hitting me up)<br/>
<hr>
Overview:<br/>
1. Install nodejs - sails runs on nodejs (whenever you call npm).<br/>
2. Install Sails - sails provides an api model that is easy to navigate on top of nodejs<br/>
3. Create a sails project<br/>
4. Install Waterline and sails-memory - waterline ORM provides sails with the ability to write server side code and alter said code using sails and use an adapter to transfer server side code to different databases using adapters.  Sails-memory provides local memory to be used for development.<br/>
5. Connecting waterline/sails-memory<br/>
6. Create Sails API (controller/model)<br/>
7. Code for API<br/>
8. Create path within API (Don't need to do this because of Blueprints?)<br/>
9. Common Errors<br/>
10. Getting Started/Checkout More/Using Sails and Waterline<br/>
11. References<br/>

<hr>

<h1>1. Install nodejs.</h1><br/>

A. Download and install nodejs from https://nodejs.org/en/.  Mature and Dependable works. <br/>
B. Check node is in your path by typing: <code>node -v</code>. This should return the version number.<br/>
C. If not, add it to path. See: http://coolestguidesontheplanet.com/add-shell-path-osx/<br/>

<h1>2. Install Sails </h1><br/>

A. Install sails by typing: <code>sudo npm install sails -g</code><br/>

<h1>3. Create a sails project</h1><br/>

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

<h1>4. Install Waterline and sails-memory</h1><br/>
From within Sails App folder<br/>

A. Install Waterline ORM:<br/>
-Type: <code>npm install waterline</code><br/>

B. Install sails-memory: <br/>
-Type: <code>npm install sails-memory</code><br/>

(Note: if one of the installations from command line does not appear to be working try with sudo: <code>sudo [command]</code>)<br/>

<h1>5. Connecting waterline/sails-memory</h1><br/>
From within Sails App folder -> <br/>
A. Navigate/Open config/connections.js<br/>

B. Create new mysql connection in connections.js for sails-mysql<br/>
-Comment out/delete everything inside <code>module.exports.connections = {</code><br/>
-Type inside <code>module.exports.connections = {</code>:<br/>
<code><br/>
	localDiskDb: {<br/>
    adapter: 'sails-disk'<br/>
  },<br/>
  memory: {<br/>
    adapter: 'sails-memory'<br/>
  }<br/>
</code><br/>

C. Connect to database/memory<br/>
-Navigate/Open config/models.js <br/>
-Inside: <code>module.exports.models = {</code><br/>
-Type: <code>connection: 'memory'</code><br/>

D. Test Connection is working<br/>
-Type: <code>sails lift</code> <br/>
-If prompted to input 1, 2, or 3. Input <code>2</code><br/>
-If no errors you're good to go!<br/>

<h1>6. Create a Sails API (controller/model)</h1><br/>

A. Create an API<br/>
-Type: <code>sails generate api Employee</code><br/>

This creates a controller called EmployeeController.js under the api/controller folder and creates a model called Employee.js under the api/model folder.<br/>

B. Create an API model and controller separately<br/>
-Type: <code>sails generate model User name:string email:string password:string</code><br/>
-Type: <code>sails generate controller User create show edit delete</code><br/>

This creates a controller called UserController.js under the api/controller folder and creates a model called User.js under the api/model folder.<br/>

<h1>7. Code for API</h1><br/>

A. Fill code in for Create function in UserController<br/>
-Navigate/Open api/controller/UserController.js<br/>
-Type/create function should appear like:<br/>
	<code>
		create: function(req, res){
 			var params = req.params.all();
 			User.create({name: params.name}).exec(function createCB(err,created){<br/>
   				return res.json({
     				notice: 'Created user with name ' + created.name
   				});
 			});
		},
	</code><br/>

<h1>8. Create path within API (Don't need to do this because of Blueprints?)</h1><br/>
Checkout Blueprints: http://sailsjs.org/documentation/reference/blueprint-api<br/>

A. Add route (Don't Do - see Blueprints API on sails website)<br/>
-Navigate/Open config/routes.js<br/>
-Inside <code>module.exports.routes = {</code><br/>
-Type/code within should appear like:<br/>
	<code>
		'/': {
    		view: 'homepage',
    		'post /User': 'UserController.create'
  		}
  	</code><br/>

B. Test route/create function<br/>
-Type: <code>sails lift</code> <br/>
-If prompted to input 1, 2, or 3. Input <code>2</code><br/>
-Visit http://localhost:1337/ to see default home page<br/>

<h1>9. Common Errors</h1><br/>

<h2>A. Add errors that pop up - we will solve them together</h2><br/>

<h1>10. Getting Started/Checkout More/Using Sails and Waterline</h1><br/>
-Great reference for how the API Sails works: http://sailsjs.org/documentation/concepts/<br/>
-Blueprint API: http://sailsjs.org/documentation/reference/blueprint-api<br/>
-Github for sails: https://github.com/balderdashy/sails<br/>
-Github for Waterline ORM: https://github.com/balderdashy/waterline<br/>

<h1>11. References</h1><br/>
-Website from Conner?<br/>
-Stackoverflow<br/>
-http://sailsjs.org/get-started#?getting-started-installation<br/>
-http://coolestguidesontheplanet.com/add-shell-path-osx/<br/>
-http://jumpstartsails.blogspot.in/2015/09/introduction-to-waterline-orm-and-sails.html<br/>
-http://coolestguidesontheplanet.com/start-stop-mysql-from-the-command-line-terminal-osx-linux/<br/>
-http://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/<br/>