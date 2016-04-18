/**
 * QuizController
 *
 * @description :: Server-side logic for managing Quizzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var async = require("async");
 var Quiche = require("quiche");

module.exports = {
  destroyQuizzesByIds: function(req, res) {
    var data = req.params.all();
    Quiz.destroy({id: data.ids}).exec(function(err, quizzes) {
      res.json(quizzes);
    });
  },

  getQuizzesByQuizIds: function(req, res) {
    var data = req.params.all();
    Quiz.find({id: data.quizIds}).exec(function(err, quizzes) {
      res.json(quizzes);
    });
  },

  //Two parameters, quiz and email
  //this will return only the questions that have been answered by that user
  getQuizQuestions: function(req, res) {
    var data = req.params.all();
/*
    Student.findOne({email: data.student}).exec(function(err, s) {
      console.log("id: " + s.id);
      StudentAnswer.find({student: s.id, quiz: data.quiz}).populate('question').exec(function(err, answers) {
        console.log("answers: " + answers);
        var questions = [];
        var dict = {};
        answers.forEach(function(answer) {
          if(!(answer.question.id in dict)) {
            dict[answer.question.id] = 1;
            questions.push(answer.question);
          }
        });

        return res.send(200, questions);
      });
    });*/


    Quiz.findOne({id: data.id}).populate('questions').exec(function(err, quiz) {
      if(quiz.questions.length != 0) {
        return res.send(200, quiz.questions);
      }

      return res.json({
        error: "That quiz does not have any questions"
      });

    });
  },

  getJsonQuizQuestions: function(req, res) {
    var data = req.params.all();
    Quiz.findOne({id: data.id}).populate('questions').exec(function(err, quiz) {
      if(quiz.questions.length != 0) {
        return res.json({questions: quiz.questions});
      }

      return res.json({
        error: "That quiz does not have any questions"
      });

    });
  },

  //Used for power point I think?
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
  },

  //Failed powerpoint graph that may work with some more effort
  displayPowerPointGraph: function (req, res) {
    var data = req.params.all();

    StudentAnswer.find({question: data.question_id}).sort('answer ASC').exec(function(err, student_answers) {
      console.log(student_answers);
      var previous = -1;
      var i = 0;
      var num_answers = [];
      student_answers.forEach(function(student_answer) {

        if(previous == -1) {
          num_answers.push(1);
          previous = student_answer.answer;
        } else if(previous == student_answer.answer) {
          num_answers[i] = num_answers[i] + 1;
        } else {
          previous = student_answer.answer;
          i = i + 1;
          num_answers.push(1);
        }
      });

      //new
      Answer.find({question: student_answers[0].question}).sort('id ASC').exec(function(err, answers) {
        var labels = [];
        answers.forEach(function(answer) {
          labels.push(answer.text);
        });

        var bar = new Quiche('bar');
        bar.setWidth(625);
        bar.setHeight(480);
        bar.title = {
          'text': 'Some title!',
          'color': '000000',
          'size': 20,
          'align': 'c'
        };

        bar.setBarWidth(20);
        bar.setBarSpacing(80);
        bar.setLegendHidden();
        bar.setTransparentBackground();

        bar.addData(num_answers, 'Foo', 'FF0000');
        bar.addAxisLabels('x', labels);
    //    bar.addData([19, 19, 21, 14, 19, 11, 10, 18, 19, 30], 'Foo', 'FF0000');
    //    bar.addAxisLabels('x', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

        bar.setAutoScaling();
        var imageUrl = bar.getUrl(true);
        res.send(200, {
          graphUrl: imageUrl.split('%2B').join('+')
        });
      });
      //end new
    });
  }
};
