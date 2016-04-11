"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  mouseEnter() {
    this.setState({hover: true});
  }

  mouseLeave() {
    this.setState({hover: false});
  }

  render() {
    return (
      <div className={"item relative" + (this.props.studentAnswer.answer.correct ? " correct" : " wrong")} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
        <span className="pointer">{this.props.studentAnswer.question.text}</span>
      </div>
    );
  }
}
