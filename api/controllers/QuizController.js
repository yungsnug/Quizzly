/**
 * QuizController
 *
 * @description :: Server-side logic for managing Quizzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var async = require("async");

module.exports = {
  destroyQuizzesByIds: function(req, res) {
    var data = req.params.all();
    Quiz.destroy({id: data.ids}).exec(function(err, quizzes) {
      res.json(quizzes);
    });
  },

  getQuizInfo: function(req, res) {
    var data = req.params.all();
    var response = [];
    var questions = [];

    async.series([
      function(callback) {
        Question.find({quiz: data.id}).exec(function(err, qs) {
          questions = qs;
          callback();
        });
      },

      function(callback) {
        async.each(questions, function(question, each_callback) {
          Answer.find({question: question.id}).exec(function(err, answers) {
            var question_json = {};
            question_json.question = question.text;
            question_json.quiz_id = data.id;
            question_json.answer = "answer";
            question_json.choices = [];
            answers.forEach(function (answer) {
              question_json.choices.push(answer.text);
            });

            question_json.time_limit = 20000;
            question_json.type = "multiple-choice";
            question_json.id = question.id;
            question_json.createdAt = question.createdAt;
            question_json.updatedAt = question.updatedAt;
            question_json.section_id = "0";

            response.push(question_json);

            each_callback();
          });
        }, function(err) {
          callback();
        });
      }

    ], function(err) {
      console.log(response);
      return res.send(200, response);
    });
/*    Question.find({quiz: data.id}).exec(function(err, questions) {

      questions.forEach(function (question) {

        Answer.find({question: question.id}).exec(function(err, answers) {

          var question_json = {};
          question_json.question = question.text;
          question_json.quiz_id = data.id;
          question_json.answer = "answer";
          question_json.choices = [];
          answers.forEach(function (answer) {
            question_json.choices.push(answer.text);
          });

          question_json.time_limit = 20000;
          question_json.type = "multiple-choice";
          question_json.id = question.id;
          question_json.createdAt = question.createdAt;
          question_json.updatedAt = question.updatedAt;
          question_json.section_id = 0;

          response.push(question_json);
          console.log(response);
          console.log("==========");
        });
      });

    });*/


//    console.log(response);
//    return res.send(200, response);

  }
};
