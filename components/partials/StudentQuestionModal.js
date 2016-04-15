"use strict";

import React from 'react'

export default class StudentQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    var question = props.question;
    question.answers = [];

    this.state = {
      isFreeResponse: false,
      question: question,
    };
  }

  componentWillMount() {
    var me = this;
    if(this.state.question == undefined) {
      return;
    }

    $.post('/question/find/' + this.state.question.id)
    .then(function(question) {
      console.log("StudentQuestionModal::question", question);
      me.setState({
        question: question,
        isFreeResponse: question.type == "freeResponse" ? true : false,
      });
    });
  }

  showMultipleChoice() {
    var question = this.state.question;
    question.type = "multipleChoice";
    this.setState({
      isFreeResponse: false,
      question: question
    });
  }

  setAsCorrectAnswer(answerIndex) {
    var question = this.state.question;
    question.answers.map(function(answer) { return answer.correct = false });
    question.answers[answerIndex].correct = true;
    this.setState({question: question});
  }

  correctAnswerIsSet(question) {
    var correctAnswerIsSet = false;
    question.answers.map(function(answer) {
      if(answer.correct) {
        correctAnswerIsSet = true;
      }
    });

    return correctAnswerIsSet;
  }

  render() {
    var me = this;

    return (
      <div id="modalContainer">
        <div id="modal">
          <div id="header">
            Your Question
            <span className="floatR pointer" onClick={this.props.closeModal.bind(this)}><img src={CLOSE_IMAGE_PATH} style={{"width":"12px"}}/></span>
          </div>
          <div id="body">
            <div id="addQuestionBody">
              <div className="p20">
                <div className="flex mb20 flexVertical">
                  <input
                    type="text"
                    className="addCourseInput"
                    placeholder="Question..."
                    value={this.state.question.text}
                    disabled={true}
                  />
                </div>
                {this.state.question.answers.map(function(answer, answerIndex) {
                  return (
                    <div className="flex mb20 flexVertical" key={answerIndex}>
                      <span className="mr15 greenButton" onClick={me.setAsCorrectAnswer.bind(me, answerIndex)}>{answer.option}.)</span>
                      <input
                        type="text"
                        className={"addCourseInput " + (answer.correct ? "lightGreenBackground" : "")}
                        value={answer.text}
                        placeholder="Option..."
                        disabled={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
