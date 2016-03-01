"use strict";

import React from 'react'
import Link from 'react-router'

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.data.course,
      term: props.data.term
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

  render() {
    return (
      <div id="quizzlyHeader" className="lightBlueBackground borderBottom flexVertical" style={{"height": "57px"}}>
        <div className="ml10">
          <select value={this.state.course.id} className="dropdown mr10" onChange={this.changeCourse.bind(this)}>
            <option value="1">CSCI 201</option>
            <option value="2">CSCI 104</option>
          </select>
          <select value={this.state.term} className="dropdown" onChange={this.changeTerm.bind(this)}>
            <option value="Fall 2016">Fall 2016</option>
            <option value="Summer 2015">Summer 2015</option>
            <option value="Spring 2015">Spring 2015</option>
            <option value="Fall 2015">Fall 2015</option>
          </select>
        </div>
        <div className="flexVertical" style={{"marginLeft":"auto"}}>
          <a href="#">Settings</a>
          <a className="ml30" href="#">Terms &amp; Services</a>
          <a className="ml30" href="#">Contact</a>
          <a className="ml30" href="#">About</a>
          <div className="ml30">
            <Link to="/entrance">Log Out</Link>
          </div>
          <div className="ml30 mr10 circle avatar"></div>
        </div>
      </div>
    )
  }
}
