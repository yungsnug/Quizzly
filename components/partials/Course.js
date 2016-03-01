"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log("Course props: ", props);
    this.state = {
      title: "Course Title"
    };
  }

  render() {
    var footer = this.props.isCourse ? <div className="footerButton" onClick={this.props.addQuizModal.bind(this)}>+</div> : null;
    return (
      <div className="mainPanel">
        <div className="scrollRegion">
          <div className="header">
            {this.props.isCourse ? this.props.course.title : this.props.section.title}
            <span className="floatR pointer" onClick={this.props.deleteSectionFromCourse.bind(this, this.props.sectionIndex)}><img src="images/close.png" style={{"width":"12px"}}/></span>
          </div>

          <div className="body">
            {this.props.course.quizzes.map(function(quiz, i) {
              return (
                <div onClick={this.props.showMetricModal.bind(this, quiz)} key={i} title={quiz} ref={'quiz' + i} className="item">{quiz.title}</div>
              );
            }, this)}
          </div>
          {footer}
        </div>
      </div>
    );
  }
}
