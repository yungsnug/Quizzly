/**
* Professor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives
    id: {
   type: 'integer',
   autoIncrement: true,
   primaryKey: true,
   unique: true
    },
    type: {
      type: 'string',
      defaultsTo: 'PROFESSOR'
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string'
    },
    facultyId: {
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
    courses: {
      collection: 'course',
      via: 'professor'
    },

    // Methods
    getFullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  }
};
