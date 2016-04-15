"use strict";

import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successfullyAsked: false,
      hover: false,
      showSelectionSection: false,
      sections: []
    };
  }

  askQuestion(quizIndex, questionIndex, sectionId) {
    var me = this;
    this.props.askQuestion(quizIndex, questionIndex, sectionId)
    .then(function() {
      me.setState({showSelectionSection: false});
      me.setState({successfullyAsked: true}, function() {
        setTimeout(function() {me.setState({successfullyAsked: false});}, 2000);
      }.bind(me));
    });
  }

  selectSection() {
    var me = this;
    console.log("selectSection");
    return $.post('/section/find', {course: this.props.quiz.course.id})
    .then(function(sections) {
      console.log("sections", sections);
      me.setState({
        showSelectionSection: true,
        sections: sections
      });
    });
  }

  closeSectionsModal() {
    this.setState({showSelectionSection: false});
  }

  mouseEnter() {
    this.setState({hover: true});
  }

  mouseLeave() {
    this.setState({hover: false});
  }

  render() {
    return (
      <div className="relative">
        <div className="item" onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
          {this.state.successfullyAsked ? <div className="width100 height100 flexCenter absolute greenBlueGradient white mont z20 bold" style={{"margin":"-10px"}}>ASKED</div> : null}
          <span className="pointer" onClick={this.props.showQuestionInModal.bind(this, this.props.quizIndex, this.props.questionIndex)}>{this.props.question.text}</span>
          {(() => {
            if(this.state.hover) {
              return (
                <div className="floatR">
                  <span className="small pointer darkGreen mr10" onClick={this.selectSection.bind(this)}>ask</span>
                  <span className="pointer opacity40" onClick={this.props.deleteQuestionFromQuiz.bind(this, this.props.quizIndex, this.props.questionIndex)}><img src={CLOSE_IMAGE_PATH} style={{"width":"8px"}}/></span>
                </div>
              );
            }
          })()}
        </div>
        {(() => {
          if(this.state.showSelectionSection) {
            return (
              <div className="round absolute outerShadow whiteBackground small" style={{marginLeft: "271px", top: "0", zIndex: "10000"}}>
                <div className="lightGreenBackground roundTop borderBottom p10 mb10 bold flexCenter">
                  <div>Select Section</div>
                  <span className="ml10 pointer" onClick={this.closeSectionsModal.bind(this)}><img src={CLOSE_IMAGE_PATH} style={{"width":"12px"}}/></span>
                </div>
                {this.state.sections.map(function(section, sectionIndex) {
                  return (
                    <div className="pointer pl10 pr10 pb10" key={sectionIndex} onClick={this.askQuestion.bind(this, this.props.quizIndex, this.props.questionIndex, section.id)}>{section.title}</div>
                  );
                }, this)}
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
