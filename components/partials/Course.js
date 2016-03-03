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
    var footer = this.props.isCourse ? <div className="footerButton" onClick={this.props.showQuizModal.bind(this)}>+</div> : null;
    return (
      <div className="mainPanel">
        <div className="scrollRegion">
          <div className="header">
            {this.props.isCourse ? this.props.course.title : this.props.section.title}
            <span className="floatR pointer" onClick={this.props.deleteSectionFromCourse.bind(this, this.props.sectionIndex)}><img src="images/close.png" style={{"width":"12px"}}/></span>
          </div>

          <div className="body">
            {this.props.course.quizzes.map(function(quiz, quizIndex) {
              return (
                <div /*onClick={this.props.showMetricModal.bind(this, quiz)}*/ key={quizIndex} title={quiz} className="item">
                  <span className="pointer" onClick={this.props.showQuizInModal.bind(this, quizIndex)}>{quiz.title}</span>
                  {this.props.isCourse ? <span className="floatR pointer opacity40" onClick={this.props.deleteQuizFromCourse.bind(this, quizIndex)}><img src="images/close.png" style={{"width":"8px"}}/></span> : null}
                </div>
              );
            }, this)}
          </div>
          {footer}
        </div>
      </div>
    );
  }
}
