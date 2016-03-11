"use strict";

import React from 'react'
import { browserHistory } from 'react-router'

// export class Sidebar extend {
export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
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
        <div className={this.isActive('/courses')} onClick={this.setFilter.bind(this, '/courses')}>Courses</div>
        <div className={this.isActive('/quizzes')} onClick={this.setFilter.bind(this, '/quizzes')}>Quizzes</div>
        <div className={this.isActive('/metrics')} onClick={this.setFilter.bind(this, '/metrics')}>Metrics</div>
      </div>
    )
  }
}

// <Link to="courses" onClick={this.setFilter.bind(this, 'courses')} params={{coursesData: JSON.stringify(courses201)}}>My Courses</Link>
