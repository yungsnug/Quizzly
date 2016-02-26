"use strict";

import React from 'react'
import {Sidebar} from '../partials/Sidebar.js'
import {Header} from '../partials/Header.js'

import { Link } from 'react-router'

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseTitle: "CSCI 201",
      term: "Summer 2015"
    }
  }

  changeCourse(courseTitle) {
    console.log("changeCourse", courseTitle);
    this.setState({
      courseTitle: courseTitle
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
            courseTitle: me.state.courseTitle,
            term: me.state.term
          });
        })}
      </div>
    )
  }
}
