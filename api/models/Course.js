/**
* Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Primitives
  attributes: {
    title: { // 'CSCI 201'
      type: 'string'
    },
    professor: {
      model: 'professor'
    },

    // Associations
    quizzes: {
      collection: 'quiz',
      via: 'course'
    },
    sections: {
      collection: 'section',
      via: 'course'
    }

    // Methods
  }
};
