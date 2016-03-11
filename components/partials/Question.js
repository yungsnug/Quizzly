"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successfullyAsked: false,
      hover: false
    };
  }

  askQuestion(quizIndex, questionIndex) {
    var me = this;
    this.props.askQuestion(quizIndex, questionIndex)
    .then(function() {
      me.setState({successfullyAsked: true}, function() {
        setTimeout(function() {me.setState({successfullyAsked: false});}, 2000);
      }.bind(me));
    });
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
        {this.state.successfullyAsked ? <div className="width100 height100 flexCenter absolute greenBlueGradient white mont z20 bold" style={{"margin":"-10px"}}>ASKED</div> : null}
        <span className="pointer" onClick={this.props.showQuestionInModal.bind(this, this.props.quizIndex, this.props.questionIndex)}>{this.props.question.text}</span>
        {(() => {
          if(this.state.hover) {
            return (
              <div className="floatR">
                <span className="small pointer darkGreen mr10" onClick={this.askQuestion.bind(this, this.props.quizIndex, this.props.questionIndex)}>ask</span>
                <span className="pointer opacity40" onClick={this.props.deleteQuestionFromQuiz.bind(this, this.props.quizIndex, this.props.questionIndex)}><img src="images/close.png" style={{"width":"8px"}}/></span>
              </div>
            );
          }
        })()}

      </div>
    );
  }
}
