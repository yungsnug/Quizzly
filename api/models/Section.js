/**
* Section.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives
    title: { // '84495' - a CRN number
      type: 'string'
    },

    // Associations
    course: {
      model: 'course'
    },
    students: {
      collection: 'student',
      via: 'section'
    },

    // Methods
  }
};
