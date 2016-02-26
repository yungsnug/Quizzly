"use strict";

import React from 'react'
import {Link} from 'react-router'

var courses201 = [
  {
    title: "CSCI 201",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"},
      {title: "Week 5"},
      {title: "Week 6"},
      {title: "Week 7"},
      {title: "Week 8"}
    ]
  },
  {
    title: "67558",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"},
      {title: "Week 5"},
      {title: "Week 6"},
      {title: "Week 7"},
      {title: "Week 8"}
    ]
  },
  {
    title: "49939",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"},
      {title: "Week 5"},
      {title: "Week 6"},
      {title: "Week 7"},
      {title: "Week 8"}
    ]
  },
  {
    title: "12283",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"},
      {title: "Week 5"},
      {title: "Week 6"},
      {title: "Week 7"},
      {title: "Week 8"}
    ]
  }
];

var courses104 = [
  {
    title: "CSCI 104",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"}
    ]
  },
  {
    title: "98857",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"}
    ]
  },
  {
    title: "79988",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"}
    ]
  },
  {
    title: "09932",
    quizzes: [
      {title: "Week 1"},
      {title: "Week 2"},
      {title: "Week 3"},
      {title: "Week 4"}
    ]
  }
];


// export class Sidebar extend {
export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: ''};
  }

  setFilter(filter) {
    console.log("1 filter", this.state.selected);
    this.setState({selected: filter});
  }

  isActive(value){
    // console.log("isActive", value);
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
