"use strict";

import React from 'react'

export default class Metrics extends React.Component {
  constructor(props) {
    super(props);
    console.log("props.course", props.course);
    this.state = {
      course: props.course,
      sections: props.course.sections,
      quizzes: [],
      questions: [],
      answers: [],

      section: {id: -1},
      quiz: {id: -1},
      question: {id: -1},
      answer: {id: -1},

      allSections: {id: -1, title: "All"},
      allQuizzes: {id: -1, title: "All"},
      allQuestions: {id: -1, title: "All"},
      allAnswers: {id: -1, title: "All"},

      isAllQuizzes: true,
      isAllQuestions: true,
      isAllAnswers: true
    }
  }

  componentDidMount() {
    this.populateDropdowns(this.props.course);
    // $.post('/getData', {studentid: 1})
    // .then(function(metricsData) {
    //   var ctx = document.getElementById("myChart").getContext("2d");
    //   var myNewChart = new Chart(ctx).PolarArea(this.doMath(metricsData));
    // });
  }

  componentWillReceiveProps(newProps) {
    this.populateDropdowns(newProps.course);
  }

  populateDropdowns(course) {
    console.log("newProps", course);
    if(course.id == -1) return;
    var me = this;
    $.when(
      $.post('/section/find', {course: course.id}),
      $.post('/quiz/find', {course: course.id})
      // $.post('/question/findByCourseId', {course: course.id})
    ).then(function(sections, quizzes) {
      console.log("sections", sections);
      console.log("quizzes", quizzes);
      // console.log("quizzes", questions);
      me.setState({
        sections: sections[0],
        quizzes: quizzes[0],
        // questions: questions[0],

        isAllQuizzes: true,
        isAllQuestions: true,
        isAllAnswers: true
      });
    });
  }



  doMath(metricsData) {
    // asdf asd asdf sdf
    // return metricsData;
    console.log("data:", metricsData);
    // var data = {
    //   [
    //     {
    //       section: 1,
    //       quiz: 1,
    //       question: 1,
    //       answer: 2,
    //       student: -1

    //     },



    //   ]
    // }

    var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    return data;

  }

  changeSection(event) {
    var section = this.state.section;
    section.id = event.target.value;
    var me = this;
    me.setState({
      section: section,
      quiz: {id: -1},
      question: {id: -1},
      answer: {id: -1},

      questions: [],
      answers: [],
      
      isAllQuizzes: true,
      isAllQuestions: true,
      isAllAnswers: true
    });
  }

  changeQuiz(event) {
    var quiz = this.state.quiz;
    quiz.id = event.target.value;
    var me = this;
    $.post('/question/find', {quiz: quiz.id})
    .then(function(questions) {
      me.setState({
        quiz: quiz,
        question: {id: -1},
        answer: {id: -1},

        questions: questions,
        answers: [],

        isAllQuizzes: false,
        isAllQuestions: true,
        isAllAnswers: true
      });
    });
    console.log("this: ", this);
    console.log("me: ", me);
  }

  changeQuestion(event) {
    var question = this.state.question;
    question.id = event.target.value;
    var me = this;
    $.post('/answer/find', {question: question.id})
    .then(function(answers) {
      me.setState({
        question: question,
        answer: {id: -1},

        answers: answers,

        isAllQuizzes: false,
        isAllQuestions: false,
        isAllAnswers: true
      });
    });
  }

  changeAnswer(event) {
    var answer = this.state.answer;
    answer.id = event.target.value;
    var me = this;
    me.setState({
      answer: answer,

      isAllQuizzes: false,
      isAllQuestions: false,
      isAllAnswers: false
    });
  }

  getMetrics() {
    console.log("getting metrics...");
    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Bar(this.doMath(1));
    

    $("#myChart").click(function(evt){
      var activeBars = myNewChart.getBarsAtEvent(evt);
      console.log(activeBars[0]);
      alert(activeBars[0].label);
    });
  }


  /*
    //Calling getBarsAtEvent(event) on your Chart instance passing an argument of an event, or jQuery event, will return the bar elements that are at that the same
    //position of that event.

    canvas.onclick = function(evt){
      var activeBars = myBarChart.getBarsAtEvent(evt);
      // => activeBars is an array of bars on the canvas that are at the same position as the click event.
    };
  */

  render() {
    return (
      <div id="metrics" className="quizzlyContent">
        <div className="flexHorizontal">
          <div>
            <div className="small ml10">Sections</div>
            <select value={this.state.section.id} className="dropdown mr10" onChange={this.changeSection.bind(this)}>
              <option value={this.state.allSections.id}>{this.state.allSections.title}</option>
              {this.state.sections.map(function(section, sectionIndex) {
                return <option key={sectionIndex} value={section.id}>{section.title}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Quizzes</div>
            <select value={this.state.quiz.id} className="dropdown mr10" onChange={this.changeQuiz.bind(this)}>
              <option value={this.state.allQuizzes.id}>{this.state.allQuizzes.title}</option>
              {this.state.quizzes.map(function(quiz, quizIndex) {
                return <option key={quizIndex} value={quiz.id}>{quiz.title}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Questions</div>
            <select value={this.state.question.id} className="dropdown mr10" onChange={this.changeQuestion.bind(this)}>
              <option value={this.state.allQuestions.id}>{this.state.allQuestions.title}</option>
              {this.state.questions.map(function(question, questionIndex) {
                return <option key={questionIndex} value={question.id}>{question.text}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Answers</div>
            <select value={this.state.answer.id} className="dropdown mr10" onChange={this.changeAnswer.bind(this)}>
              <option value={this.state.allAnswers.id}>{this.state.allAnswers.title}</option>
              {this.state.answers.map(function(answer, answerIndex) {
                return <option key={answerIndex} value={answer.id}>{answer.text}</option>
              })}
            </select>
          </div>
          <button onClick={this.getMetrics.bind(this)}>GET METRICS</button>
        </div>

        {<canvas id="myChart" width="400" height="400"></canvas>}
      </div>
    );
  }
}
