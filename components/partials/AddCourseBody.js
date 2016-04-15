"use strict";

import React from 'react'

export default class AddCourseBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddCourse: false,
      course: {
        title: "",
        placeholder: "Course...",
        sections: [
          {title: "", placeholder: "Section..."}
        ]
      },
      terms: [],
      term: {}
    };
  }

  componentDidMount() {
    var me = this;
    $.post('/term/find')
    .then(function(terms) {
      me.setState({
        term: terms[0],
        terms: terms
      });
    });
  }

  changeTerm(event, termIndex) {
    var me = this;
    $.post('/term/find/' + event.target.value)
    .then(function(term) {
      me.setState({term: term});
    });
  }

  handleChange(i, event) {
    var me = this;
    var course = this.state.course;
    if(i == 'course') {
      course.title = event.target.value;
    } else {
      course.sections[i].title = event.target.value;
    }

    this.setState({course: course});
  }

  addSection() {
    var sections = this.state.course.sections;
    var section = {title: "", placeholder: "Section..."};
    sections.push(section);
    this.setState({sections: sections});
  }

  showAddCourse() {
    if(this.state.isAddCourse) return;

    var course = {
      title: "",
      placeholder: "Course...",
      sections: []
    };
    this.setState({
      isAddCourse: true,
      course: course
    });
  }

  showAddSection() {
    if(!this.state.isAddCourse) return;

    var course = {
      title: "",
      placeholder: "",
      sections: [
        {title: "", placeholder: "Section..."}
      ]
    };
    this.setState({
      isAddCourse: false,
      course: course
    });
  }

  render() {
    var me = this;
    var addButton;
    var footerButton;
    var courseInput;

    if(this.state.isAddCourse) {
      courseInput = (
        <div className="flex mb20 flexVertical">
          <input
            type="text"
            className="addCourseInput"
            placeholder={this.state.course.placeholder}
            value={this.state.course.title}
            onChange={this.handleChange.bind(this, 'course')}
          />
          <select value={this.state.term.id} className="dropdown ml10" onChange={this.changeTerm.bind(this)}>
            {this.state.terms.map(function(term, termIndex) {
              return <option key={termIndex} value={term.id}>{term.season.season + " " + term.year.year}</option>
            })}
          </select>
        </div>
      );
      addButton = <div className="modalButton" onClick={this.props.addCourseToProfessor.bind(this, this.state.course, this.state.term)}>ADD COURSE</div>
      footerButton = <div className="footerButton" onClick={this.addSection.bind(this)} >+</div>
    } else {
      courseInput = null;
      addButton = <div className="modalButton" onClick={this.props.addSectionToCourse.bind(this, this.state.course.sections[0])}>ADD SECTION</div>
      footerButton = null;
    }

    return (
      <div id="addCourseBody">
        <div className="row">
          <div className="six columns p20 pr10">
            <div className={"modalButton " + (this.state.isAddCourse ? "opacity40" : "")} onClick={this.showAddSection.bind(this)}>ADD SECTION</div>
          </div>
          <div className="six columns p20 pl10">
            <div className={"modalButton " + (this.state.isAddCourse ? "" : "opacity40")} onClick={this.showAddCourse.bind(this)}>ADD COURSE</div>
          </div>
        </div>
        <div className="pl20 pr20">
          {courseInput}
          {this.state.course.sections.map(function(section, i) {
            return (
              <div key={i} className="flex mb20 flexVertical">
                <input
                  type="text"
                  className="addCourseInput"
                  placeholder={section.placeholder}
                  value={section.title}
                  onChange={me.handleChange.bind(me, i)}
                  key={i}
                />
              </div>
            );
          })}
        </div>
        <div className="pb20 pl20 pr20">
          {addButton}
        </div>
        {footerButton}
      </div>
    );
  }
}
