/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findCoursesByIds: function(req, res) {
    var data = req.params.all();
    Course.find({id: data.ids}).exec(function(err, courses) {
      return res.json(courses);
    });
  },
  destroyCoursesByIds: function(req, res) {
    var data = req.params.all();
    Course.destroy({id: data.ids}).exec(function(err, courses) {
      res.json(courses);
    });
  },

  getCourseQuizzes: function(req,res) {
    var data = req.params.all();
    Course.findOne({id: data.id}).populate('quizzes').exec(function(err, course) {
      return res.send(200, course.quizzes);
    });
  },
  getJsonCourseQuizzes: function(req,res) {
    var data = req.params.all();
    Course.findOne({id: data.id}).populate('quizzes').exec(function(err, course) {
      var all_quizzes = [];
      course.quizzes.forEach(function(quiz) {
        var obj = {
          "title": quiz.title,
          "id": quiz.id
        };
        all_quizzes.push(obj);
      });
      return res.json({quizzes: all_quizzes});
    });
  }
};
