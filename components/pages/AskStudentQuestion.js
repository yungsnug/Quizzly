"use strict";

import React from 'react'
import {browserHistory} from 'react-router'

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
      freeResponseAnswer: "",
      user: {}
    };
  }

  componentDidMount() {
    var me = this;
    $.post('/session')
    .then(function(user) {
      me.setState({user: user});
    });
    this.getQuestionFromUrl();
    this.addPusherListener();
  }

  startTimer(duration) {
    var me = this;
    counter = setInterval(timer, 1000); //1000 will  run it every 1 second

    function timer() {
      duration--;
      var question = me.state.question;
      question.duration = duration;
      me.setState({question: question}, function() {
        if (duration <= 0) {
          clearInterval(counter);
          browserHistory.push('/s/quizzes');
          return;
        }
      }.bind(this));

      //Do code for showing the number of seconds here
    }
  }

  // startTimer(duration) {
  //   var me = this;
  //   console.log("starting timer");
  //   var counter = setInterval(me.timer(me), 1000);
  //   me.setState({counter: counter});
  // }
  //
  // timer(me) {
  //   // var me = this;
  //   console.log("inside timer");
  //   var question = me.state.question;
  //   question.duration--;
  //   me.setState({question: question}, function() {
  //     if (me.state.question.duration <= 0) {
  //       clearInterval(me.state.counter);
  //       browserHistory.push('/s/quizzes');
  //       return;
  //     }
  //   }.bind(me));
  //
  //   //Do code for showing the number of seconds here
  // }

  addPusherListener() {
    var me = this;
    var pusher = new Pusher('638c5913fb91435e1b42', {
      encrypted: true
    });

    var channel = pusher.subscribe('test_channel');
    channel.bind('my_event', function(data) {
      console.log("pusher data", data);
      $.post('/section/find/' + data.sectionId)
      .then(function(section) {
        section.students.map(function(student) {
          if(me.state.user.id == student.id) {
            browserHistory.push('/s/question/' + data.questionId + "/" + data.sectionId);
          }
        });
      });
    });
  }

  getQuestionFromUrl() {
    var me = this;
    var array = window.location.pathname.split('/');
    var questionId = array[3];
    return $.post('/question/find/' + questionId)
    .then(function(question) {
      console.log("question", question);
      question.answers = me.resetSelectedAnswers(question.answers);
      me.startTimer(question.duration);
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
    answers.map(function(answer) {
      return answer.isSelected = false;
    });

    return answers;
  }

  getSelectedAnswer() {
    console.log(">>>>>>>>>> selecting answer");
    var question = this.state.question;
    var selectedAnswer = {};
    question.answers.map(function(answer) {
      console.log(">>>>>>>>>> answer in each loop", answer);
      if(answer.isSelected) {
        console.log(">>>>>>>>>> answer that is selected", answer);
        selectedAnswer = answer;
      }
    });
    return selectedAnswer;
  }

  submitAnswer() {
    console.log("submitting answer!");
    var me = this;
    var currentUser = {};
    var quiz = this.state.question.quiz;
    var question = this.state.question;
    var answer = {};
    var student = this.state.user;

    switch (question.type) {
      case 'multipleChoice':
        answer = this.getSelectedAnswer();
        break;
      case 'freeResponse':
        break;
    }

    console.log("??????????? final answer selected", answer);
    $.post('/section/getSectionByStudentAndCourse', {studentId: student.id, courseId: quiz.course})
    .then(function(section) {
      return $.post('/studentanswer/create', {
        student: student.id,
        course: quiz.course,
        section: section.id,
        quiz: quiz.id,
        question: question.id,
        answer: answer.id,
        text: me.state.freeResponseAnswer
      });
    })
    .then(function(studentAnswer) {
      console.log("studentAnswer saved", studentAnswer);
      clearInterval(counter);
      browserHistory.push('/s/quizzes');
    });
  }

  render() {
    var me = this;
    return (
      <div id="studentQuestionContainer">
        <div>
          <img id="logo" src={LOGO_IMAGE_PATH} />
          <span id="timer">{this.state.question.duration}</span>
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

var counter;
