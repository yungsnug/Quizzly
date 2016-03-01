/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	/**
   * UserController.login()
   */
  login: function(req, res) {
  	var params = req.params.all();
  	//or
  	// var emailid = req.param('email');
    // var password = req.param('password');
    console.log("params",params);
    // Authentication code here
    

console.log("res",res);
console.log("created",created);
Professor.find({email: params.email, password: params.password}).exec(function(err,created){
	console.log("err",err);
	console.log("res",res);
	console.log("created",created);
     return res.ok();
   
 });

    // If successfully authenticated

    // req.session.userId = foundUser.id;   // returned from a database

    // return res.json(foundUser);

  }

	
};

