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
      res.json(courses);
    });
  }
};
