"use strict";

import React from 'react'
import {browserHistory} from 'react-router'

export default class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: []
    };
  }

  componentWillMount() {
    var me = this;
    $.post('/student/findinorder')
    .then(function(students) {
      console.log("students", students);
      me.setState({students: students});
    });
  }

  render() {
    var me = this;
    return (
      <div>
        {this.state.students.map(function(student) {
          return(
            <div className="row">
              {/*<div className="columns three">
                {student.firstName} {student.lastName}
              </div>*/}
              <div className="columns three">
                {student.email}
              </div>
            </div>
          );
        }, this)}
      </div>
    );
  }
}
