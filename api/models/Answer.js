/**
* Answer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Primitives
  text: {
    type: 'string',
    required: true
  },
  correct: {
    type: 'boolean'
  },
  option: {
    type: 'string',
    enum: ['A', 'B', 'C', 'D', 'E'],
    defaultsTo: 'A'
  },

  // Associations
  question: {
    model: 'question'
  }

  // Methods
};
