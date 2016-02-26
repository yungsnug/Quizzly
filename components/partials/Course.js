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
    var header = <div className="header">{this.props.isCourse ? this.props.course.title : this.props.section.title}</div>;
    var footer = this.props.isCourse ? <div className="footerButton" onClick={this.props.addQuizModal.bind(this)}>+</div> : null;
    return (
      <div className="mainPanel">
        <div className="scrollRegion">
          {header}
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
