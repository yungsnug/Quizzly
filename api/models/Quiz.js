/**
* Quiz.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives
    title: {
      type: 'string'
    },

    // Associations
    course: {
      model: 'course'
    },
    questions: {
      collection: 'question',
      via: 'quiz'
    }

    // Methods
  }
};
