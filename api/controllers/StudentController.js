/**
 * StudentController
 *
 * @description :: Server-side logic for managing Students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {
  getStudentCourses: function(req, res) {
    console.log("--------------getStudentCourses");
    var data = req.params.all();
    var courses = [];
    Student.findOne({id: data.id})
    .exec(function(err, student) {
      console.log("execing with student", student.firstName);
      student.sections = [];
      student.sections.push(student.section);
      student.sections.push(2);
      student.sections.push(6);
      Promise.each(student.sections, function(section){
        console.log("in promise loop with section...", section);
        return Section.findOne({id: section}).then(function(section){
          console.log("section", section.title);
          return section;
        }).then(function(section) {
          return Course.findOne({id: section.course}).then(function(course){
            console.log("course", course.title);
            courses.push(course);
          });
        });
      })
      .then(function() {
        console.log("finished!", courses.length);
        console.log("finished!", courses);
        res.json(courses);
      });
    });
  }
};
