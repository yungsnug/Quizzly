"use strict";

import React from 'react'

var Promise = require('bluebird');

/*
  Create Array of Colors to Shuffle Through
  When Displaying Chart Data
*/
var colorObjs = [];
var index = -1;
initColors();


function addColorObject(red, green, blue) {
  var color = {
    fillColor:   "rgba("+red+","+green+","+blue+",0.5)",
    strokeColor:    "rgba("+red+","+green+","+blue+",0.8)",
    highlightFill:    "rgba("+red+","+green+","+blue+",0.75)",
    highlightStroke:  "rgba("+red+","+green+","+blue+",1)",
  };
  // Add to Array
  colorObjs.push(color); // add to Color array
}
function initColors(){
  addColorObject(247, 70, 74); // red
  addColorObject(0, 255, 255); // turquoise
  addColorObject(252, 145, 16); // orange
  addColorObject(175, 116, 177); // purple
  addColorObject(27, 16, 252); // blue
  addColorObject(252, 16, 123); // rasberry
  addColorObject(16, 252, 145); // lime
}
function getNextIndex(){
  index++;
  if (index == colorObjs.length) {
    index = 0;
  }
  return index;
}
function getBarChartDataSets(barLabels, dataArrays) {
  var datasets = [];
  for (var i = 0; i < barLabels.length; i++) {
    var set = {
      label: barLabels[i],
      fillColor : colorObjs[getNextIndex()].fillColor,
      strokeColor : colorObjs[index].strokeColor,
      highlightFill: colorObjs[index].highlightFill,
      highlightStroke: colorObjs[index].highlightStroke,
      data : dataArrays[i],
    };
    datasets.push(set);
  }
  return datasets;
}
function getBarChartData(mainLabels, barLabels, dataArrays) {
  if (barLabels.length != dataArrays.length) {
    console.log("Invalid Parameters to getBarChartData(): barLabels.length & dataArrays.length need to match");
    return;
  }
  var chartData = {
    labels : mainLabels,
    datasets : getBarChartDataSets(barLabels, dataArrays),
  };
  return chartData;
}
function getSingleItemBarChartData(mainLabelString, barLabels, dataArray) {
  // Create Double Array from dataArray
  var doubleArray = [];
  for (var i = 0; i < dataArray.length; i++){
    var singleArray = [dataArray[i]];
    doubleArray.push(singleArray);
  }
  // Create Array from Main Label String
  var mainLabelArray = [mainLabelString];
  // Call getBarChartData() to Create Chart Data
  return getBarChartData(mainLabelArray, barLabels, doubleArray);
}
function getBarChartValueOptions(){
 var options = {
   responsive : true,
   maintainAspectRatio: true,
   animation: true,
   barValueSpacing : 5,
   barDatasetSpacing : 1,
   tooltipFillColor: "rgba(0,0,0,0.8)",                
   multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>"
 };
 return options;
}
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
      $.post('/quiz/find', {course: course.id}),
      $.post('/question/getQuestionsByCourseId', {id: course.id})
    ).then(function(sections, quizzes, questions) {
      // console.log("sections", sections);
      // console.log("quizzes", quizzes);
      // console.log("questions", questions);
      me.setState({
        sections: sections[0],
        quizzes: quizzes[0],
        questions: questions[0],

        isAllQuizzes: true,
        isAllQuestions: true,
        isAllAnswers: true
      });
    });
  }


  



  doMath(metricsData, res) {
    console.log("metricsData:", metricsData);
    var data;

    function get_selected(selection_array, selection_id) {
        var selection = [];
        if (selection_id == -1) {
          selection = selection_array;
        } else {
          //array starts at 0 position
          selection = selection_array[selection_id-1];
        }
        return selection;
    }
    var me = this;
    var selected_course = this.state.course;
    var selected_section = get_selected(this.state.sections, this.state.section.id);
    var selected_quiz = get_selected(this.state.quizzes, this.state.quiz.id);
    var selected_question = get_selected(this.state.questions, this.state.question.id);
    console.log("selected_quiz: ", selected_quiz);
    
    var quizzes_id = this.state.quiz.id;
    var section_id = this.state.section.id;
    var questions = this.state.questions;


    var datas;
    //Logic:
      //Bottom up approach (if question selected then quizzes and section already taken into account).
      //Likewise, if quiz selected the section is already taken into account
    //TODO data for graphs (only where /*Show*/)
    if (this.state.question.id == -1) {
      //all questions
      if (this.state.quiz.id == -1) {
          //all quizzes
          if (this.state.section.id == -1) {
              //all sections
              /*Show percent correct of each section*/
                //Labels will be sections
                console.log("section if statement!");

            } else {
              //section else
              /*Show percent correct of each quiz*/
              //Labels will be quizzes
              console.log("section else statement!");

            }
        } else {
            //Quiz else
            /*Show percent correct of each question*/
              //Labels will be questions
              console.log("quiz else statement!");
              var countsTotal = [];
               var labelsTotal = [];
              var count_i =0;
              var counter = 0;
              var questions_length = questions.length;
              var data = [];
              Promise.each(questions, function(question) {
                  count_i++;

                  me.getAnswers(question,function(answers){
          console.log("answers-outside: ", answers);
           
        var counts = [];
          var data = {};
          var counts_i=0;
          Promise.each(answers, function(answer) {
            return $.post('/studentanswer/getStudentCountByAnswerId/', {id: answer.id,section: section_id})
              .then(function(count){
                // if (counts_i==0){
                //   countsTotal.push(0);
                // }
                counts.push(count);
                
                counts_i++;
                // if(counts_i==answers.length) {
                //   countsTotal.push(0);
                //   counts_i =0;
                // }
                });

                }).then(function() {
                  console.log("counts3: ",counts);
                     console.log("answers_beforedata: ", answers);


                  var key = "data";
                  var obj = {
                              label: "My First dataset",
                              fillColor: "rgba(220,220,220,0.5)",
                              strokeColor: "rgba(220,220,220,0.8)",
                              highlightFill: "rgba(220,220,220,0.75)",
                              highlightStroke: "rgba(220,220,220,1)"

                              };
                  obj[key] = counts;
                  var datasets = [];
                  datasets.push(obj);
                  return datasets;
                }).then(function(datasets){

                      var labelsTemp = [];
                      var countsTemp = [];
                      for(var i in labelsTotal) {
                          labelsTemp.push(labelsTotal[i]);
                          countsTemp.push(countsTotal[i]);
                          
                      }
                      labelsTotal=[];
                      countsTotal=[];
                  var labelArray = [];
                    
                     for(var i in answers) {
                      // if (i_counts == 0) {
                      //   labelsTotal.push("Q"+(counter+1));
                      // }
                          labelArray.push(answers[i].option);
                          labelsTotal.push(answers[i].option);
                          countsTotal.push(counts[i]);
                          
                          
                          // if (i_counts == answers.length){
                          //   counter++;
                          //   labelsTotal.push(" ");
                          //   i_counts = 0;
                          // }
                      }
                      
                      console.log("labelsTotal: ", labelsTotal);
                      console.log("countsTotal: ", countsTotal);
                      for(var i in labelsTemp){
                        labelsTotal.push(labelsTemp[i]);
                        countsTotal.push(countsTemp[i]);
                        
                      }


                        // var chartData = {
                        //     labels : mainLabels,
                        //     datasets : getBarChartDataSets(barLabels, dataArrays),
                        //   };
                          // return chartData;
                          console.log("counter: ", counter);
                          console.log("count_i: ", count_i);
                          counter++;
                        if (counter == questions_length){
                      var quizName = selected_quiz.title; /* GET NAME OF QUIZ */
                  data = getSingleItemBarChartData(quizName, labelsTotal, countsTotal);
                      

                 console.log("data: ", data);
                    return res(data);
                  }

                });
                
                
        }); 
});

  

  
  
              
        }
    } else {
        //Question else
        /*Show all answers and number of students who answered question*/
          //Labels will be answers (put correct bar as green)
        console.log("question else statement!");
        //Get labels (answers for question)
        

        var answer_store = [];
        this.getAnswers(selected_question,function(answers){
          console.log("answers-outside: ", answers);
            answer_store = answers;
        var counts = [];
          var data = {};
          Promise.each(answers, function(answer) {
            return $.post('/studentanswer/getStudentCountByAnswerId/', {id: answer.id,section: section_id})
              .then(function(count){
                counts.push(count);

                });

                }).then(function() {
                  console.log("counts3: ",counts);
                     console.log("answers_beforedata: ", answers);


                  var key = "data";
                  var obj = {
                              label: "My First dataset",
                              fillColor: "rgba(220,220,220,0.5)",
                              strokeColor: "rgba(220,220,220,0.8)",
                              highlightFill: "rgba(220,220,220,0.75)",
                              highlightStroke: "rgba(220,220,220,1)"

                              };
                  obj[key] = counts;
                  var datasets = [];
                  datasets.push(obj);
                  return datasets;
                }).then(function(datasets){
                  var labelArray = [];
                     for(var i in answers) {
                          labelArray.push(answers[i].option);
                      }

                      var questionName = selected_question.text; /* GET NAME OF QUESTION */
                  data = getSingleItemBarChartData(questionName, labelArray, counts);
                  
                  console.log("data: ", data);
                    return data;
                }).then(function(data){
                    return res(data);
                });

        });


    }


    //http://stackoverflow.com/questions/25594478/different-color-for-each-bar-in-a-bar-chart-chartjs to change color

  }





  setData(labels, data, res) {
    var data = {
                        labels: labels,
                        datasets: [
                             {
                              label: "My First dataset",
                              fillColor: "rgba(220,220,220,0.5)",
                              strokeColor: "rgba(220,220,220,0.8)",
                              highlightFill: "rgba(220,220,220,0.75)",
                              highlightStroke: "rgba(220,220,220,1)",
                              data: data
                              }
                              ]
                            };
                            return res(data);

  }

  getStudentCounts(answers, res){
          var counts = [];

          Promise.each(answers, function(answer) {

            return $.post('/studentanswer/getStudentCountByAnswerId', {id: answer.id})
              .then(function(count){
                counts.push(count);

                });

                }).then(function() {
                  console.log("counts3: ",counts);
          //     }
                    res(counts);
                });



  }






  getAnswers(selected_question,res) {
    $.post('/answer/find', {question: selected_question.id})
            .then(function(answers_from_post) {
              console.log("answers_from_post: ", answers_from_post);
              return res(answers_from_post);
              // console.log("answers: ", answers);
            });

  }

  


  changeSection(event) {
    var section = this.state.section;
    section.id = event.target.value;
    var me = this;
    
    $.post('/question/getQuestionsByCourseId', {id: me.state.course.id})
    .then(function(questions) {
      me.setState({
      section: section,
      quiz: {id: -1},
      question: {id: -1},
      answer: {id: -1},

      questions: questions,
      answers: [],

      isAllQuizzes: true,
      isAllQuestions: true,
      isAllAnswers: true
    });
    });
  
  }

  changeQuiz(event) {
    var quiz = this.state.quiz;
    quiz.id = event.target.value;
    var me = this;
    if (quiz.id != -1){
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
  } else {
    $.post('/question/getQuestionsByCourseId', {id: me.state.course.id})
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
  }
    console.log("this: ", this);
    console.log("me: ", me);
  }

  changeQuestion(event) {
    var question = this.state.question;
    question.id = event.target.value;
    var event_target = event.target;
    var me = this;
    $.post('/answer/find', {question: question.id})
    .then(function(answers) {
      me.setState({
        question: event_target,
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
    // if (myNewChart) {
    //   myNewChart.destroy();
    // }



    $('#DivChartContainer').empty();
    $('#DivChartContainer').append('<canvas id="myChart" width="400" height="200"></canvas>');
    var ctx = document.getElementById("myChart").getContext("2d");
    ctx.canvas.width = 400;
    ctx.canvas.height = 200;

    var options = getBarChartValueOptions();
    this.doMath(1,function(data){
      var myNewChart = new Chart(ctx).Bar(data,options);
    });



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
                return <option key={questionIndex} value={questionIndex+1}>{question.text}</option>
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

        {<div>
          <div id="DivChartContainer"></div>

          </div>
        }
      </div>
    );
  }
}
