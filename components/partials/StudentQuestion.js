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
      <div className="item relative" onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
        <span className="pointer">{this.props.studentQuestion.text}</span>
        <div className="floatR">
          <span className="small pointer darkGreen">3/36</span>
        </div>
      </div>
    );
  }
}
