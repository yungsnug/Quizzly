"use strict";

import React from 'react'
import StudentQuiz from '../partials/StudentQuiz.js'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentQuizzes: [{title: "", questions: [], course: 0, id: 0}],
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
    this.getQuizzesFromCourseId(this.props.course.id);
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps");
    this.getQuizzesFromCourseId(newProps.course.id);
  }

  getQuizzesFromCourseId(courseId) {
    var me = this;
      $.post("/quiz/find", { course: courseId })
      .then(function(studentQuizzes) {
        console.log("studentQuizzes", studentQuizzes);
        if(studentQuizzes == undefined) return; // if there are no courses, then there are no sections
        me.setState({studentQuizzes: studentQuizzes});
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
