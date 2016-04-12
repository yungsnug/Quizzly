
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
/*     key: 'UWBj9II1Tc-GBn4aioUHUw',
     secret: 'q4q2I2DNQw2URglIRPkC-Q',
     masterSecret: 'mL0uDhSPThSrfQyGp4kw0w'*/
    key: 'RpquxajkQKeLnupkBrvWtw',
    secret: 'O8p2HuxVQBOrYaTersE5CA',
    masterSecret: 'Lcay6AUkQXapKaztfYSJGw'
 };

 // Create a push object
 var urbanAirshipPush = new UrbanAirshipPush(config);
var Promise = require('bluebird');

module.exports = {
   destroyQuestionsByIds: function(req, res) {
     var data = req.params.all();
     Question.destroy({id: data.ids}).exec(function(err, questions) {
       res.json(questions);
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

  ask: function(req, res) {
    //console.log("ask api hit");
    Question.findOne({id:req.query.id}).populate('answers').exec(function (err, question) {
      if(err) {
        return res.json({
          error: res.negotiate(err)
        });
      } if (!question) {
        return res.json({
          error: 'Question not found'
        });
      }
  //    var answers = question.anwers;
      console.log(question.answers.length);
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
               "time_limit": question.duration,
             }
           },
           "ios": {
             "extra": {
               "question": question.text,
               "quiz_id": question.quiz,
               "quest_id": question.id,
               "type": question.type,
               "time_limit": question.duration,
             }
           }
        },
        "device_types": ["android", "ios"]
      };
      if(question.answers.length != 0) {
        pushInfo.notification.android.extra.answer0 = question.answers[0].text;
        pushInfo.notification.android.extra.answer1 = question.answers[1].text;
        if(question.answers.length > 2) {
          pushInfo.notification.android.extra.answer2 = question.answers[2].text;
          pushInfo.notification.ios.extra.answer2 = question.answers[2].text;
        }
        if(question.answers.length > 3) {
          pushInfo.notification.android.extra.answer3 = question.answers[3].text;
          pushInfo.notification.ios.extra.answer3 = question.answers[3].text;
        }
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
  },

  askWithSection: function(req, res) {
    var question_id = req.query.question;
    var section_id = req.query.section;
    Section.findOne({id: section_id}).populate('students').exec(function(err, section) {

      var ios_channels = [];
      var android_channels = [];

      section.students.forEach(function(student) {
        if(student.deviceType == "ios") {
          ios_channels.push(student.channelID);
        }
        else if(student.deviceType == "android"){
          android_channels.push(student.channelID);
        }
      });


      Question.findOne({id:question_id}).exec(function (err, question) {
        Answer.find({question: question.id}).exec(function(err, answers) {

          var pushInfo = {
            "audience": {},
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
                   "time_limit": question.duration
                 }
               },
               "ios": {
                 "extra": {
                   "question": question.text,
                   "quiz_id": question.quiz,
                   "quest_id": question.id,
                   "type": question.type,
                   "answer0": answers[0].text,
                   "answer1": answers[1].text,
                   "time_limit": question.duration
                 }
               }
            },
            "device_types": "all"
          };

          if(ios_channels.length != 0) {
            pushInfo.audience.ios_channel = ios_channels;
          }

          if(android_channels.length != 0) {
            pushInfo.audience.android_channel = android_channels;
          }

          if(answers.length > 2) {
            pushInfo.notification.android.extra.answer2 = answers[2].text;
            pushInfo.notification.ios.extra.answer2 = answers[2].text;
          }
          if(answers.length > 3) {
            pushInfo.notification.android.extra.answer3 = answers[3].text;
            pushInfo.notification.ios.extra.answer3 = answers[3].text;
          }

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
            console.log("error");
            return res.json({
              hello: 'did it work'
            });
          }
          console.log("created")
          return res.json(studentAnswer);
        });
      });
    });
  }
};
