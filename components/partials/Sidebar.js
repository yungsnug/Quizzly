"use strict";

import React from 'react'
import {Link} from 'react-router'

// export class Sidebar extend {
export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: ''};
  }

  setFilter(filter) {
    this.setState({selected: filter});
  }

  isActive(value){
    return 'mt15 pt15 pb15 show ' + ((value === this.state.selected) ? 'greenBlueGradientLight' : '');
  }

  render() {
    return (
      <div id="quizzlySidebar" className="lightGreenBackground floatL borderleft alignC borderRight" style={{"width": "192px", "height": "100vh"}}>
        <h1 className="alignC white greenBlueGradient flexCenter borderBottom mb30" style={{"height": "57px"}}>QUIZZLY</h1>
        <div className={this.isActive('courses')} onClick={this.setFilter.bind(this, 'courses')}>
          <Link to="courses">Courses</Link>
        </div>
        <div className={this.isActive('quizzes')} onClick={this.setFilter.bind(this, 'quizzes')}>
          <Link to="quizzes">Quizzes</Link>
        </div>
        <div className={this.isActive('metrics')} onClick={this.setFilter.bind(this, 'metrics')}>
          <Link to="/">Metrics</Link>
        </div>
      </div>
    )
  }
}

// <Link to="courses" onClick={this.setFilter.bind(this, 'courses')} params={{coursesData: JSON.stringify(courses201)}}>My Courses</Link>
