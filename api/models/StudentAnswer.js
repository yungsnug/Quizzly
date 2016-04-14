/**
* StudentAnswer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives

    // Associations
    //Student ID (one student -> many answers),
    student: {
      model: 'student'
      },
    //Section ID (one section -> many answers),
    section: {
      model: 'section'
    },

    //Question ID (one question -> one answer),
    question: {
      model: 'question'
    },
    //Answer ID (one answer -> one answer).
    answer: {
      model: 'answer'
    },
    //Quiz ID (one quiz -> many answers)
    quiz: {
      model: 'quiz'
    },
    course: {
      model: 'course'
    },

    text: {
      type: 'string'
    }
    // Methods
  }
};
