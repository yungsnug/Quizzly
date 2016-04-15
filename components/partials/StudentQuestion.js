"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  mouseEnter() {
    this.setState({hover: true});
  }

  mouseLeave() {
    this.setState({hover: false});
  }

  render() {
    var status = " wrong";
    if(this.props.studentAnswer.answer == undefined || this.props.studentAnswer.answer.correct) {
      status = " correct";
    }

    return (
      <div className={"item relative" + status} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.props.showModal.bind(this, this.props.studentAnswer.question)}>
        <span className="pointer">{this.props.studentAnswer.question.text}</span>
      </div>
    );
  }
}
