"use strict";

import React from 'react'

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    //console.log("props.student", props.course);
    this.state = {
      course: props.course,
      sections: props.course.sections,
      students: [],

      section: {id: -1},
      student: {id: -1},
      
    }
  }

  componentDidMount() {
    
    // $.post('/getData', {studentid: 1})
    // .then(function(metricsData) {
    //   var ctx = document.getElementById("myChart").getContext("2d");
    //   var myNewChart = new Chart(ctx).PolarArea(this.doMath(metricsData));
    // });
  }

  componentWillReceiveProps(newProps) {
  }

  getStudents() {
  		//use node-csv
  		console.log("uploading students...");
  }

  render() {
    return (
      <div id="upload" className="quizzlyContent">
       
          <button onClick={this.getStudents.bind(this)}>UPLOAD STUDENTS</button>
        
      </div>
    );
  }
}