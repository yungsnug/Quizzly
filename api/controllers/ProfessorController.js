/**
 * ProfessorController
 *
 * @description :: Server-side logic for managing Professors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req, res) {

    console.log("attempting to login...");
    var p = req.params.all();
    console.log("email", p.email);
    Professor.find({
        email: p.email,
        password: p.password
    }).exec(function(err, professor) {
      console.log("professor", professor);
      console.log("err", err);
      if(err) {
        console.log("stopped cuz error");
        return;
      }
      if(professor.length == 0) {
        console.log("Professor was not found\n");
        return;
      }
      req.session.user = professor;
      console.log("req.session", req.session);
      res.json(professor);
    });
  }
};
