"use strict";

import React from 'react'
import Quiz from '../partials/Quiz.js'
import Modal from '../partials/Modal.js'

var quizzes201 = [
  {
    title: "Threading",
    questions: [
      {title: "What is threading?"},
      {title: "What is a lock?"},
      {title: "What is a CV?"},
      {title: "What is a mutex?"}
    ]
  },
  {
    title: "OO Programming",
    questions: [
      {title: "What is inheritance?"},
      {title: "What is OO?"},
      {title: "What is a class?"},
      {title: "What is an interface?"},
      {title: "What is Java OO?"},
      {title: "What is C++ OO?"}
    ]
  },
  {
    title: "Programming Languages",
    questions: [
      {title: "What is Python?"},
      {title: "What is a Java?"},
      {title: "What is a C++"},
      {title: "What is a Ada"},
      {title: "What is a Cobol"},
      {title: "What is a Lisp"},
      {title: "What is a Prolog"}
    ]
  },
  {
    title: "Javascript",
    questions: [
      {title: "What is AJAX?"},
      {title: "What does AJAX stand for?"},
      {title: "What is synchronous?"},
      {title: "What is var?"},
      {title: "What is == vs ===?"}
    ]
  }
];

var quizzes104 = [
  {
    title: "OO Programming",
    questions: [
      {title: "What is inheritance?"},
      {title: "What is OO?"},
      {title: "What is a class?"},
      {title: "What is an interface?"},
      {title: "What is Java OO?"},
      {title: "What is C++ OO?"}
    ]
  },
  {
    title: "Programming Languages",
    questions: [
      {title: "What is Python?"},
      {title: "What is a Java?"},
      {title: "What is a C++"},
      {title: "What is a Ada"},
      {title: "What is a Cobol"},
      {title: "What is a Lisp"},
      {title: "What is a Prolog"}
    ]
  },
  {
    title: "Javascript",
    questions: [
      {title: "What is AJAX?"},
      {title: "What does AJAX stand for?"},
      {title: "What is synchronous?"},
      {title: "What is var?"},
      {title: "What is == vs ===?"}
    ]
  },
  {
    title: "Threading",
    questions: [
      {title: "What is threading?"},
      {title: "What is a lock?"},
      {title: "What is a CV?"},
      {title: "What is a mutex?"}
    ]
  }
];

export default class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    var data = this.selectCourse(props);
    this.state = {
      quizzes: data.quizzes,
      showModal: false,
      modalInfo: {
        modalType: "ADD_QUIZ",
        title: "Add Quiz",
        index: -1
      }
    };
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
    console.log("Adding quiz '" +  quiz.title + "' in course " + this.props.courseTitle);
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
    if(question.title.trim().length == 0) return;

    console.log("Adding question '" +  question.title + "' in quiz " + this.state.quizzes[quizIndex].title);
    var quizzes = this.state.quizzes;
    var question = {
      title: question.title
    };
    quizzes[quizIndex].questions.push(question);
    this.setState({quizzes: quizzes});
    this.closeModal();
  }

  selectCourse(props) {
    var data = {};
    switch(props.courseTitle) {
      case "CSCI 201":
        data.quizzes = quizzes201;
        break;
      case "CSCI 104":
        data.quizzes = quizzes104;
        break;
    }
    return data;
  }

  componentWillReceiveProps(newProps) {
    var data = this.selectCourse(newProps);
    this.setState({
      quizzes: data.quizzes
    });
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
                course={this.props.courseTitle}
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
