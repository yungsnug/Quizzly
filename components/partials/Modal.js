"use strict";

import React from 'react'
import AddCourseBody from '../partials/AddCourseBody.js'
import AddQuizBody from '../partials/AddQuizBody.js'
import AddQuestionBody from '../partials/AddQuestionBody.js'

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: props.showModal,
      modalType: props.modalInfo.modalType,
      title: props.modalInfo.title
    };
  }

  render() {
    var body = {};
    if(this.state.modalType == "ADD_COURSE") {
      body = <AddCourseBody
              addCourseToProfessor={this.props.addCourseToProfessor.bind(this)}
              addSectionToCourse={this.props.addSectionToCourse.bind(this)}/>;
    } else if(this.state.modalType == "ADD_QUIZ") {
      body = <AddQuizBody
              addQuizToCourse={this.props.addQuizToCourse.bind(this)}
              quizIndex={this.props.modalInfo.quizIndex}
              quizzes={this.props.quizzes} />;
    } else if(this.state.modalType == "ADD_QUESTION") {
      body = <AddQuestionBody
              addQuestionToQuiz={this.props.addQuestionToQuiz.bind(this)}
              quizzes={this.props.quizzes}
              quizIndex={this.props.modalInfo.quizIndex}
              questionIndex={this.props.modalInfo.questionIndex} />;
    }

    return (
      <div id="modalContainer">
        <div id="modal">
          <div id="header">
            {this.state.title}
            <span className="floatR pointer" onClick={this.props.closeModal.bind(this)}><img src="images/close.png" style={{"width":"12px"}}/></span>
          </div>
          <div id="body">{body}</div>
        </div>
      </div>
    );
  }
}
