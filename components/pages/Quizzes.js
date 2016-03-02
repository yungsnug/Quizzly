"use strict";

import React from 'react'
import Quiz from '../partials/Quiz.js'
import Modal from '../partials/Modal.js'

export default class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    console.log("quizzes", props.course.quizzes);
    this.state = {
      course: props.course,
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
    console.log("componentDidMount");
      $.post("/quiz/find", { course: courseId })
      .then(function(quizzes) {
        console.log("quizzes", quizzes);

        if(quizzes == undefined) return; // if there are no courses, then there are no sections
        me.setState({
          quizzes: quizzes
        });
      });
  }

  handleClick(num) {
    console.log("handle clik!", num);
  }

  addQuizModal() {
    var modalInfo = this.state.modalInfo;
    modalInfo.title = "Add Quiz";
    modalInfo.modalType = "ADD_QUIZ";
    this.setState({
      showModal: true,
      modalInfo: modalInfo
    });
  }

  addQuestionModal(quizTitle, quizIndex) {
    var modalInfo = this.state.modalInfo;
    modalInfo.title = "Adding quiz question to: " + quizTitle;
    modalInfo.modalType = "ADD_QUESTION";
    modalInfo.index = quizIndex;
    this.setState({
      showModal: true,
      modalInfo: modalInfo
    });
  }

  closeModal() {
    this.setState({showModal: false});
  }

  addQuizToCourse(quiz) {
    console.log("Adding quiz '" +  quiz.title + "' in course " + this.props.course.title);
    var me = this;
    $.post('quiz/create/',
      {
        title: quiz.title,
        course: me.props.course.id
      }
    ).then(function(quiz) {
      console.log(quiz);
      quiz.questions = [];
      var quizzes = me.state.quizzes;
      quizzes.push(quiz);
      me.setState({quizzes: quizzes});
      me.closeModal();
    });
  }

  addQuestionToQuiz(question, quizIndex) {
    var me = this;
    if(question.text.trim().length == 0) return;

    var quizzes = this.state.quizzes;
    $.post('/question/create', {text: question.text, type: 'freeResponse', quiz: quizzes[quizIndex].id})
    .then(function(question) {
      quizzes[quizIndex].questions.push(question);
      me.setState({quizzes: quizzes});
      me.closeModal();
    });
  }

  deleteQuizFromCourse(quizIndex) {
    var me = this;
    var quizzes = this.state.quizzes;
    $.post('/quiz/destroy', {id: quizzes[quizIndex].id})
    .then(function() {
      var questions = quizzes[quizIndex].questions;
      if(questions.length == 0) return $.when(null);
      var questionIds = [];
      for(var i = 0; i < questions.length; ++i) {
        questionIds.push(questions[i].id);
      }
      return $.post('/question/destroy', {id: questionIds});
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
    $.post('/question/destroy', {id: quizzes[quizIndex].questions[questionIndex].id})
    .then(function() {
      quizzes[quizIndex].questions.splice(questionIndex, 1);
      me.setState({quizzes: quizzes});
      me.closeModal();
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
                addQuestionModal={this.addQuestionModal.bind(this)}
              />
            );
          }, this)}
          <div className="addEntityButton" onClick={this.addQuizModal.bind(this)}>+</div>
        </div>
        {(() => {
          if(this.state.showModal)
            return (
              <Modal
                modalInfo={this.state.modalInfo}
                course={this.props.courseId}
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
