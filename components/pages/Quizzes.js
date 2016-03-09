"use strict";

import React from 'react'
import Quiz from '../partials/Quiz.js'
import Modal from '../partials/Modal.js'

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
      $.post('quiz/update/' + quiz.id, { title: quiz.title })
      .then(function(quiz) {
        console.log(quiz);
        var quizzes = me.state.quizzes;
        quizzes[quizIndex] = quiz;
        me.setState({quizzes: quizzes});
        me.closeModal();
      });
    } else {
      $.post('quiz/create/', { title: quiz.title, course: me.props.course.id })
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
    var me = this;
    if(question.text.trim().length == 0) return;

    var quizzes = this.state.quizzes;
    if(questionIndex > -1) {
      $.post('/question/update/' + question.id, {text: question.text, type: question.type})
      .then(function(question) {
        quizzes[quizIndex].questions[questionIndex] = question;
        me.setState({quizzes: quizzes});
        me.closeModal();
      });
    } else {
      $.post('/question/create', {text: question.text, type: question.type, quiz: quizzes[quizIndex].id})
      .then(function(question) {
        quizzes[quizIndex].questions.push(question);
        me.setState({quizzes: quizzes});
        me.closeModal();
      });
    }
  }

  deleteQuizFromCourse(quizIndex) {
    var me = this;
    var quizzes = this.state.quizzes;
    $.post('/quiz/destroy/' + quizzes[quizIndex].id)
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

  askQuestion(quizIndex, questionIndex) {
    var question = quizzes[quizIndex].questions[questionIndex];
    $.post('question/ask/', { id: question.id })
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
