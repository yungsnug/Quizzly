"use strict";

import React from 'react'
import StudentQuiz from '../partials/StudentQuiz.js'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentQuizzes: [{title: "", studentAnswers: [], course: 0, id: 0}],
      showModal: false,
      modalInfo: {
        modalType: "ADD_QUIZ",
        title: "Add Quiz",
        index: -1
      }
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props);
    this.getQuizzesFromCourseId(this.props.course.id);
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps");
    console.log(newProps);
    this.getQuizzesFromCourseId(newProps.course.id);
  }

  getQuizzesFromCourseId(courseId) {
    var me = this;
    // $.post("/quiz/find", { course: courseId })
    // .then(function(studentQuizzes) {
    //   console.log("studentQuizzes", studentQuizzes);
    //   if(studentQuizzes == undefined) return; // if there are no courses, then there are no sections
    //   me.setState({studentQuizzes: studentQuizzes});
    // });
    if(this.props.student == undefined) {
      return;
    }
    var quizIds = [];
    var studentAnswers = [];
    $.post('/studentanswer/find', {course: courseId, student: this.props.student.id})
    .then(function(studentAnswersResponse) {
      // console.log("studentAnswers", studentAnswers);
      studentAnswers = studentAnswersResponse;
      studentAnswers.map(function(studentAnswer) {
        quizIds.push(studentAnswer.quiz.id);
      });
      console.log(quizIds);

      quizIds = Utility.removeDuplicates(quizIds);
      console.log(quizIds);
      return $.post('/quiz/getQuizzesByQuizIds', {quizIds: quizIds});
    })
    .then(function(quizzes) {
      console.log("quizzes", quizzes);
      console.log("studentAnswers", studentAnswers);
      quizzes.map(function(quiz) {
        quiz.studentAnswers = [];
        return quiz;
      });

      studentAnswers.map(function(studentAnswer) {
        quizzes.map(function(quiz) {
          if(studentAnswer.quiz.id == quiz.id) {
            return quiz.studentAnswers.push(studentAnswer);
          }
        });
      });
      console.log("new quizzes", quizzes);
      me.setState({studentQuizzes: quizzes});
    });
  }

  render() {
    return (
      <div>
        <div id="quizzes" className="p20 quizzlyContent">
          {this.state.studentQuizzes.map(function(studentQuiz, studentQuizIndex) {
            return (
              <StudentQuiz
                studentQuiz={studentQuiz}
                key={studentQuizIndex}
                studentQuizIndex={studentQuizIndex}
              />
            );
          }, this)}
        </div>
      </div>
    );
  }
}
