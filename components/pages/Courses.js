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
    this.getCoursesAndSections(newProps.course.id);
  }

  getCoursesAndSections(courseId) {
    var me = this;
    $.when(
      $.post("/course/find", { id: courseId }),
      $.post("/section/find", { course: courseId })
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

  addCourseModal() {
    var modalInfo = this.state.modalInfo;
    modalInfo.modalType = "ADD_COURSE";
    modalInfo.title = "Add Course";
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  addQuizModal() {
    var modalInfo = this.state.modalInfo;
    modalInfo.title = "Add Quiz";
    modalInfo.modalType = "ADD_QUIZ";
    this.setState({
      showModal: true,
      showMetricModal: false,
      modalInfo: modalInfo
    });
  }

  addQuizToCourse(quiz) {
    console.log("Adding quiz '" +  quiz.title + "' in course " + this.props.course.title);
    var me = this;
    $.post('quiz/create/',
      {
        title: quiz.title,
        course: me.props.course.id
      }
    ).then(function(quiz) {
      console.log(quiz);
      var course = me.state.course;
      course.quizzes.push(quiz);
      me.setState({course: course});
      me.closeModal();
    });
  }

  addSectionToCourse(section) {
    var me = this;
    //TODO: add student array to section
    $.post('section/create/', { title: section.title, course: me.state.course.id }
    ).then(function(section) {
      console.log("section", section);
      var sections = me.state.sections;
      sections.push(section);
      me.setState({sections: sections});
      me.closeModal();
    });
  }

  deleteSectionFromCourse(sectionIndex) {
    var me = this;
    var sections = me.state.sections;
    $.post('section/destroy/', { id: sections[sectionIndex].id }
    ).then(function(section) {
      console.log("section", section);
      sections.splice(sectionIndex, 1);
      me.setState({sections: sections});
      me.closeModal();
    });
  }

  getName() {
    $.post('/user')
    .then(function(professor) {
      console.log("professor", professor);
    });
  }

  render() {
    return (
      <div>
        <div id="courses" className="quizzlyContent" onClick={this.getName.bind(this)}>
          <Course
            course={this.state.course}
            isCourse={true}
            ref={'course'}
            addQuizModal={this.addQuizModal.bind(this)}
            showMetricModal={this.showMetricModal.bind(this)}
            sectionIndex={-1}
            deleteSectionFromCourse={this.deleteSectionFromCourse.bind(this)}
          />
          {this.state.sections.map(function(section, i) {
            return (
              <Course
                section={section}
                sectionIndex={i}
                course={this.state.course}
                isCourse={false}
                key={i}
                showMetricModal={this.showMetricModal.bind(this)}
                deleteSectionFromCourse={this.deleteSectionFromCourse.bind(this)}
              />
            );
          }, this)}
          <div className="addEntityButton" onClick={this.addCourseModal.bind(this)}>+</div>
        </div>

        {(() => {
          if(this.state.showModal)
            return (
              <Modal
                modalInfo={this.state.modalInfo}
                showModal={this.state.showModal}
                key={this.state.showModal}
                closeModal={this.closeModal.bind(this)}
                addQuizToCourse={this.addQuizToCourse.bind(this)}
                addSectionToCourse={this.addSectionToCourse.bind(this)}
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
