/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  '/': {
    view: 'app'
  },
  '/entrance': {
    view: 'app'
  },
  '/style': {
    view: 'app'
  },
  '/p/courses': {
    view: 'app'
  },
  '/p/quizzes': {
    view: 'app'
  },
  '/p/metrics': {
    view: 'app'
  },
  '/s/quizzes': {
    view: 'app'
  },
  '/s/metrics': {
    view: 'app'
  },
  '/s/question/:id': {
    view: 'app'
  },
  'post /login': 'AuthController.login',
  'post /logout': 'AuthController.logout',
  'post /signup': 'AuthController.signup',
  'post /session': 'AuthController.session',
  // 'post /user': 'AuthController.user',
  'post /courses/student/:id': 'StudentController.getStudentCourses',
  'post /course/multifind': 'CourseController.findCoursesByIds'
};
