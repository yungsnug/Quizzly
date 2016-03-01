"use strict";

import React from 'react'
import Quiz from '../partials/Quiz.js'
import Modal from '../partials/Modal.js'

export default class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    var data = this.selectCourse(props);
    this.state = {
      course: props.course,
      quizzes: data.quizzes,
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
    console.log("Adding quiz '" +  quiz.title + "' in course " + this.props.courseId);
    var quizzes = this.state.quizzes;
    var quiz = {
      title: quiz.title,
      questions: []
    };
    quizzes.push(quiz);
    this.setState({quizzes: quizzes});
    this.closeModal();
  }

  addQuestionToQuiz(question, quizIndex) {
    if(question.text.trim().length == 0) return;

    console.log("Adding question '" +  question.text + "' in quiz " + this.state.quizzes[quizIndex].title);
    var quizzes = this.state.quizzes;
    var question = {
      text: question.text
    };
    quizzes[quizIndex].questions.push(question);
    this.setState({quizzes: quizzes});
    this.closeModal();
  }

  selectCourse(props) {
    var data = {};
    switch(props.course.id) {
      case 1:
        data.quizzes = quizzes201;
        break;
      case 2:
        data.quizzes = quizzes104;
        break;
    }
    return data;
  }

  render() {
    return (
      <div>
        <div id="quizzes" className="p20 quizzlyContent">
          {this.state.quizzes.map(function(quiz, i) {
            return (
              <Quiz quiz={quiz} key={i} ref={'quiz' + i} quizIndex={i} addQuestionModal={this.addQuestionModal.bind(this)} />
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
