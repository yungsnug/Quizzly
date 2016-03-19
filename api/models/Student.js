/**
* Student.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives
    type: {
      type: 'string',
      defaultsTo: 'STUDENT'
    },
    email: {
      type: 'string',
      unique: true
    },
    password: {
      type: 'string'
    },
    studentId: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    school: {
      type: 'string'
    },

    // Associations
    sections: {
      collection: 'section',
      via: 'students'
    },

    // Methods
    getFullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  }
};
