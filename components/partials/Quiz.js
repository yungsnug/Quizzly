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
            {this.props.quiz.questions.map(function(question, questionIndex) {
              return (
                <div key={questionIndex} className="item">
                  <span className="pointer" onClick={this.props.showQuestionInModal.bind(this, this.props.quizIndex, questionIndex)}>{question.text}</span>
                  <span className="floatR pointer opacity40" onClick={this.props.deleteQuestionFromQuiz.bind(this, this.props.quizIndex, questionIndex)}><img src="images/close.png" style={{"width":"8px"}}/></span>
                </div>
              );
            }, this)}
          </div>
          <div className="footerButton" onClick={this.props.showQuestionModal.bind(this, this.props.quizIndex, -1)}>+</div>
        </div>
      </div>
    );
  }
}
