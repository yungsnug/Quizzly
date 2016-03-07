"use strict";

import React from 'react'

export default class Metrics extends React.Component {
  componentDidMount() {
    // $.post('/getData', {studentid: 1})
    // .then(function(metricsData) {
    //   var ctx = document.getElementById("myChart").getContext("2d");
    //   var myNewChart = new Chart(ctx).PolarArea(this.doMath(metricsData));
    // });


  }

  doMath(metricsData) {
    // asdf asd asdf sdf
    // return metricsData;
  }

  render() {
    return (
      <div id="metrics" className="quizzlyContent">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    );
  }
}
