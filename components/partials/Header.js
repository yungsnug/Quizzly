"use strict";

import React from 'react'
import {Link} from 'react-router'
import {browserHistory} from 'react-router'

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      term: props.term,
      sections: props.course.sections,
      terms: [],
    }
  }

  changeCourse(event) {
    this.props.changeCourse(event.target.value);
    var course = this.state.course;
    course.id = event.target.value;
    this.setState({
      course: course
    });
  }

  changeTerm(event) {
    this.props.changeTerm(event.target.value);
    this.setState({
      term: event.target.value
    });
  }

  handleLogout() {
    console.log("trying to logout");
    $.post("/logout")
    .then(function() {
      console.log("user successfully logged out");
      browserHistory.push('/entrance');
    })
    .fail(function() {
      console.log("logout failed");
    });
  }

  render() {
    return (
      <div id="quizzlyHeader" className="lightBlueBackground borderBottom flexVertical" style={{"height": "57px"}}>
        <div className="ml10">
          <select value={this.state.course.id} className="dropdown mr10" onChange={this.changeCourse.bind(this)}>
            {this.props.user.courses.map(function(course, courseIndex) {
              return <option key={courseIndex} value={course.id}>{course.title}</option>
            })}
          </select>
          <select value={this.state.term} className="dropdown" onChange={this.changeTerm.bind(this)}>
            <option value="Fall 2016">Fall 2016</option>
            <option value="Summer 2015">Summer 2015</option>
            <option value="Spring 2015">Spring 2015</option>
            <option value="Fall 2015">Fall 2015</option>
          </select>
        </div>
        <div className="flexVertical" style={{"marginLeft":"auto"}}>
          <a className="ml30 pointer" onClick={this.handleLogout.bind(this)}>Log Out</a>
          <a className="ml30 pointer mr20" onClick={this.props.showProfileModal.bind(this)}>Profile</a>
        </div>
      </div>
    )
  }
}
