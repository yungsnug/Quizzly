"use strict";

import React from 'react'

export default class AddQuizBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: {title: "", placeholder: "Quiz title..."}
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
            <span className="mr15" style={{"width": "94px"}}>Quiz title</span>
            <input
              type="text"
              className="addCourseInput"
              placeholder={this.state.quiz.placeholder}
              value={this.state.quiz.title}
              onChange={this.handleChange.bind(this, 'quiz')}
            />
            <div className="plusButton ml15" onClick={this.props.addQuizToCourse.bind(this, me.state.quiz)}>+</div>
          </div>
        </div>
      </div>
    );
  }
}
