"use strict";

import React from 'react'
import {Sidebar} from '../partials/Sidebar.js'
import {Header} from '../partials/Header.js'

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      course: {
        id: 1,
        title: "CSCI 201",
        quizzes: [],
        sections: []
      },
      term: "Summer 2015"
    }
  }

  componentDidMount() {
    this.getCourseById(this.state.course.id);
  }

  changeCourse(courseId) {
    this.getCourseById(courseId);
  }

  getCourseById(courseId) {
    console.log("changeCourseId", courseId);
    var me = this;

    $.post("/course/find", { id: courseId })
    .then(function(course) {
      console.log("course", course);
      if(course == undefined) return; // if there are no courses, then there are no sections
      me.setState({ course: course });
    });
  }

  changeTerm(term) {
    console.log("changeTerm", term);
    this.setState({
      term: term
    });
  }

  render() {
    var me = this;
    return (
      <div id="quizzlyApp">
        <Sidebar />
        <Header
          data={this.state}
          changeCourse={this.changeCourse.bind(this)}
          changeTerm={this.changeTerm.bind(this)}
        />
        {React.Children.map(me.props.children, function (child) {
          return React.cloneElement(child, {
            course: me.state.course,
            term: me.state.term
          });
        })}
      </div>
    )
  }
}
