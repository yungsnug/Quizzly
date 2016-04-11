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
      terms: props.terms,
    }
  }

  componentDidMount() {
    var me = this;
    this.setState({
      term: me.props.term,
      terms: me.props.terms,
      course: me.props.course,
      courses: me.props.courses,
    });
  }

  componentWillReceiveProps(nextProps) {
    var me = this;
    this.setState({
      term: nextProps.term,
      terms: nextProps.terms,
      course: nextProps.course,
      courses: nextProps.courses,
    });
  }

  changeCourse(event) {
    this.props.changeCourse(event.target.value);
  }

  changeTerm(event) {
    this.props.changeTerm(event.target.value);
  }

  handleLogout() {
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
        <div>
          <select value={this.state.term.id} className="dropdown ml10" onChange={this.changeTerm.bind(this)}>
            {this.props.terms.map(function(term, termIndex) {
              return <option key={termIndex} value={term.id}>{term.season.season + " " + term.year.year}</option>
            })}
          </select>
          <select value={this.state.course.id} className="dropdown ml10" onChange={this.changeCourse.bind(this)}>
            {this.props.user.courses.map(function(course, courseIndex) {
              if(course.term == this.state.term.id) {
                return <option key={courseIndex} value={course.id}>{course.title}</option>
              }
            }, this)}
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
