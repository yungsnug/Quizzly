/**
 * AnswerController
 *
 * @description :: Server-side logic for managing Answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  destroyAnswersByIds: function(req, res) {
    var data = req.params.all();
    Answer.destroy({id: data.ids}).exec(function(err, answers) {
      res.json(answers);
    });
  }
};
