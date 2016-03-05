/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {
  user: function(req, res) {
    console.log("req.session", req.session);
    if(req.session.user) {
      console.log("session is set");
      res.json(req.session.user);
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
      console.log("professor", professor);
      console.log("student", student);
      var user = {};
      if(professor.length > 0) {
        user = professor;
      } else if(student.length > 0) {
        user = student;
      } else {
        res.status(400);
        res.send('That user was not found!');
      }

      user.password = "";
      delete user.password;

      req.session.user = user;
      console.log("req.session", req.session);
      res.json(user);
    }).catch(function(){
      console.log("error is encountered");
    }).done(function(){
      console.log("promise call is done");
    });
  },
  logout: function(req, res) {
    delete req.session.user;
    res.ok();
  }
};
