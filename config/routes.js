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
  '/studentlist': {
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
  '/p/upload': {
    view: 'app'
  },
  '/p/download': {
    view: 'app'
  },
  '/s/quizzes': {
    view: 'app'
  },
  '/s/metrics': {
    view: 'app'
  },
  '/s/question/:questionId/:sectionId': {
    view: 'app'
  },
  'post /login': 'AuthController.login',
  'post /logout': 'AuthController.logout',
  'post /signup': 'AuthController.signup',
  'post /session': 'AuthController.session',
  // 'post /user': 'AuthController.user',
  'post /courses/student/:id': 'StudentController.getStudentCourses',
  'post /course/multifind': 'CourseController.findCoursesByIds',

  'post /question/findByCourseId/:id': 'QuestionController.getQuestionsByCourseId',

  'post /quiz/getQuizzesByQuizIds': 'QuizController.getQuizzesByQuizIds',

  'post /student/getStudentsByCourseId/:id': 'StudentController.getStudentsByCourseId',
  'post /student/getStudentsBySectionId/:id': 'StudentController.getStudentsBySectionId',
  'post /student/getStudentCountByAnswerId/:id': 'StudentAnswerController.getStudentCountByAnswerId',
  'post /student/getStudentIdsFromEmails': 'StudentController.getStudentIdsFromEmails',

  'post /section/getSectionByStudentAndCourse': 'SectionController.getSectionByStudentAndCourse',
  'post /section/updateStudents/:sectionId': 'SectionController.updateStudents',

  'post /term/multifind': 'TermController.multifind',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/


  'post /section/multidestroy': 'SectionController.destroySectionsByIds',
  'post /quiz/multidestroy': 'QuizController.destroyQuizzesByIds',
  'post /question/multidestroy': 'QuestionController.destroyQuestionsByIds',
  'post /answer/multidestroy': 'AnswerController.destroyAnswersByIds'
};
