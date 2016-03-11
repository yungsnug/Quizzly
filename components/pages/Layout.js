"use strict";

import React from 'react'
import { browserHistory } from 'react-router'
import {Sidebar} from '../partials/Sidebar.js'
import {Header} from '../partials/Header.js'

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        id: -1,
        title: "FAKE 101",
        quizzes: [],
        sections: []
      },
      term: "Summer 2015",
      user: {
        courses: [],
        email: "",
        firstName: "",
        lastName: "",
        facultyId: "",
        school: "",
        id: -1
      }
    }
  }

  checkSession() {
    return $.post('/session')
    .then(function(user) {
      console.log(user);
      return user;
    })
    .fail(function() {
      console.log("redirecting to entrance...");
      browserHistory.push('/entrance');
    });
  }

  componentWillMount() {
    var me = this;
    this.checkSession()
    .then(function(user) {
      console.log("user1", user);
      return $.post("/professor/find/" + user.id);
    })
    .then(function(user) {
      console.log("user", user);
      var course = {};
      user.courses.length > 1 ? course = user.courses[0] : course = this.state.course;
      me.setState({
        user: user,
        course: course
      });
    });
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

  addCourseToProfessor(course) {
    var me = this;
    //TODO: add student array to section
    for(var i = 0; i < course.sections.length; ++i) { // this removes empty answers from the array
      if(course.sections[i].title.length == 0) {
        course.sections.splice(i, 1);
        --i;
      }
    }
    console.log("user", this.state.user);
    return $.post('course/create/', { title: course.title, professor: this.state.user.id, sections: course.sections })
    .then(function(course) {
      console.log("created course", course);
      var user = me.state.user;
      user.courses.push(course);
      me.setState({user: user});
    });
  }

  deleteCourseFromProfessor(course) {
    var me = this;
    $.post('course/destroy/', { id: course.id })
    .then(function(course) {
      console.log("deleted course", course);
      var sectionIds = course.sections.map(function(section){return section.id;});
      return $.post('/section/destroy', {id: sectionIds});
    })
    .then(function() {
      return $.post('professor/find/' + me.state.user.id);
    })
    .then(function(user) {
      me.setState({
        course: user.courses[0],
        user: user
      });
    });
  }

  render() {
    var me = this;
    return (
      <div id="quizzlyApp">
        <Sidebar />
        <Header
          data={this.state}
          user={this.state.user}
          changeCourse={this.changeCourse.bind(this)}
          changeTerm={this.changeTerm.bind(this)}
        />
        {React.Children.map(me.props.children, function (child) {
          return React.cloneElement(child, {
            course: me.state.course,
            term: me.state.term,
            addCourseToProfessor: me.addCourseToProfessor.bind(me),
            deleteCourseFromProfessor: me.deleteCourseFromProfessor.bind(me)
          });
        })}
      </div>
    )
  }
}
