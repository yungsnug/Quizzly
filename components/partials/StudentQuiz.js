"use strict";

import React from 'react'
import StudentQuestion from '../partials/StudentQuestion.js'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Quiz Title",
      showModal: false,
    };
  }

  calculateCorrectAnswers() {
    var studentAnswers = this.props.studentQuiz.studentAnswers;
    var numCorrect = 0;
    studentAnswers.map(function(studentAnswer) {
      if(studentAnswer.answer == undefined || studentAnswer.answer.correct) {
        numCorrect++;
      }
    });
    return numCorrect;
  }

  render() {
    return (
      <div className="mainPanel">
        <div className="scrollRegion">
          <div className="header">
            <span className="pointer">{this.props.studentQuiz.title}</span>
            </div>
          <div className="body">
            {this.props.studentQuiz.studentAnswers.map(function(studentAnswer, studentAnswerIndex) {
              return (
                <StudentQuestion
                  key={studentAnswerIndex}
                  studentQuizIndex={this.props.studentQuizIndex}
                  studentAnswerIndex={studentAnswerIndex}
                  studentAnswer={studentAnswer}
                  showModal={this.props.showModal.bind(this)}
                />
              );
            }, this)}
          </div>
          <div className="studentFooterButton">{this.calculateCorrectAnswers() + "/" + this.props.studentQuiz.studentAnswers.length}</div>
        </div>
      </div>
    );
  }
}
