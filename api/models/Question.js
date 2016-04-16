/**
* Question.js
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

    text: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['multipleChoice', 'freeResponse'],
      required: true
    },

    duration: {
      type: 'integer'
    },

    // Associations
    quiz: {
      model: 'quiz'
    },
    answers: {
      collection: 'answer',
      via: 'question'
    }

    // Methods
  }
};
