"use strict";

import React from 'react'
import Quiz from '../partials/Quiz.js'
import Modal from '../partials/Modal.js'

var Promise = require('bluebird');

export default class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    console.log("quizzes", props.course.quizzes);
    this.state = {
      quizzes: [{title: "", questions: [], course: 0, id: 0}],
      showModal: false,
      modalInfo: {
        modalType: "ADD_QUIZ",
        title: "Add Quiz",
        index: -1
      }
    };
  }

  componentDidMount() {
    this.getQuizzesFromCourseId(this.props.course.id);
  }

  componentWillReceiveProps(newProps) {
    this.getQuizzesFromCourseId(newProps.course.id);
  }

  getQuizzesFromCourseId(courseId) {
    var me = this;
      $.post("/quiz/find", { course: courseId })
      .then(function(quizzes) {
        console.log("quizzes", quizzes);

        if(quizzes == undefined) return; // if there are no courses, then there are no sections
        me.setState({
          quizzes: quizzes
        });
      });
  }

  showQuizModal(quizIndex) {
    var modalInfo = this.state.modalInfo;
    modalInfo.title = "Add Quiz";
    modalInfo.modalType = "ADD_QUIZ";
    modalInfo.quizIndex = quizIndex;
    this.setState({
      showModal: true,
      modalInfo: modalInfo
    });
  }

  showQuestionModal(quizIndex, questionIndex) {
    var quiz = this.state.quizzes[quizIndex];
    var modalInfo = this.state.modalInfo;
    modalInfo.title = "Editing question in " + quiz.title;
    modalInfo.modalType = "ADD_QUESTION";
    modalInfo.quizIndex = quizIndex;
    modalInfo.questionIndex = questionIndex;
    this.setState({
      showModal: true,
      modalInfo: modalInfo
    });
  }

  showQuestionInModal(quizIndex, questionIndex) {
    this.showQuestionModal(quizIndex, questionIndex);
  }

  closeModal() {
    this.setState({showModal: false});
  }

  addQuizToCourse(quiz, quizIndex) {
    console.log("Adding quiz '" +  quiz.title + "' in course " + this.props.course.title);
    var me = this;
    if(quizIndex > -1) {
      $.post('/quiz/update/' + quiz.id, { title: quiz.title })
      .then(function(quiz) {
        console.log(quiz);
        var quizzes = me.state.quizzes;
        quizzes[quizIndex] = quiz;
        me.setState({quizzes: quizzes});
        me.closeModal();
      });
    } else {
      $.post('/quiz/create/', { title: quiz.title, course: me.props.course.id })
      .then(function(quiz) {
        console.log(quiz);
        quiz.questions = [];
        var quizzes = me.state.quizzes;
        quizzes.push(quiz);

        me.setState({quizzes: quizzes});
        me.closeModal();
      });
    }
  }

  addQuestionToQuiz(question, quizIndex, questionIndex) {
    if(questionIndex > -1) {
      this.updateQuestion(question, quizIndex, questionIndex);
    } else {
      this.createQuestion(question, quizIndex, questionIndex);
    }
  }

  updateQuestion(question, quizIndex, questionIndex) {
    var quizzes = this.state.quizzes;
    var me = this;
    $.post('/question/update/' + question.id, {text: question.text, type: question.type, duration: question.duration})
    .then(function(question) {
      quizzes[quizIndex].questions[questionIndex] = question;
      me.setState({quizzes: quizzes});
    })
    .then(function() {
      Promise.each(question.answers, function(answer) {
        if(answer.id == undefined && answer.text.length == 0) {
          return $.when(null);
        } else if(answer.id == undefined) {
          return me.crudAnswer('create', answer, question);
        } else if(answer.text.length == 0) {
          return $.post('/answer/destroy/' + answer.id);
        } else {
          return me.crudAnswer('update', answer, question);
        }
      })
      .then(function() {
        me.closeModal();
      });
    });
  }

  createQuestion(question, quizIndex, questionIndex) {
    var quizzes = this.state.quizzes;
    var me = this;

    for(var i = 0; i < question.answers.length; ++i) { // this removes empty answers from the array
      if(question.answers[i].text.length == 0) {
        question.answers.splice(i, 1);
        --i;
      }
    }

    $.post('/question/create', {text: question.text, type: question.type, quiz: quizzes[quizIndex].id, answers: question.answers, duration: question.duration})
    .then(function(createdQuestion) {
      quizzes[quizIndex].questions.push(createdQuestion);
      me.setState({quizzes: quizzes});
      me.closeModal();
    });
  }

  crudAnswer(operation, answer, question) {
    var route = '';
    route = operation == 'create' ? '/answer/create' : '/answer/update/' + answer.id;
    switch(operation) {
      case 'create':
        route = '/answer/create';
        break;
      case 'update':
        route = '/answer/update/' + answer.id;
        break;
    }
    console.log("this is the route", route);
    return $.post(route, {
      text: answer.text,
      correct: answer.correct,
      option: answer.option,
      question: question.id
    });
  }

  deleteQuizFromCourse(quizIndex) {
    var me = this;
    var quizzes = this.state.quizzes;
    $.post('/quiz/destroy/' + quizzes[quizIndex].id)
    .then(function() {
      var questions = quizzes[quizIndex].questions;
      if(questions.length == 0) return $.when(null);
      var answerIds = [];
      var questionIds = [];
      questions.map(function(question){
        questionIds.push(question.id);
        if(question.answers != undefined) {
          question.answers.map(function(answer) {answerIds.push(answer.id);});
        }
      });
      return $.when(
        $.post('/question/multidestroy', {ids: questionIds}),
        $.post('/answer/multidestroy', {ids: answerIds})
      );
    })
    .then(function() {
      quizzes.splice(quizIndex, 1);
      me.setState({quizzes: quizzes});
      me.closeModal();
    });
  }

  deleteQuestionFromQuiz(quizIndex, questionIndex) {
    var me = this;
    var quizzes = this.state.quizzes;
    var question = quizzes[quizIndex].questions[questionIndex];
    $.post('/question/destroy', {id: question.id})
    .then(function() {
      console.log("deleting", question);
      var answerIds = [];
      if(question.answers != undefined) {
        answerIds = question.answers.map(function(answer){return answer.id;});
        return $.post('/answer/multidestroy', {ids: answerIds});
      }
      return $.when(null);
    })
    .then(function() {
      quizzes[quizIndex].questions.splice(questionIndex, 1);
      me.setState({quizzes: quizzes});
      me.closeModal();
    });
  }

  askQuestion(quizIndex, questionIndex, sectionId) {
    var question = this.state.quizzes[quizIndex].questions[questionIndex];
    return $.post('/question/askWithSection/', {question: question.id, section: sectionId})
    .then(function() {
      console.log("asked question success!");
    });
  }

  render() {
    return (
      <div>
        <div id="quizzes" className="p20 quizzlyContent">
          {this.state.quizzes.map(function(quiz, i) {
            return (
              <Quiz
                quiz={quiz}
                key={i}
                quizIndex={i}
                deleteQuizFromCourse={this.deleteQuizFromCourse.bind(this)}
                deleteQuestionFromQuiz={this.deleteQuestionFromQuiz.bind(this)}
                showQuestionModal={this.showQuestionModal.bind(this)}
                showQuestionInModal={this.showQuestionInModal.bind(this)}
                showQuizModal={this.showQuizModal.bind(this)}
                askQuestion={this.askQuestion.bind(this)}
              />
            );
          }, this)}
          <div className="addEntityButton" onClick={this.showQuizModal.bind(this, -1)}>+</div>
        </div>
        {(() => {
          if(this.state.showModal)
            return (
              <Modal
                modalInfo={this.state.modalInfo}
                quizzes={this.state.quizzes}
                key={this.state.showModal}
                closeModal={this.closeModal.bind(this)}
                addQuizToCourse={this.addQuizToCourse.bind(this)}
                addQuestionToQuiz={this.addQuestionToQuiz.bind(this)}
              />
            );
        })()}
      </div>
    );
  }
}
