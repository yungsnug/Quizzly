/**
 * QuizController
 *
 * @description :: Server-side logic for managing Quizzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  destroyQuizzesByIds: function(req, res) {
    var data = req.params.all();
    Quiz.destroy({id: data.ids}).exec(function(err, quizzes) {
      res.json(quizzes);
    });
  }
};
