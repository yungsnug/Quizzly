/**
 * SectionController
 *
 * @description :: Server-side logic for managing Sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  destroySectionsByIds: function(req, res) {
    var data = req.params.all();
    Section.destroy({id: data.ids}).exec(function(err, sections) {
      res.json(sections);
    });
  },
  getSectionByStudentAndCourse: function(req, res) { // needs {courseId, studentId}
    var data = req.params.all();

    Section.find({course: data.courseId}).populate("students").exec(function(err, sections) {
      var section = {};
      for(var i = 0; i < sections.length; ++i) {
        for(var j = 0; j < sections[i].students.length; ++j) {
          if(sections[i].students[j].id == data.studentId) {
            section = sections[i];
            break;
          }
        }
      }
      res.json(section);
    });
  },
  updateStudents: function(req, res) {
    var data = req.params.all();
    Section.update({id: data.sectionId}, {students: data.studentIds}).exec(function(err, section) {
      return Section.findOne({id: data.sectionId}).populate('students').exec(function(err, section) {
        res.json(section);
      });
    })
  }
};
