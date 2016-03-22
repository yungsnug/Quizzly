
/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var UrbanAirshipPush = require('urban-airship-push');
 // Your app access configuration. You will find this stuff in your App
 // Settings under App Key, App Secret and App Master Secret.
 var config = {
     key: 'UWBj9II1Tc-GBn4aioUHUw',
     secret: 'q4q2I2DNQw2URglIRPkC-Q',
     masterSecret: 'mL0uDhSPThSrfQyGp4kw0w'
 };

 // Create a push object
 var urbanAirshipPush = new UrbanAirshipPush(config);
var Promise = require('bluebird');

module.exports = {
  /**
   * `QuestionController.getAnswers()`
   */
  getAnswers: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },

  /**
   * `QuestionController.getQuestionsByCourseId()`
   */
  getQuestionsByCourseId: function (req, res) {
    console.log("--------------getQuestionsByCourseId");
    var data = req.params.all();

    var questions = [];

    Quiz.find({course: data.id}).exec(function (err, quizzes) {
      // console.log("quizzes: ", quizzes);
      Promise.each(quizzes, function(quiz) {
        // console.log("quiz: ", quiz);
        return Question.find({quiz: quiz.id}).then(function (quiz_questions) {
          // console.log("quiz_questions: ", quiz_questions);
          return quiz_questions;
        }).then(function(quiz_questions) {
          return Promise.each(quiz_questions, function(question) {
            // console.log("question: ", question);
            questions.push(question);
          });
        });      
      }).then(function() {
        console.log("finished!", questions.length);
        // console.log("finished!", questions);
        return res.json(questions);
      });
    });
  },

  /**
   * `QuestionController.getCorrectAnswer()`
   */
  getCorrectAnswer: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },

  /**
   * `QuestionController.askQuestion()`
   */
  askQuestion: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },

  ask: function(req, res) {
    //console.log("ask api hit");
    Question.findOne({id:req.query.id}).exec(function (err, question) {
      if(err) {
        return res.json({
          error: res.negotiate(err)
        });
      } if (!question) {
        return res.json({
          error: 'Question not found'
        });
      }
      Answer.find({question: question.id}).exec(function(err, answers) {

        var pushInfo = {
          "audience": "all",
          "notification": {
             "alert": "Question Available",
             "android": {
               "extra": {
                 "question": question.text,
                 "quiz_id": question.quiz,
                 "quest_id": question.id,
                 "type": question.type,
                 "answer0": answers[0].text,
                 "answer1": answers[1].text,
              //   "answer2": answers[2].text,
              //   "answer3": answers[3].text,
                 "time_limit": 50,
               }
             }
          },
          "device_types": ["android"]
        };
        if(answers.length > 2) {
          pushInfo.notification.android.extra.answer2 = answers[2].text;
        }
        if(answers.length > 3) {
          pushInfo.notification.android.extra.answer3 = answers[3].text;
        }

        console.log(pushInfo);
        urbanAirshipPush.push.send(pushInfo, function (err, data) {
            if (err) {
                // Handle error
                console.log(err);
                return;
            }
            console.log(data);
            return res.json({
              success: "Push sent"
            });

        });
      });
    });
  },

  answer: function(req, res) {
    console.log("Question ID: " + req.param('quest_id'));
    console.log("Quiz ID: " + req.param('quiz_id'));
    console.log("User Email: " + req.param('user_email'));
    console.log("Answer: " + req.param('answer'));

    Student.findOne({email: req.param('user_email')}).exec(function (err, student) {
      if(err) {
        return res.json({
          error: res.negotiate(err)
        });
      } if (!student) {
        return res.json({
          error: 'Student not found'
        });
      }
      console.log("found student");
      Answer.findOne({text: req.param('answer')}).exec(function (err, answer) {
        if(err) {
          console.log("answer error");
          return res.json({

            error: res.negotiate(err)
          });
        } if (!answer) {
          console.log("answer not found");
          return res.json({

            error: 'Student not found'
          });
        }
        var data = {
          student: student.id,
          question: req.param('quest_id'),
          answer: answer.id,
          quiz: req.param('quiz_id'),
        };
        StudentAnswer.create(data).exec(function(err, studentAnswer) {
          if(err) {
            return res.json({
              hello: 'did it work'
            });
          }

          return res.json(studentAnswer);
        });

      });


    });

  }
};
