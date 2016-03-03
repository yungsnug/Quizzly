"use strict";

import React from 'react'

export default class AddQuestionBody extends React.Component {
  constructor(props) {
    super(props);
    var question = {
      type: "multipleChoice",
      text: "",
      answers: [
        {option: "A", text: ""},
        {option: "B", text: ""},
        {option: "C", text: ""}
      ]
    };

    if(props.quizzes[props.quizIndex].questions[props.questionIndex] != undefined) {
      question = props.quizzes[props.quizIndex].questions[props.questionIndex];
      question.answers = [];
      console.log("AddQuestionBody::question", question);
    }

    this.state = {
      isFreeResponse: question.type == "freeResponse" ? true : false,
      placeholder: "Question...",
      question: question
    };
  }

  handleChange(i, event) {
    var me = this;
    var question = this.state.question;
    if(i == 'question') {
      question.text = event.target.value;
    } else {
      question.answers[i].text = event.target.value;
    }

    this.setState({question: question});
  }

  addQuestion() {
    var answers = this.state.question.answers;
    var option = String.fromCharCode(answers[answers.length - 1].option.charCodeAt() + 1);
    var answer = {option: option, text: ""};
    answers.push(answer);
    this.setState({answers: answers});
  }

  showFreeResponse() {
    var question = this.state.question;
    question.answers = [];
    this.setState({
      isFreeResponse: true,
      question: question
    });
  }

  showMultipleChoice() {
    var question = this.state.question;
    question.answers = [
      {option: "A", text: ""},
      {option: "B", text: ""},
      {option: "C", text: ""}
    ];
    this.setState({
      isFreeResponse: false,
      question: question
    });
  }

  render() {
    var me = this;
    var questionAnswer = (
      <div className="flex mb20 flexVertical">
        <input
          type="text"
          className="addCourseInput"
          placeholder={this.state.placeholder}
          value={this.state.question.text}
          onChange={this.handleChange.bind(this, 'question')}
        />
      </div>
    );

    var footer = this.state.isFreeResponse ? null : <div className="footerButton" onClick={this.addQuestion.bind(this)} >+</div>;
    return (
      <div id="addQuestionBody">
        <div className="row">
          <div className="six columns p20 pr10">
            <div className={"modalButton " + (this.state.isFreeResponse ? "opacity40" : "")} onClick={this.showMultipleChoice.bind(this)}>MULTIPLE CHOICE</div>
          </div>
          <div className="six columns p20 pl10">
            <div className={"modalButton " + (this.state.isFreeResponse ? "" : "opacity40")} onClick={this.showFreeResponse.bind(this)}>FREE RESPONSE</div>
          </div>
        </div>
        <div className="pl20 pr20">
          {questionAnswer}
          {this.state.question.answers.map(function(answer, i) {
            return (
              <div className="flex mb20 flexVertical">
                <span className="mr15">{answer.option}.)</span>
                <input
                  type="text"
                  className="addCourseInput"
                  value={answer.text}
                  onChange={me.handleChange.bind(me, i)}
                  key={i}
                />
              </div>
            );
          })}
        </div>
        <div className="pb20 pl20 pr20">
          <div className="modalButton" onClick={this.props.addQuestionToQuiz.bind(this, this.state.question, this.props.quizIndex, this.props.questionIndex)}>SAVE QUESTION</div>
        </div>
        {footer}
      </div>
    );
  }
}
