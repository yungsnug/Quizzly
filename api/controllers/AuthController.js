/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  user: function(req, res) {
    console.log("req.session", req.session);
    if(req.session.user) {
      console.log("session is set");
      return req.session.user;
    } else {
      console.log("session isn't set");
    }
  }
};
