var donutSettings = {
  responsive: true,
  segmentShowStroke: true,
  segmentStrokeColor: "white",
  segmentStrokeWidth: 8,
  percentageInnerCutout: 60
};

var donutDummyData = [
  {
    value: 12,
    color: "#B7EFF7",
    highlight: "#A9DBE2",
    label: "A"
  },
  {
    value: 35,
    color: "#8BE0EB",
    highlight: "#7DCBD5",
    label: "B"
  },
  {
    value: 24,
    color: "#69C6D2",
    highlight: "#5FB4BF",
    label: "C"
  },
  {
    value: 9,
    color: "#47A9B6",
    highlight: "#3E939E",
    label: "D"
  },
  {
    value: 3,
    color: "#328A96",
    highlight: "#29747F",
    label: "F"
  }
];

"use strict";

import React from 'react'

export default class MetricModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMetricModal: props.showMetricModal,
      modalType: props.modalInfo.modalType,
      title: props.modalInfo.title,
      donutChart: donutDummyData
    };
  }

  componentDidMount() {
    var donutId = "donutChart";
    var ctx = document.getElementById(donutId).getContext("2d");
    var donutChart = window.myLine = new Chart(ctx).Doughnut(donutDummyData, donutSettings);

    // ccDonutController.addDonutListener(this, donutChart, "creditCardDollarsChart");

    document.getElementById(donutId).onclick = function (evt) {
      var activePoints = donutChart.getSegmentsAtEvent(evt);
      this.setState({
        cardPercent: calculatePercent(activePoints[0].value, me.state.cardTotal),
        cardTitle: activePoints[0].label
      });
    };

    this.setState({ donutChart: donutChart });
  }

  render() {
    return (
      <div id="modalContainer">
        <div id="modal">
          <div id="header">
            {this.state.title}
            <span className="floatR pointer" onClick={this.props.closeModal.bind(this)}><img src={CLOSE_IMAGE_PATH} style={{"width":"12px"}}/></span>
          </div>
          <div id="body" className="p20">
            <div style={{"padding":"20px 170px"}}>
              <canvas id="donutChart" height="200" width="200"></canvas>
            </div>
            <div className="p centerBlock" style={{"width":"420px"}}>
            <div className="row borderBottom pb10 mb10">
              <div className="six columns alignL pl20">Grade</div>
              <div className="six columns alignR pr20">Count</div>
            </div>
              <div className="row">
                <div className="six columns alignL pl20">A</div>
                <div className="six columns alignR pr20">12</div>
              </div>
              <div className="row">
                <div className="six columns alignL pl20">B</div>
                <div className="six columns alignR pr20">35</div>
              </div>
              <div className="row">
                <div className="six columns alignL pl20">C</div>
                <div className="six columns alignR pr20">24</div>
              </div>
              <div className="row">
                <div className="six columns alignL pl20">D</div>
                <div className="six columns alignR pr20">9</div>
              </div>
              <div className="row">
                <div className="six columns alignL pl20">F</div>
                <div className="six columns alignR pr20">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
