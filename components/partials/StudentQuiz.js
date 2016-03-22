"use strict";

import React from 'react'
import StudentQuestion from '../partials/StudentQuestion.js'

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
            <span className="pointer">{this.props.studentQuiz.title}</span>
            </div>
          <div className="body">
            {this.props.studentQuiz.questions.map(function(studentQuestion, studentQuestionIndex) {
              return (
                <StudentQuestion
                  key={studentQuestionIndex}
                  studentQuizIndex={this.props.studentQuizIndex}
                  studentQuestionIndex={studentQuestionIndex}
                  studentQuestion={studentQuestion}
                />
              );
            }, this)}
          </div>
          <div className="footerButton">3/36</div>
        </div>
      </div>
    );
  }
}
