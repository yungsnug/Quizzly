"use strict";

import React from 'react'
import Question from '../partials/Question.js'

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
            <span className="pointer" onClick={this.props.showQuizModal.bind(this, this.props.quizIndex)}>{this.props.quiz.title}</span>
            <span className="floatR pointer" onClick={this.props.deleteQuizFromCourse.bind(this, this.props.quizIndex)}><img src={CLOSE_IMAGE_PATH} style={{"width":"12px"}}/></span>
          </div>
          <div className="body">
            {this.props.quiz.questions.map(function(question, questionIndex) {
              return (
                <Question
                  key={questionIndex}
                  quizIndex={this.props.quizIndex}
                  questionIndex={questionIndex}
                  quiz={this.props.quiz}
                  question={question}
                  showQuestionInModal={this.props.showQuestionInModal.bind(this)}
                  deleteQuestionFromQuiz={this.props.deleteQuestionFromQuiz.bind(this)}
                  askQuestion={this.props.askQuestion.bind(this)}
                />
              );
            }, this)}
          </div>
          <div className="footerButton" onClick={this.props.showQuestionModal.bind(this, this.props.quizIndex, -1)}>+</div>
        </div>
      </div>
    );
  }
}
