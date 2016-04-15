"use strict";

import React from 'react'

export default class AddQuestionBody extends React.Component {
  constructor(props) {
    super(props);
    var question = {
      type: "multipleChoice",
      duration: 30,
      text: "",
      answers: [
        {option: "A", text: "", correct: false},
        {option: "B", text: "", correct: false},
        {option: "C", text: "", correct: false}
      ]
    };

    this.state = {
      isFreeResponse: false,
      question: question,
      showHelperMessage: false
    };
  }

  componentWillMount() {
    var me = this;
    var question = this.props.quizzes[this.props.quizIndex].questions[this.props.questionIndex];
    console.log("isFreeResponse", this.state.isFreeResponse);
    if(question == undefined) {
      return;
    }

    $.post('/question/find/' + question.id)
    .then(function(question) {
      console.log("AddQuestionBody::question", question);
      if(question.answers.length == 0) {
        question.answers = [
          {option: "A", text: "", correct: false},
          {option: "B", text: "", correct: false},
          {option: "C", text: "", correct: false}
        ];
      }
      me.setState({
        question: question,
        isFreeResponse: question.type == "freeResponse" ? true : false,
      });
    });
  }

  handleChange(i, event) {
    var me = this;
    var question = this.state.question;
    if(i == 'question') {
      question.text = event.target.value;
    } else if(i == 'duration') {
      question.duration = event.target.value;
    } else {
      question.answers[i].text = event.target.value;
    }

    this.setState({question: question});
  }

  addQuestion() {
    var answers = this.state.question.answers;
    var option = String.fromCharCode(answers[answers.length - 1].option.charCodeAt() + 1);
    var answer = {option: option, text: "", correct: false};
    answers.push(answer);
    this.setState({answers: answers});
  }

  showFreeResponse() {
    var question = this.state.question;
    question.type = "freeResponse";
    this.setState({
      isFreeResponse: true,
      question: question
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
    this.setState({showHelperMessage: false});
    var question = this.state.question;
    question.answers.map(function(answer) { return answer.correct = false });
    question.answers[answerIndex].correct = true;
    this.setState({question: question});
  }

  addQuestionToQuiz(question, quizIndex, questionIndex) {
    if(question.text.trim().length == 0) return;
    console.log("is free response", this.state.isFreeResponse);
    if(this.state.isFreeResponse) {
      this.props.addQuestionToQuiz(question, quizIndex, questionIndex);
    } else if(!this.correctAnswerIsSet(question)) {
      this.setState({showHelperMessage: true});
      return;
    } else {
      this.props.addQuestionToQuiz(question, quizIndex, questionIndex);
    }

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
    var questionAnswer = (
      <div className="flex mb20 flexVertical">
        <input
          type="text"
          className="addCourseInput"
          placeholder="Question..."
          value={this.state.question.text}
          onChange={this.handleChange.bind(this, 'question')}
        />
        <div className="nowrap mr10 ml10">Time Limit</div>
        <input
          type="number"
          className="addCourseInput alignC"
          value={this.state.question.duration}
          min="1"
          onChange={this.handleChange.bind(this, 'duration')}
          style={{maxWidth: "50px"}}
        />
      </div>
    );

    var answers = null;
    if(!this.state.isFreeResponse) {
      answers = this.state.question.answers.map(function(answer, answerIndex) {
        return (
          <div className="flex mb20 flexVertical" key={answerIndex}>
            <span className="mr15 greenButton" onClick={me.setAsCorrectAnswer.bind(me, answerIndex)}>{answer.option}.)</span>
            <input
              type="text"
              className={"addCourseInput " + (answer.correct ? "lightGreenBackground" : "")}
              value={answer.text}
              placeholder="Option..."
              onChange={me.handleChange.bind(me, answerIndex)}
            />
          </div>
        );
      });
    }

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
          {answers}
        </div>
        {this.state.showHelperMessage && !this.state.isFreeResponse? <div className="small alignC pb20 red">Please indicate a correct answer</div> : null}
        <div className="pb20 pl20 pr20">
          <div className="modalButton" onClick={this.addQuestionToQuiz.bind(this, this.state.question, this.props.quizIndex, this.props.questionIndex)}>SAVE QUESTION</div>
        </div>
        {footer}
      </div>
    );
  }
}
