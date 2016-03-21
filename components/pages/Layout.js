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

  componentDidMount() {
    var me = this;
    this.checkSession()
    .then(function(user) {
      //TODO: might not be able to be /PROFESSOR/find/:id
      return $.post('/' + user.type + '/find/' + user.id);
    })
    .then(function(user) {
      console.log('user', user);
      switch(user.type) {
        case 'STUDENT':
          var courseIds = [];
          user.sections.map(function(section) {
            courseIds.push(section.course);
          });
          $.post('/course/multifind', {ids: courseIds})
          .then(function(courses) {
            console.log('courseIds', courseIds);
            console.log('courses', courses);
            me.getCourseById(courses[0].id);
            user.courses = courses;
            me.setState({user: user});
          });
          break;
        case 'PROFESSOR':
          me.getCourseById(user.courses[0].id);
          me.setState({user: user});
          break;
      }
    });
  }

  changeCourse(courseId) {
    this.getCourseById(courseId);
  }

  getCourseById(courseId) {
    console.log('changeCourseId', courseId);
    var me = this;

    $.post('/course/find/' + courseId)
    .then(function(course) {
      if(course == undefined) return; // if there are no courses, then there are no sections
      me.setState({course: course});
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
    return $.post('/course/create/', {title: course.title, professor: this.state.user.id, sections: course.sections})
    .then(function(course) {
      console.log("created course", course);
      var user = me.state.user;
      user.courses.push(course);
      me.setState({user: user});
    });
  }

  deleteCourseFromProfessor(course) {
    var me = this;

    var sectionIds = course.sections.map(function(section){return section.id;});
    var quizIds = course.quizzes.map(function(quiz){return quiz.id;});
    var questionIds = [];
    var answerIds = [];

    $.post('/question/find', {quiz: quizIds})
    .then(function(questions) {
      questionIds = questions.map(function(question){return question.id;});
      return $.post('/answer/find', {question: questionIds})
    })
    .then(function(answers) {
      answerIds = answers.map(function(answer){return answer.id;});
      return $.when(
        $.post('/course/destroy', {id: course.id}),
        $.post('/section/destroy', {id: sectionIds}),
        $.post('/quiz/destroy', {id: quizIds}),
        $.post('/question/destroy', {id: questionIds}),
        $.post('/answer/destroy', {id: answerIds})
      );
    })
    .then(function() {
      return $.post('/professor/find/' + me.state.user.id);
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
    var props = {
      course: me.state.course,
      term: me.state.term,
    };

    switch(this.state.user.type) {
      case 'STUDENT':
        break;
      case 'PROFESSOR':
        props.addCourseToProfessor = me.addCourseToProfessor.bind(me);
        props.deleteCourseFromProfessor = me.deleteCourseFromProfessor.bind(me);
        break;
    }

    return (
      <div id="quizzlyApp">
        <Sidebar
          user={this.state.user}
        />
        <Header
          course={this.state.course}
          term={this.state.term}
          user={this.state.user}
          changeCourse={this.changeCourse.bind(this)}
          changeTerm={this.changeTerm.bind(this)}
        />
        {React.Children.map(me.props.children, function (child) {
          return React.cloneElement(child, props);
        })}
      </div>
    )
  }
}
