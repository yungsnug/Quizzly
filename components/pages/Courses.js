"use strict";

import React from 'react'
import Course from '../partials/Course.js'
import Modal from '../partials/Modal.js'
import MetricModal from '../partials/MetricModal.js'

export default class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      sections: props.course.sections,
      showModal: false,
      showMetricModal: false,
      modalInfo: {
        modalType: "ADD_QUIZ",
        title: "Add Quiz"
      }
    };
  }

  componentDidMount() {
    this.getCoursesAndSections(this.state.course.id);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.course != undefined) {
      this.getCoursesAndSections(newProps.course.id);
    }
  }

  getCoursesAndSections(courseId) {
    if(courseId == -1) return;
    var me = this;
    $.when(
      $.post("/course/find", {id: courseId}),
      $.post("/section/find", {course: courseId})
    ).then(function(course, sections) {
      console.log("course", course[0]);
      console.log("sections", sections[0]);

      if(course == undefined) return; // if there are no courses, then there are no sections
      me.setState({
        course: course[0],
        sections: sections[0]
      });
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      showMetricModal: false
    });
  }

  showMetricModal(quiz) {
    console.log("showMetricModal!", quiz);
    var modalInfo = this.state.modalInfo;
    modalInfo.title = quiz.title;
    this.setState({
      showModal: false,
      showMetricModal: true,
      modalInfo: modalInfo
    });
  }

  showCourseModal() {
    var modalInfo = this.state.modalInfo;
    modalInfo.modalType = "ADD_COURSE";
    modalInfo.title = "Add Course or Section";
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  showQuizModal(quizIndex) {
    var modalInfo = this.state.modalInfo;
    modalInfo.title = "Add Quiz";
    modalInfo.modalType = "ADD_QUIZ";
    modalInfo.quizIndex = quizIndex;
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  showQuizInModal(quizIndex) {
    console.log("showQuizInModal::quizIndex", quizIndex);
    this.showQuizModal(quizIndex);
  }

  showStudentsModal(section) {
    var modalInfo = this.state.modalInfo;
    modalInfo.modalType = "ADD_STUDENTS";
    modalInfo.title = "Add Students";
    modalInfo.section = section;
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  addQuizToCourse(quiz, quizIndex) {
    console.log("Adding quiz '" +  quiz.title + "' in course " + this.props.course.title);
    var me = this;
    if(quizIndex > -1) {
      $.post('/quiz/update/' + quiz.id, { title: quiz.title })
      .then(function(quiz) {
        console.log(quiz);
        var course = me.state.course;
        course.quizzes[quizIndex] = quiz;
        me.setState({course: course});
        me.closeModal();
      });
    } else {
      $.post('/quiz/create/',
        {
          title: quiz.title,
          course: me.props.course.id
        }
      )
      .then(function(quiz) {
        console.log(quiz);
        var course = me.state.course;
        course.quizzes.push(quiz);
        me.setState({course: course});
        me.closeModal();
      });
    }
  }

  addSectionToCourse(section) {
    var me = this;
    if(section.title == '') {
      return;
    }
    $.post('/section/create/', { title: section.title, course: me.state.course.id })
    .then(function(section) {
      console.log("created section", section);
      var sections = me.state.sections;
      sections.push(section);
      me.setState({sections: sections});
      me.closeModal();
    });
  }

  addCourseToProfessor(course, term) {
    var me = this;
    this.props.addCourseToProfessor(course, term)
    .then(function(newCourse) {
      me.setState({course: newCourse});
      me.closeModal();
    });
  }

  addStudentsToSection(sectionId, studentIds) {
    var me = this;
    this.props.addStudentsToSection(sectionId, studentIds)
    .then(function() {
      me.closeModal();
    });
  }

  deleteSectionFromCourse(sectionIndex) {
    var me = this;
    var sections = me.state.sections;
    if(sections[sectionIndex] == undefined) return $.when(null);

    $.post('/section/destroy/' + sections[sectionIndex].id)
    .then(function(section) {
      console.log("section", section);
      sections.splice(sectionIndex, 1);
      me.setState({sections: sections});
      me.closeModal();
    });
  }

  deleteQuizFromCourse(quizIndex) {
    var me = this;
    var quizzes = this.state.course.quizzes;
    $.post('/quiz/find/' + quizzes[quizIndex].id)
    .then(function(quiz) {
      return $.post('/quiz/destroy/' + quizzes[quizIndex].id);
    })
    // .then(function(quiz) {
    //   if(quiz.questions.length == 0) return $.when(null);
    //   var questionIds = quiz.questions.map(function(question){return question.id;});
    //   return $.post('/question/multidestroy', {ids: questionIds});
    // })
    .then(function() {
      quizzes.splice(quizIndex, 1);
      var course = me.state.course;
      course.quizzes = quizzes;
      me.setState({course: course});
      me.closeModal();
    });
  }

  deleteCourseFromProfessor(course) {
    var me = this;
    this.props.deleteCourseFromProfessor(course)
    .then(function() {
      var course = {
        id: -1,
        title: "FAKE 101",
        quizzes: [],
        sections: []
      };
      me.setState({course: course});
    });
  }

  render() {
    return (
      <div>
        <div id="courses" className="quizzlyContent">
          {(() => {
            if(this.state.course.id > -1) {
              return (
                <Course
                  course={this.state.course}
                  isCourse={true}
                  ref={'course'}
                  showQuizModal={this.showQuizModal.bind(this)}
                  showQuizInModal={this.showQuizInModal.bind(this)}
                  showMetricModal={this.showMetricModal.bind(this)}
                  deleteQuizFromCourse={this.deleteQuizFromCourse.bind(this)}
                  sectionIndex={-1}
                  deleteCourseFromProfessor={this.deleteCourseFromProfessor.bind(this)}
                  deleteSectionFromCourse={this.deleteSectionFromCourse.bind(this)}
                />
              );
            }
          })()}
          {this.state.sections.map(function(section, sectionIndex) {
            // this is section, not course!
            return (
              <Course
                section={section}
                sectionIndex={sectionIndex}
                course={this.state.course}
                isCourse={false}
                key={sectionIndex}
                showQuizInModal={this.showQuizInModal.bind(this)}
                showMetricModal={this.showMetricModal.bind(this)}
                showStudentsModal={this.showStudentsModal.bind(this)}
                deleteSectionFromCourse={this.deleteSectionFromCourse.bind(this)}
              />
            );
          }, this)}
          <div className="addEntityButton" onClick={this.showCourseModal.bind(this)}>+</div>
        </div>

        {(() => {
          if(this.state.showModal)
            return (
              <Modal
                modalInfo={this.state.modalInfo}
                showModal={this.state.showModal}
                course={this.state.course}
                quizzes={this.state.course.quizzes}
                key={this.state.showModal}
                closeModal={this.closeModal.bind(this)}
                addQuizToCourse={this.addQuizToCourse.bind(this)}
                addCourseToProfessor={this.addCourseToProfessor.bind(this)}
                addSectionToCourse={this.addSectionToCourse.bind(this)}
                addStudentsToSection={this.addStudentsToSection.bind(this)}
              />
            );
        })()}
        {(() => {
          if(this.state.showMetricModal)
            return (
              <MetricModal
                modalInfo={this.state.modalInfo}
                showMetricModal={this.state.showMetricModal}
                key={this.state.showMetricModal}
                closeModal={this.closeModal.bind(this)}
              />
            );
        })()}
      </div>
    );
  }
}
