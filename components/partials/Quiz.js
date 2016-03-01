"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Quiz Title",
      showModal: false
    };
  }

  render() {
    return (
      <div className="mainPanel">
        <div className="scrollRegion">
          <div className="header">
            {this.props.quiz.title}
            <span className="floatR pointer" onClick={this.props.deleteQuizFromCourse.bind(this, this.props.quizIndex)}><img src="images/close.png" style={{"width":"12px"}}/></span>
            </div>
          <div className="body">
            {this.props.quiz.questions.map(function(question, i) {
              return (
                <div onClick={this.props.deleteQuestionFromQuiz.bind(this, this.props.quizIndex, i)} key={i} text={question} className="item">{question.text}</div>
              );
            }, this)}
          </div>
          <div className="footerButton" onClick={this.props.addQuestionModal.bind(this, this.props.quiz.title, this.props.quizIndex)}>+</div>
        </div>
      </div>
    );
  }
}
