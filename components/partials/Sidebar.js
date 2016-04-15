"use strict";

import React from 'react'
import { browserHistory } from 'react-router'

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    console.log("sidebar props", props);
    this.state = {
      selected: window.location.pathname
    };
  }

  setFilter(filter) {
    browserHistory.push(filter);
    this.setState({selected: filter});
  }

  isActive(value){
    return 'sidebarElement mt15 pt15 pb15 show pointer p ' + ((value === this.state.selected) ? 'greenBlueGradientLight' : '');
  }

  render() {
    return (
      <div id="quizzlySidebar" className="lightGreenBackground floatL borderleft alignC borderRight" style={{"width": "192px", "height": "100vh"}}>
        <h1 className="alignC white greenBlueGradient flexCenter borderBottom mb30" style={{"height": "57px"}}>QUIZZLY</h1>
        {(() => {
          switch(this.props.user.type) {
            case 'STUDENT':
              return (
                <span>
                  <div className={this.isActive('/s/quizzes')} onClick={this.setFilter.bind(this, '/s/quizzes')}>Quizzes</div>
                  {/*<div className={this.isActive('/s/metrics')} onClick={this.setFilter.bind(this, '/s/metrics')}>Metrics</div>*/}
                </span>
              );
              break;
            case 'PROFESSOR':
              return (
                <span>
                  <div className={this.isActive('/p/courses')} onClick={this.setFilter.bind(this, '/p/courses')}>Courses</div>
                  <div className={this.isActive('/p/quizzes')} onClick={this.setFilter.bind(this, '/p/quizzes')}>Quizzes</div>
                  <div className={this.isActive('/p/metrics')} onClick={this.setFilter.bind(this, '/p/metrics')}>Metrics</div>
                  <div className={this.isActive('/p/download')} onClick={this.setFilter.bind(this, '/p/download')}>Download Grades</div>
                </span>
              );
              break;
          }
        })()}
      </div>
    )
  }
}

// <Link to="courses" onClick={this.setFilter.bind(this, 'courses')} params={{coursesData: JSON.stringify(courses201)}}>My Courses</Link>
