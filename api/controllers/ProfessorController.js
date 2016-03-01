/**
 * ProfessorController
 *
 * @description :: Server-side logic for managing Professors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `ProfessorController.getQuiz()`
  */
  getQuiz: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  /**
   * UserController.login()
   */
  login: function(req, res) {
    var params = req.params.all();
    //or
    // var emailid = req.param('email');
    // var password = req.param('password');
    
    // Authentication code here
    



Professor.find({email: params.email, password: params.password}).exec(function(err){
      if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(500, { error: 'Some error occured' });
      }
      console.log("hello");
      // req.session.userId =
     return res.ok();
   
 });
  
},

  /**
   * `ProfessorController.getAnswers()`
  */
  getAnswers: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  /**
   * `ProfessorController.getAnswer()`
  */
  getAnswer: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  }
};
