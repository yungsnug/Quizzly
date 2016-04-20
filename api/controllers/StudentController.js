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
    Student.findOne({id: data.id}).populate('sections')
    .exec(function(err, student) {
      console.log("execing with student", student.firstName);
      console.log("student sections", student.sections);
      Promise.each(student.sections, function(section){
        console.log("in promise loop with section...", section);
        return Section.findOne({id: section.id}).then(function(section){
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
        return res.json(courses);
      });
    });
  },

  getStudentCoursesByEmail: function(req, res) {
    var data = req.params.all();
    var courses = [];
    Student.findOne({email: data.user}).populate('sections')
    .exec(function(err, student) {
      console.log("execing with student", student.firstName);
      console.log("student sections", student.sections);
      Promise.each(student.sections, function(section){
        console.log("in promise loop with section...", section);
        return Section.findOne({id: section.id}).then(function(section){
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
        return res.json(courses);
      });
    });
  },

  getStudentsByCourseId: function(req,res) {
    console.log("--------------getStudentsByCourseId");
    var data = req.params.all();
    var students = [];
    // var allStudents= Students.find().populate('sections');
    Section.find({course: data.id}).exec(function (err, sections) {
      // console.log("sections", sections);
      Promise.each(sections,function(section) {
        // console.log("section",section);
        return Student.find().populate('sections').then(function (all_students) {
          // console.log("all_students", all_students);
          return all_students;
        }).then(function(all_students) {
          // console.log("all_students_length", all_students.length);
          return Promise.each(all_students, function(student){
            // console.log("all_students_length", student.sections.length);
            for (i = 0; i < student.sections.length; i++) {
              // console.log("section.id",section.id);
              // console.log("student.sections[i]",student.sections[i]);
              if (student.sections[i].id == section.id) {
                // console.log("YOLO");
                students.push(student);
                return;
              }
            }
          });
        });
      }).then(function() {
        console.log("finished!", students.length);
        // console.log("finished!", students);
        return res.json(students);
      });
    });
  },

  getStudentsBySectionId: function(req,res) {
    console.log("--------------getStudentsBySectionId");
    var data = req.params.all();
    var students = [];
    Student.find().populate('sections').then(function (all_students) {
          // console.log("all_students", all_students);
          return all_students;
        }).then(function(all_students) {
          // console.log("all_students_length", all_students.length);
          return Promise.each(all_students, function(student){
            // console.log("all_students_length", student.sections.length);
            for (i = 0; i < student.sections.length; i++) {
              // console.log("section.id",section.id);
              // console.log("student.sections[i]",student.sections[i]);
              if (student.sections[i].id == data.id) {
                // console.log("YOLO");
                students.push(student);
                return;
              }
            }
          });
        }).then(function() {
        console.log("finished!", students.length);
        // console.log("finished!", students);
        return res.json(students);
      });
  },
  getStudentIdsFromEmails: function(req, res) {
    var data = req.params.all();
    var studentIds = [];

    Promise.each(data.studentEmails, function(studentEmail){
      return Student.findOne({email: studentEmail})
      .then(function(student) {
        if(student != undefined) {
          studentIds.push(student.id);
        }
      });
    })
    .then(function() {
      return res.json(studentIds);
    });
  },
  findinorder: function(req, res) {
    Student.find().sort('createdAt DESC').exec(function (err, students) {
      return res.json(students);
    });
  }
  // getStudentAnswer: function(req,res) {
  //   console.log("--------------getStudentAnswer");
  //   var data = req.params.all();
  //   var courses = [];
  // }
};
