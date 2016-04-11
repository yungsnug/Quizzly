"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Course Title"
    };
  }

  render() {
    return (
      <div className="mainPanel">
        <div className="scrollRegion">
          <div className="header">
            {this.props.isCourse ? this.props.course.title : this.props.section.title}
            <span className="floatR pointer" onClick={this.props.isCourse ? this.props.deleteCourseFromProfessor.bind(this, this.props.course) : this.props.deleteSectionFromCourse.bind(this, this.props.sectionIndex)}><img src={CLOSE_IMAGE_PATH} style={{"width":"12px"}}/></span>
          </div>

          <div className="body">
            {this.props.course.quizzes.map(function(quiz, quizIndex) {
              return (
                <div /*onClick={this.props.showMetricModal.bind(this, quiz)}*/ key={quizIndex} title={quiz} className="item">
                  <span className="pointer" onClick={this.props.showQuizInModal.bind(this, quizIndex)}>{quiz.title}</span>
                  {this.props.isCourse ? <span className="floatR pointer opacity40" onClick={this.props.deleteQuizFromCourse.bind(this, quizIndex)}><img src={CLOSE_IMAGE_PATH} style={{"width":"8px"}}/></span> : null}
                </div>
              );
            }, this)}
          </div>
          {this.props.isCourse ? <div className="footerButton" onClick={this.props.showQuizModal.bind(this)}>+</div> : <div className="footerButton" onClick={this.props.showStudentsModal.bind(this, this.props.section)}>Update Students</div>}
        </div>
      </div>
    );
  }
}
