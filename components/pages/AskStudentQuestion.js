"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {
        answers: [],
        text: "",
        type: "multipleChoice",
        quiz: {}
      },
      selectedAnswer: {},
      freeResponseAnswer: ""
    };
  }

  componentDidMount() {
    this.getQustionFromUrl();
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps");
  }

  getQustionFromUrl() {
    var me = this;
    var array = window.location.pathname.split('/');
    var questionId = array[3];
    return $.post('/question/find/' + questionId)
    .then(function(question) {
      console.log(question);
      question.answers = me.resetSelectedAnswers(question.answers);
      me.setState({question: question});
    });
  }

  handleSelectedAnswer(answerIndex) {
    var question = this.state.question;
    question.answers = this.resetSelectedAnswers(question.answers);
    question.answers[answerIndex].isSelected = true;
    this.setState({
      question: question,
      selectedAnswer: question.answers[answerIndex]
    });
  }

  handleFreeResponseChange(e) {
    var freeResponseAnswer = e.target.value;
    this.setState({freeResponseAnswer: freeResponseAnswer});
  }

  resetSelectedAnswers(answers) {
    for(var i = 0; i < answers.length; ++i) {
      answers[i].isSelected = false;
    }
    return answers;
  }

  submitAnswer() {
    console.log("submitting answer!");
  }

  render() {
    var me = this;
    return (
      <div id="studentQuestionContainer">
        <div>
          <img id="logo" src={LOGO_IMAGE_PATH} />
          <span id="timer">34</span>
        </div>

        <div id="studentQuestion">
          <div className="quizTitle">{(this.state.question.quiz.title + "").toUpperCase()}</div>
          <div className="question">{this.state.question.text}</div>
          <div className="questionBorder"></div>
          {(() => {
            switch(this.state.question.type) {
              case "multipleChoice":
                return this.state.question.answers.map(function(answer, answerIndex) {
                  return (
                    <div className="row answerRow" key={answerIndex}>
                      <div className="columns one pt10">{answer.option + ".)"}</div>
                      <div className="columns eleven">
                        <div className={"answer" + (answer.isSelected ? " selected" : "")} onClick={me.handleSelectedAnswer.bind(me, answerIndex)}>{answer.text}</div>
                      </div>
                    </div>
                  );
                });
                break;
              case "freeResponse":
                return (
                  <div className="pl20 pr20">
                    <textarea
                      className="freeResponse"
                      value={me.state.freeResponseAnswer}
                      onChange={me.handleFreeResponseChange.bind(me)}
                    />
                    <div className="charCount">{me.state.freeResponseAnswer.length}</div>
                  </div>
                );
                break;
            }
          })()}

          <div className="submit" onClick={this.submitAnswer.bind(this)}>SUBMIT</div>
        </div>
      </div>
    );
  }
}
