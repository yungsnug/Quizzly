"use strict";

import React from 'react'
var Promise = require('bluebird');

export default class AddStudentsBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      section: props.section,
      studentEmails: ""
    };
  }

  componentDidMount() {
    var me = this;
    $.post('/section/find/' + this.state.section.id)
    .then(function(section) {
      var studentEmails = "";
      section.students.map(function(student) {
        studentEmails += student.email + "\n";
      });
      me.setState({studentEmails: studentEmails});
    });
  }

  handleChange(event) {
    this.setState({studentEmails: event.target.value});
  }

  addStudentsToSection() {
    var me = this;
    var studentEmails = this.state.studentEmails;
    studentEmails = studentEmails.split("\n");

    $.post('/student/getStudentIdsFromEmails/', {studentEmails: studentEmails})
    .then(function(studentIds) {
      studentIds = Utility.removeDuplicates(studentIds);
      me.props.addStudentsToSection(me.state.section.id, studentIds);
    });
  }

  render() {
    var me = this;
    return (
      <div id="addStudentBody">
        <div className="p20">
          <div className="">
            <div className="pb10 alignC">Add a student's email per line in section: {this.state.section.title}</div>
            <textarea
              className="normalInput centerBlock alignC pr20"
              placeholder="Student emails..."
              value={this.state.studentEmails}
              onChange={this.handleChange.bind(this)}
              rows={10}
              style={{resize: "vertical", maxWidth: "350px"}}
            />
          </div>
        </div>
        <div className="footerButton" onClick={this.addStudentsToSection.bind(this)} style={{fontWeight: "300"}}>Update Students</div>
      </div>
    );
  }
}
