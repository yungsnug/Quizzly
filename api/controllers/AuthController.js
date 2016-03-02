/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('q');

module.exports = {
  user: function(req, res) {
    console.log("req.session", req.session);
    if(req.session.user) {
      console.log("session is set");
      return req.session.user;
    } else {
      console.log("session isn't set");
    }
  },
  login: function(req, res) {
    var data = req.params.all();
    Promise.all([
      Professor.find({email: data.email, password: data.password}),
      Student.find({email: data.email, password: data.password})

    ]).spread(function(professor, student){
      var user = {};
      if(professor.length > 0) {
        user = professor;
      }

      if(student.length > 0) {
        user = student;
      }

      user.password = "";

      req.session.user = user;
      res.json(professor);
    }).catch(function(){
      console.log("error is encountered");
    }).done(function(){
      console.log("promise call is done");
    });
  }
};
