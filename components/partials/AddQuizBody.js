"use strict";

import React from 'react'

export default class AddQuizBody extends React.Component {
  constructor(props) {
    super(props);
    var quiz = {title: ""};
    console.log("got here 1", props.quizIndex);
    if(props.quizIndex > -1) {
      console.log("got here 2");
      quiz = props.quizzes[props.quizIndex];
    }

    console.log("quiz??", quiz);
    this.state = {
      quiz: quiz
    };
  }

  handleChange(key, event) {
    var state = this.state;
    state[key].title = event.target.value;
    this.setState({quiz: state.quiz});
  }

  render() {
    var me = this;
    return (
      <div id="addQuizBody">
        <div className="p20">
          <div className="flexVertical">
            <span className="mr15" style={{"width":"94px"}}>Quiz title</span>
            <input
              type="text"
              className="addCourseInput"
              placeholder="Quiz title..."
              value={this.state.quiz.title}
              onChange={this.handleChange.bind(this, 'quiz')}
            />
            <div className="plusButton ml15" onClick={this.props.addQuizToCourse.bind(this, me.state.quiz, me.props.quizIndex)}>+</div>
          </div>
        </div>
      </div>
    );
  }
}
