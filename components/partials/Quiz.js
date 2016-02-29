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

  handleClick(num) {
    console.log("Clicked: ", num);
  }

  render() {
    return (
      <div className="mainPanel">
        <div className="scrollRegion">
          <div className="header">{this.props.quiz.title}</div>
          <div className="body">
            {this.props.quiz.questions.map(function(question, i) {
              var boundClick = this.handleClick.bind(this, i);
              return (
                <div onClick={boundClick} key={i} text={question} ref={'question' + i} className="item">{question.text}</div>
              );
            }, this)}
          </div>
          <div className="footerButton" onClick={this.props.addQuestionModal.bind(this, this.props.quiz.title, this.props.quizIndex)}>+</div>
        </div>
      </div>
    );
  }
}
