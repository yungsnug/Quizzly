"use strict";

import React from 'react'

var Promise = require('bluebird');


// Global Variable used to determine whether to use a bar or Line Chart
var isBarChartGlobal = true;
var isPercentGlobal = false;

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
    lineFillColor: "rgba("+red+","+green+","+blue+",0.2)",

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
/*
  Creates Data for a Line Chart where:
  Example:
    var mainLabels = ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4"];
    var pointLabels = ["Mary", "Joey", "Class Average"];
    var dataArrays = [[80, 60, 78, 92],[64, 62, 77, 83],[84, 65, 87, 86]];
*/
function getLineChartData(mainLabels, pointLabels, dataArrays) {
  if (pointLabels.length != dataArrays.length) {
    console.log("Invalid Parameters to getLineChartData(): pointLabels.length & dataArrays.length need to match");
    return;
  }
  var chartData = {
    labels : mainLabels,
    datasets : getLineChartDataSets(pointLabels, dataArrays),
  };
  return chartData;
}

function getLineChartDataSets(pointLabels, dataArrays) {
  var datasets = [];
  for (var i = 0; i < pointLabels.length; i++) {
    var set = {
      label: pointLabels[i],
      fillColor: colorObjs[getNextIndex()].lineFillColor,
      strokeColor: colorObjs[index].highlightFill,
      pointColor: colorObjs[index].highlightFill,
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: colorObjs[index].highlightFill,
      data: dataArrays[i],
    };
    datasets.push(set);
  }
  return datasets;
}

/*
  var mainLabelLine = ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4"];
  var pointLabelsLine = "Mary";
  var dataArraysLine = [80, 60, 78, 92];
*/
function getSingleItemLineChartData(mainLabels, pointLabel, dataArray) {
  // Create Double Array from dataArray
  var doubleArray = [];
  doubleArray.push(dataArray);

  // Create Array from point Label String
  var pointLabelArray = [];
  pointLabelArray.push(pointLabel);

  // Call getLineChartData() to Create Chart Data
  return getLineChartData(mainLabels, pointLabelArray, doubleArray);
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

function getBarChartPercentOptions(){
  var options = {
    responsive : true,
    animation: true,
    barValueSpacing : 5,
    barDatasetSpacing : 1,
    tooltipFillColor: "rgba(0,0,0,0.8)",
    multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>" + "%",
  };
  return options;
}

function getLineChartValueOptions(){
  var options = {
    responsive : true,
    animation: true,
    showScale: true,
    scaleBeginAtZero: true,
    multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>"
  };
  return options;
}

function getLineChartPercentOptions(){
  var options = {
    responsive : true,
    animation: true,
    showScale: true,
    scaleBeginAtZero: true,
    multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>" + "%"
  };
  return options;
}

function orderKeys(obj, expected) {
  var keys = Object.keys(obj).sort(function keyOrder(k1, k2) {
      if (k1 < k2) return -1;
      else if (k1 > k2) return +1;
      else return 0;
  });

  var i, after = {};
  for (i = 0; i < keys.length; i++) {
    after[keys[i]] = obj[keys[i]];
    delete obj[keys[i]];
  }

  for (i = 0; i < keys.length; i++) {
    obj[keys[i]] = after[keys[i]];
  }
  return obj;
}


export default class Metrics extends React.Component {
  constructor(props) {
    super(props);
    console.log("props.course", props.course);
    this.state = {
      course: props.course,
      sections: props.course.sections,
      students: [],
      quizzes: [],
      questions: [],

      section: {id: -1},
      // student: {id: -1, getFullName: function() {return "Conner Jack"}, firstName: "Jake"},
      student: {id: -1},
      quiz: {id: -1},
      question: {id: -1},

      allSections: {id: -1, title: "All"},
      allStudents: {id: -1, title: "All"},
      allQuizzes: {id: -1, title: "All"},
      allQuestions: {id: -1, title: "All"},

      isAllSectionsOptionAvailable: true,
      isAllStudentsOptionAvailable: true,
      isAllQuizzesOptionAvailable: true,
      isAllQuestionsOptionAvailable: true,
    }
  }

  componentDidMount() {
    console.log("in componentDidMount");
    this.populateDropdowns(this.props.course);
  }

  componentWillReceiveProps(newProps) {
    console.log("in componentWillReceiveProps");
    this.populateDropdowns(newProps.course);
  }

  populateDropdowns(course) {
    console.log("newProps", course);
    if(course.id == -1) return;
    console.log("course.id: ", course.id);
    var me = this;
    $.when(
      $.post('/section/find', {course: course.id}),
      $.post('/student/getStudentsByCourseId/' + course.id),
      $.post('/quiz/find', {course: course.id})
    ).then(function(sections, students, quizzes) {
      // console.log("sections", sections);
      // console.log("students", students);
      // console.log("quizzes", quizzes);
      me.setState({
        sections: sections[0],
        students: students[0],
        quizzes: quizzes[0],
        questions: [],
      });
    });
  }


  doMath(metricsData, res) {
    console.log("metricsData:", metricsData);
    var data;
    $("#AnswersContainer").html("");
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
    console.log("this: ", this);
    console.log("this.state.students: ", this.state.students);
    console.log("this.state.student.id: ", this.state.student.id);
    var selected_student = get_selected(this.state.students, this.state.student.id);
    console.log("selected_quiz: ", selected_quiz);
    console.log("this.state.quiz: ",this.state.quiz);

    var quizzes_id = this.state.quiz.id;
    var section_id = this.state.section.id;
    var questions = this.state.questions;
    var student_id=this.state.student.id;


    var datas;
    //Logic:
      //Bottom up approach (if question selected then quizzes and section already taken into account).
      //Likewise, if quiz selected the section is already taken into account
    //TODO data for graphs (only where /*Show*/)
    if (this.state.student.id == -1) {
    if (this.state.question.id == -1) {
      //all questions
      if (this.state.quiz.id == -1) {
          //all quizzes
          if (this.state.section.id == -1) {
              //all sections
              /*Show percent correct of each section*/
                //Labels will be sections
                console.log("section if statement!");
                isBarChartGlobal = true; // Bar Chart
                isPercentGlobal = true; // Percents
                //console.log("SELECTED COURSE", selected_course);

                var sectionsQuizNames = [];
                var sectionsPercentArray = [];
                var sectionsNames = [];
                console.log("selected_section", selected_section);
                var section_count = 0;
                Promise.each(selected_section, function(section){
                  var sectionTitle = "Section " + section.title;

                  

              //TOP
              
              var quiz = [];
              var quizTitleArray = [];
              var quizAnswerCorrectArray = [];
              var quizIDArray = [];
              $.post('/studentanswer/find', {section: section.id})
              .then(function(student_answer){
                console.log("student_answer: ", student_answer);

                student_answer.sort(function(a,b){
                  return parseInt(a.quiz.id) - parseInt(b.quiz.id);
                });



                return student_answer;

              }).then(function(student_answer_sorted){

                console.log("student_answer_sorted: ", student_answer_sorted);
                //For each quiz (calculate percent)
                if (student_answer_sorted.length > 0) {
                  var currentQuizId;
                  currentQuizId = student_answer_sorted[0].quiz.id;
                // quizIDArray.push(student_answer_sorted[0].quiz.id);
                // quizTitleArray.push(student_answer_sorted[0].quiz.title);
                

                // $.post('/answers/find', {student: selected_student.id})
                //  .then(function(student_answer){


                //  });

        var correctCountPerQuiz = 0; 
                // var totalPerQuiz = 0;
                // var percent;
                //iterate
          
        console.log("student_answer_sorted.length: ", student_answer_sorted.length);
        for(var i = 0; i < student_answer_sorted.length; i++) {
          //if answer == null then don't do anything
          if (student_answer_sorted[i].question.type == "multipleChoice") {

          
          if (currentQuizId != student_answer_sorted[i].quiz.id) {
            currentQuizId = student_answer_sorted[i].quiz.id;
            // percent = correctCountPerQuiz/totalPerQuiz;
            // console.log("percent: ",percent);
            
              // if (i != student_answer_sorted.length -1) {
                quizTitleArray.push(student_answer_sorted[i-1].quiz.title);
                quizIDArray.push(student_answer_sorted[i-1].quiz.id);
              // }

              quizAnswerCorrectArray.push(correctCountPerQuiz);
              console.log("1quizAnswerCorrectArray: ", quizAnswerCorrectArray);
              console.log("1quizTitleArray: ", quizTitleArray);
              correctCountPerQuiz = 0; 
              
              // totalPerQuiz = 0;
              // if (student_answer_sorted[i].answer.correct){
              //   correctCountPerQuiz++; 
              // }

              // totalPerQuiz++;

            } 
            if (i == student_answer_sorted.length -1){
              if (student_answer_sorted[i].answer.correct){
                correctCountPerQuiz++; 
              }
            // totalPerQuiz++;
            // percent = correctCountPerQuiz/totalPerQuiz;
            // console.log("percent: ",percent);
            quizTitleArray.push(student_answer_sorted[i].quiz.title);
            quizAnswerCorrectArray.push(correctCountPerQuiz);
            quizIDArray.push(student_answer_sorted[i].quiz.id);
            console.log("2quizAnswerCorrectArray: ", quizAnswerCorrectArray);
            console.log("2quizTitleArray: ", quizTitleArray);
            console.log("quizIDArray: ", quizIDArray);

            var totalQuestionsPerQuiz = [];
            var type = "multipleChoice";
            Promise.each(quizIDArray, function(quiz) {
              return $.post('/question/find', {quiz: quiz, type: type})
              .then(function(questions){
                totalQuestionsPerQuiz.push(questions.length);
                console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
              });
            }).then(function() {

              console.log("quizIDArray", quizIDArray);
            // for (var j = 0; j < quizIDArray.length; j++) {

            //     $.post('/question/find', {quiz: quizIDArray[j]})
            //       .then(function(questions){
            //         totalQuestionsPerQuiz.push(questions.length);
            //         console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            //     });
            // }
            console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            console.log("LastquizAnswerCorrectArray: ", quizAnswerCorrectArray);

            var totalStudents;
              //Get total number of students
              $.post('/student/getStudentsBySectionId/', {id: section.id})
              .then(function(students){
                  totalStudents = students.length;
                  console.log("totalStudents: ", totalStudents);
              

            //Calculate percentage
            var quizPercent = [];
            for (var k = 0; k < totalQuestionsPerQuiz.length; k++) {
              //more logic
              var num = (quizAnswerCorrectArray[k]/(totalQuestionsPerQuiz[k]*totalStudents))*100;
              quizPercent.push(num.toFixed(2));
            }

            //Percent
            console.log("quizPercent: ", quizPercent);
            console.log("sectionTitle: ", sectionTitle);
            //Quiz Name
            console.log("quizTitleArray: ", quizTitleArray);
            //if last one
            section_count++;
            sectionsPercentArray.push(quizPercent);
            sectionsQuizNames.push(quizTitleArray);
            sectionsNames.push(sectionTitle);
            console.log("sectionsPercentArray: ", sectionsPercentArray);
            console.log("sectionsQuizNames: ", sectionsQuizNames);
            console.log("sectionsNames: ", sectionsNames);

            if (section_count==selected_section.length){
              var sectionMet = {};
              sectionMet = me.createSectionMetric(sectionsNames, sectionsQuizNames, sectionsPercentArray);
              console.log("SECTION METRIC AFTER!!: ", sectionMet);
              data = getBarChartData(sectionMet.quizTitles, sectionMet.sectionTitles, sectionMet.quizPercents);

              console.log("data: ", data);
              return res(data);
            }
            });

          });


          } else {
            console.log("I: ",i);
            if (student_answer_sorted[i].answer.correct){
              correctCountPerQuiz++; 
            }
                      // totalPerQuiz++;
          }
          console.log("correctCountPerQuiz",correctCountPerQuiz);
        }
              // quizTitleArray.push(student_answer_sorted[i].quiz.title);
              // quizAnswerArray.push(student_answer_sorted[i]);
              // currentQuizId = 
        }
          } else {
        //if no answers at all



      }
              
});

  //BOTTOM
  });
            } else {
              //section else
              /*Show percent correct of each quiz*/
              //Labels will be ALL quizzes
              console.log("section else statement!");
              isBarChartGlobal = true; // Bar Chart
              isPercentGlobal = true; // Percents


              //TOP
              
              console.log("SELECTED_SECTION:", selected_section);
              var sectionTitle = "Section "+ selected_section.title;

              var quiz = [];
              var quizTitleArray = [];
              var quizAnswerCorrectArray = [];
              var quizIDArray = [];
              $.post('/studentanswer/find', {section: selected_section.id})
              .then(function(student_answer){
                console.log("student_answer: ", student_answer);

                student_answer.sort(function(a,b){
                  return parseInt(a.quiz.id) - parseInt(b.quiz.id);
                });



                return student_answer;

              }).then(function(student_answer_sorted){

                console.log("student_answer_sorted: ", student_answer_sorted);
                //For each quiz (calculate percent)
                if (student_answer_sorted.length > 0) {
                  var currentQuizId;
                  currentQuizId = student_answer_sorted[0].quiz.id;
                // quizIDArray.push(student_answer_sorted[0].quiz.id);
                // quizTitleArray.push(student_answer_sorted[0].quiz.title);
                

                // $.post('/answers/find', {student: selected_student.id})
                //  .then(function(student_answer){


                //  });

        var correctCountPerQuiz = 0; 
                // var totalPerQuiz = 0;
                // var percent;
                //iterate
          
        console.log("student_answer_sorted.length: ", student_answer_sorted.length);
        for(var i = 0; i < student_answer_sorted.length; i++) {
          //if answer == null then don't do anything
          if (student_answer_sorted[i].question.type == "multipleChoice") {

          
          if (currentQuizId != student_answer_sorted[i].quiz.id) {
            currentQuizId = student_answer_sorted[i].quiz.id;
            // percent = correctCountPerQuiz/totalPerQuiz;
            // console.log("percent: ",percent);
            
              // if (i != student_answer_sorted.length -1) {
                quizTitleArray.push(student_answer_sorted[i-1].quiz.title);
                quizIDArray.push(student_answer_sorted[i-1].quiz.id);
              // }

              quizAnswerCorrectArray.push(correctCountPerQuiz);
              console.log("1quizAnswerCorrectArray: ", quizAnswerCorrectArray);
              console.log("1quizTitleArray: ", quizTitleArray);
              correctCountPerQuiz = 0; 
              
              // totalPerQuiz = 0;
              // if (student_answer_sorted[i].answer.correct){
              //   correctCountPerQuiz++; 
              // }

              // totalPerQuiz++;

            } 
            if (i == student_answer_sorted.length -1){
              if (student_answer_sorted[i].answer.correct){
                correctCountPerQuiz++; 
              }
            // totalPerQuiz++;
            // percent = correctCountPerQuiz/totalPerQuiz;
            // console.log("percent: ",percent);
            quizTitleArray.push(student_answer_sorted[i].quiz.title);
            quizAnswerCorrectArray.push(correctCountPerQuiz);
            quizIDArray.push(student_answer_sorted[i].quiz.id);
            console.log("2quizAnswerCorrectArray: ", quizAnswerCorrectArray);
            console.log("2quizTitleArray: ", quizTitleArray);
            console.log("quizIDArray: ", quizIDArray);

            var totalQuestionsPerQuiz = [];
            var type = "multipleChoice";
            Promise.each(quizIDArray, function(quiz) {
              return $.post('/question/find', {quiz: quiz, type: type})
              .then(function(questions){
                totalQuestionsPerQuiz.push(questions.length);
                console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
              });
            }).then(function() {

              console.log("quizIDArray", quizIDArray);
            // for (var j = 0; j < quizIDArray.length; j++) {

            //     $.post('/question/find', {quiz: quizIDArray[j]})
            //       .then(function(questions){
            //         totalQuestionsPerQuiz.push(questions.length);
            //         console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            //     });
            // }
            console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            console.log("LastquizAnswerCorrectArray: ", quizAnswerCorrectArray);

            var totalStudents;
              //Get total number of students
              $.post('/student/getStudentsBySectionId/', {id: selected_section.id})
              .then(function(students){
                  totalStudents = students.length;
                  console.log("totalStudents: ", totalStudents);
              

            //Calculate percentage
            var quizPercent = [];
            for (var k = 0; k < totalQuestionsPerQuiz.length; k++) {
              var num = (quizAnswerCorrectArray[k]/(totalQuestionsPerQuiz[k]*totalStudents))*100;
              quizPercent.push(num.toFixed(2));
            }

            //Percent
            console.log("quizPercent: ", quizPercent);
            console.log("sectionTitle: ", sectionTitle);
            //Quiz Name
            console.log("quizTitleArray: ", quizTitleArray);

            data = getSingleItemBarChartData(sectionTitle, quizTitleArray, quizPercent);
            console.log("data: ", data);
            return res(data);
            });

          });


          } else {
            console.log("I: ",i);
            if (student_answer_sorted[i].answer.correct){
              correctCountPerQuiz++; 
            }
                      // totalPerQuiz++;
          }
          console.log("correctCountPerQuiz",correctCountPerQuiz);
        }
              // quizTitleArray.push(student_answer_sorted[i].quiz.title);
              // quizAnswerArray.push(student_answer_sorted[i]);
              // currentQuizId = 
        }
          } else {
        //if no answers at all


      }
              
});

  //BOTTOM
            }
        } else {
            //Quiz else
            /*Show percent correct of each question*/
            //Labels will be questions
            console.log("quiz else statement!");
            isBarChartGlobal = true; // Bar Chart
            isPercentGlobal = false; // Values


            var countsTotal = [];
            var labelsTotal = [];
            var countsArrays = []; // array of all counts for quiz - for metrics data
            var labelsArrays = [];
            var titlesArray = [];
            var count_i =0;
            var counter = 0;
            var questions_length = questions.length;
            var data = [];

            //Temp variables:
            var tempCountsArrays = [];
            var tempTitlesArray = [];
            var tempLabelsArrays = [];

            // questions.sort(function(a,b){
            //           return parseInt(b) - parseInt(a);
            // });
            var count_q = 0;
            console.log("QUESTIONS BEFORE***", questions);
            questions = selected_quiz.questions;
            console.log("QUESTIONS HERE***", questions);

            Promise.each(questions, function(question) {
              console.log("count_q_inside: ",count_q);
              if(question.type == "multipleChoice"){

              }else {
                count_q++;
                return;
              }

              me.getAnswers(question,function(answers){
                console.log("answers-outside: ", answers);
                var counts_r = [];
                var data = {};
                var counts_i=0;
                var lengthOfCounts = 0;
                // answers.sort(function(a,b){
                //       return parseInt(b.question) - parseInt(a.question);
                // });
                Promise.each(answers, function(answer) {
                  console.log("answer.id",answer.id);
                  console.log("section_id",section_id);
                  var holder;
                  if (section_id >0){
                    holder = {answer: answer.id,section: section_id};
                  } else {
                    holder = {answer: answer.id};
                  }
                  return $.post('/studentanswer/find/', holder)
                  .then(function(students_who_answered){
                    console.log("students_who_answered: ",students_who_answered);
                    if(students_who_answered.length > 0){
                      counts_r.push(students_who_answered);
                      return;
                    }
                    // counts_i++;
                    
                  }).then(function(){
                    console.log("counts_rINSIDE: ",counts_r);
                    console.log("answers: ", answers);
                    if (lengthOfCounts==counts_r.length){
                      // return;
                    } else {
                      var hash = {};
                      for (var n = 0; n < tempCountsArrays.length; n++) {
                        hash[tempCountsArrays[n]] = n;
                      }
                      if(hash.hasOwnProperty(counts_r)) {
                        console.log("COUNTS R EXISTS");
                      } else {
                        tempCountsArrays.push(counts_r);

                      }
                      tempTitlesArray.push(question);
                      tempLabelsArrays.push(answers);
                      lengthOfCounts=counts_r.length;
                      console.log("tempCountsArrays1: ", tempCountsArrays);
                      console.log("tempTitlesArray1: ", tempTitlesArray);
                      console.log("tempLabelsArrays1: ", tempLabelsArrays);
                      // return;
                    }
                    // }).then(function(){
                      counts_i++;
                      console.log("counts_i: ",counts_i);
                      return counts_i;
                    }).then(function(counts_a){
                      console.log("counts_i_inside: ",counts_i);
                      console.log("counts_a_inside: ",counts_a);
                      console.log("count_q_inside: ",count_q);
                      console.log("answers.length", answers.length);
                      console.log("questions.length", questions.length);
                    if (counts_a == answers.length && count_q == questions.length-1) {
                        console.log("end");
                        //SortArrays by question
                        console.log("<<<<<<< tempCountsArrays", tempCountsArrays);
                        tempCountsArrays.sort(function(a,b){
                            // for (var i in a)
                            console.log("<><><><><>A[0][0]:", a[0][0]);
                            return parseInt(a[0][0].question.id) - parseInt(b[0][0].question.id);
                        });

                        for (var d in tempCountsArrays){
                            tempCountsArrays[d].sort(function(a,b){
                            // for (var i in a)
                              return parseInt(a[0].question.id) - parseInt(b[0].question.id);
                            });
                        }
                        
                        

                        tempTitlesArray.sort(function(a,b){
                            return parseInt(a.id) - parseInt(b.id);
                        });

                        tempLabelsArrays.sort(function(a,b){
                            return parseInt(a[0].question.id) - parseInt(b[0].question.id); 
                        });
                      
                      console.log("tempCountsArrays2: ", tempCountsArrays);
                      console.log("tempTitlesArray2: ", tempTitlesArray);
                      console.log("tempLabelsArrays2: ", tempLabelsArrays);

                      console.log("tempTitlesArray2.length: ",tempTitlesArray.length);
                      // var k = 0;
                      // var tempCountsArrays1 = [];
                      // for (var p = 1; p <tempCountsArrays.length; p++){
                      //     // console.log("answers_from_student[k].question.id",answers_from_student[k].question);
                      //     // console.log("temp_answers_from_student[p].question.id", temp_answers_from_student[p].question);
                      //     if (tempCountsArrays1[k].question == tempCountsArrays[p].question){
                      //         // console.log("howdy");
                    
                      //     }else {
                      //         // console.log("hallelujah");
                      //         tempCountsArrays1.push(tempCountsArrays[p]);
                      //         k++;
                     
                      //     }
                      //   }
                      //   var k = 0;
                      // var tempTitlesArray1 = [];
                      // var tempTitlesArray2 = [];
                      // var tempTemp = [];
                      // tempTitlesArray1.push(tempTitlesArray[0]);
                      // for (var p = 0; p <tempTitlesArray.length; p++){
                      //     // console.log("answers_from_student[k].question.id",answers_from_student[k].question);
                      //     // console.log("temp_answers_from_student[p].question.id", temp_answers_from_student[p].question);
                      //     if (tempTitlesArray1[k].id == tempTitlesArray[p].id){
                      //         // console.log("howdy");
                      //         tempTemp.push(tempTitlesArray[p]);
                    
                      //     }else {
                      //         // console.log("hallelujah");
                      //         tempTitlesArray1.push(tempTitlesArray[p]);
                      //         tempTitlesArray2.push(tempTemp);
                      //         tempTemp = [];
                      //         k++;
                     
                      //     }
                      //   }
                      //   console.log("tempCountsArrays3: ", tempCountsArrays);
                      // console.log("tempTitlesArray3: ", tempTitlesArray);
                      // console.log("tempLabelsArrays3: ", tempLabelsArrays);

                        // var k = 0;
                        // var tempCountsArrays1 = [];
                        // for (var p = 1; p <tempCountsArrays.length; p++){
                        //   // console.log("answers_from_student[k].question.id",answers_from_student[k].question);
                        //   // console.log("temp_answers_from_student[p].question.id", temp_answers_from_student[p].question);
                        //     if (tempCountsArrays1[k].question == tempCountsArrays[p].question){
                        //       // console.log("howdy");
                    
                        //    }else {
                        //       // console.log("hallelujah");
                        //        tempCountsArrays1.push(tempCountsArrays[p]);
                        //         k++;
                     
                        //    }
                        // }


                        //Get values into submission form
                        // for (var v in tempTitlesArray){
                        var k =0;
                        var tempTemp = [];
                        tempTemp.push(tempTitlesArray[0]);
                        for(var v in tempTitlesArray) {
                          // console.log("titlesArray[k]",titlesArray[k]);
                          // console.log("tempTitlesArray[v]",tempTitlesArray[v]);
                            if (tempTemp[k].id == tempTitlesArray[v].id) {

                            } else {
                              tempTemp.push(tempTitlesArray[v]); //still need to get .text
                              k++;
                          }
                        }

                        for(var v in tempTemp) {
                          titlesArray.push(tempTemp[v].text);
                        }

                        console.log("titlesArray: ", titlesArray);
                        // Promise.each(tempTitlesArray,function(title){
                        //   titlesArray.push(title);
                        // });
                      // }

                        var k =0;
                        var tempTemp = [];
                        tempTemp.push(tempLabelsArrays[0]);
                        for(var v in tempLabelsArrays) {
                          // console.log("titlesArray[k]",titlesArray[k]);
                          // console.log("tempTitlesArray[v]",tempTitlesArray[v]);
                            if (tempTemp[k][0].question == tempLabelsArrays[v][0].question) {

                            } else {
                              tempTemp.push(tempLabelsArrays[v]); //still need to get .text
                              k++;
                          }
                        }


                        var temp2= [];
                        var s2 = 0;
                        for (var b in tempTemp) {
                            // console.log("tempLabelsArrays[b]",tempLabelsArrays[b]);
                            // console.log("tempLabelsArrays[b].length",tempLabelsArrays[b].length);
                            for (var v in tempTemp[b]) {
                                // console.log("tempLabelsArrays[b][v]",tempLabelsArrays[b][v]);
                                temp2.push(tempTemp[b][v].option); //still need to get .option
                                // console.log("temp2: ", temp2);
                                 s2++;
                                if (s2 == tempTemp[b].length) {
                                    // console.log("temp2: ", temp2);
                                    labelsArrays.push(temp2);
                                    temp2 = [];
                                    s2=0
                                }
                            }
                        }

                        console.log("labelsArrays: ", labelsArrays);
                        // for (var b = 0; b < tempLabelsArrays.length; b++) {
                        //     // console.log("tempLabelsArrays[b]",tempLabelsArrays[b]);
                        //     // console.log("tempLabelsArrays[b].length",tempLabelsArrays[b].length);
                        //     for (var v = 0; v< tempLabelsArrays[b].length;v++) {
                        //         // console.log("tempLabelsArrays[b][v]",tempLabelsArrays[b][v]);
                        //         temp2.push(tempLabelsArrays[b][v].option); //still need to get .option
                        //         // console.log("temp2: ", temp2);
                        //          // s2++;
                        //         if (b == tempLabelsArrays[b].length-1) {
                        //             // console.log("temp2: ", temp2);
                        //             labelsArrays.push(temp2);
                        //             temp2 = [];
                        //             // s2=0
                        //         }
                        //     }
                        // }

                        // var tempCountsArraysCount = 0;
                        // for(var b in tempCountsArrays) {
                        //   tempCountsArraysCount++;
                        // }

                        var k =0;
                        var tempTempC = [];
                        tempTempC.push(tempCountsArrays[0]);
                        for(var v in tempCountsArrays) {
                          // console.log("titlesArray[k]",titlesArray[k]);
                          // console.log("tempTitlesArray[v]",tempTitlesArray[v]);
                            if (tempTempC[k][0][0].question == tempCountsArrays[v][0][0].question) {

                            } else {
                              tempTempC.push(tempCountsArrays[v]); //still need to get .text
                              k++;
                          }
                        }
                        console.log("tempTempC: ", tempTempC);

                        var temp1 = [];
                        var s1 = 0;
                        for (var b in tempTemp) {
                            // console.log("tempCountsArrays[b]",tempCountsArrays[0]);
                            // console.log("tempCountsArrays[b].length",tempCountsArrays[0].length);
                            // console.log("tempCountsArrays[b]",tempCountsArrays[0]);
                            // console.log("tempCountsArrays[b].length",tempCountsArrays[0].length);
                            for (var v in tempTemp[b]) {
                                // console.log()
                                var found = 0;
                                // var countsp = 0;
                                var countAnswered = 0;
                                for (var p in tempTempC) {
                                  for (var w in tempTempC[p]) {
                                // if (b < tempCountsArrays.length){
                                // if(v < tempCountsArrays[b].length){
                                  // var countp = 0;
                                  // for (var p in tempCountsArrays[b]){
                                // console.log("tempCountsArrays[b][0][0].answer.id",tempCountsArrays[p][0][0].answer.id);
                                // console.log("tempLabelsArrays[b][v]",tempLabelsArrays[b][v]);
                                // console.log("tempLabelsArrays[b][v].id",tempLabelsArrays[b][v].id);
                                // console.log("tempLabelsArrays[b][v]",tempCountsArrays[b][v]);
                                // countsp++;
                                // console.log("tempTemp[b]: ", tempTemp[b]);
                                console.log("tempTemp[b]: ", tempTemp[b][v].id);

                                console.log("tempTempC[p]: ",tempTempC[p]);
                                // console.log("tempTempC[p][0]: ",tempTempC[p][0]);
                                console.log("tempTempC[p][0][0]: ",tempTempC[p][w][0].answer.id);
                                if (tempTempC[p][w][0].answer.id == tempTemp[b][v].id){
                                    // console.log("tempCountsArrays[b][0].length",tempCountsArrays[b][0].length);
                                    console.log("tempTempC INSIDE");
                                    console.log("tempTempC[p].length", tempTempC[p].length);
                                    temp1.push(tempTempC[p][w].length);
                                    found = 1;
                                } 
                                // else if (found == 0 && countsp == tempCountsArrays.length) {
                                //     // temp1.push(0);
                                //   } 

                                }
                              }
                                if (found == 1) {
                                    // temp1.push(countAnswered);

                                    // found = 0;
                                  } else {
                                    temp1.push(0);
                                  }
                                  
                                // }
                                
                                    // temp1.push(tempCountsArrays[b][v].length); //get length

                                    // console.log("temp1: ", temp1);
                                    s1++;
                                    // console.log("tempLabelsArrays[b].length", tempLabelsArrays[b].length);
                                    // console.log("s1", s1);
                                    if (s1 == tempTemp[b].length) {
                                        console.log("temp1: ", temp1);
                                        countsArrays.push(temp1);
                                        temp1 = [];
                                        s1=0;
                                    }
                                  }

                            // }
                          // }
                        }


                        console.log("COUNTS ARRAY - ALL: ", countsArrays);
                        console.log("TITLES ARRAY - ALL: ", titlesArray);
                        console.log("LABELS ARRAY - ALL: ", labelsArrays);


                        

                        





                        var quizMet = {};

                        quizMet = me.createQuizMetric(titlesArray, labelsArrays, countsArrays);
                        console.log("QUIZ METRIC IN DO MATH: ", quizMet);
                        data = getBarChartData(quizMet.questionTitles, quizMet.barLabels, quizMet.barCounts);

                        var complete_text = "";
                        for(var r = 0; r < titlesArray.length;r++){
                        complete_text += "<h2>" + titlesArray[r] + ":</h2> <hr COLOR='grey' SIZE='2'>";
                        for (var k = 0; k < tempTemp[r].length; k++){
                          if (tempTemp[r][k].correct){
                             complete_text+="<font color='green'>";
                          }
                          complete_text += tempTemp[r][k].option + ": " + tempTemp[r][k].text + "<br/><br/>";
                          if (tempTemp[r][k].correct){
                             complete_text+="</font>";
                          }
                         }
                       }
            // }
                        


                        $("#AnswersContainer").html(complete_text);

                        console.log("data: ", data);
                        return res(data);


                        // return counts_i;
                    } else if (counts_a == answers.length) {
                      console.log("counts_i_MAXAMILLION IS PISSED AT SPENCER: ", counts_i);
                      counts_i = 0;
                      count_q++;
                      console.log("here");
                      // return counts_i;
                    } 
                    


                    return;
                  }).then(function(){
                    
                    
                  });

                });
                /*.then(function(counts1) {
                  if (counts1.length > 0) {
                  } else {
                    // return;
                    // counts = 0;
                  }

                  console.log("counts1: ",counts1);
                  console.log("counts_r: ",counts_r);
                  console.log("answers_beforedata: ", answers);

                  labelsTotal=[];
                  countsTotal=[];

                  // student_answer.sort(function(a,b){
                  //     return parseInt(a.quiz.id) - parseInt(b.quiz.id);
                  // });
                  
                  var tempLabelsTotal = [];
                  var tempCountsTotal = [];
                  
                  for(var i in answers){

                    tempLabelsTotal.push(answers[i]);
                    // if (i == 0){
                     // tempCountsTotal.push(counts[i]);
                    // }
                    
                  }
                  tempCountsTotal.push(counts1);
                  
                  if (tempLabelsTotal.length > 0) {
                    tempCountsArrays.push(tempCountsTotal);
                    tempTitlesArray.push(question);
                  }
                  if (tempLabelsTotal.length > 0) {
                    
                    tempLabelsArrays.push(tempLabelsTotal);
                  }

                  // for(var i in answers) {
                  //   labelsTotal.push(answers[i].option);
                  //   countsTotal.push(counts[i]);
                  // }
                  // if (countsTotal.length > 0) {
                  //   countsArrays.push(countsTotal);
                  //   titlesArray.push(question.text);
                  // }
                  // if (labelsTotal.length > 0) {
                  //   labelsArrays.push(labelsTotal);
                  // }
                  console.log("1TEMP LABELS TOTAL - ALL: ", tempLabelsTotal);
                  console.log("1TEMP COUNTS ARRAY - ALL: ", tempCountsArrays);
                  tempCountsArrays.sort(function(a,b){
                      return parseInt(a[0].question) - parseInt(b[0].question);
                  });

                  tempTitlesArray.sort(function(a,b){
                      return parseInt(a.id) - parseInt(b.id);
                  });

                  tempLabelsArrays.sort(function(a,b){
                      return parseInt(a[0].question) - parseInt(b[0].question); 
                  });

                  console.log("2TEMP COUNTS ARRAY - ALL: ", tempCountsArrays);
                  console.log("2TEMP TITLES ARRAY - ALL: ", tempTitlesArray);
                  console.log("2TEMP LABELS ARRAY - ALL: ", tempLabelsArrays);



                  if (counter == questions_length-1){
                  var temp1 = [];
                  var s1 = 0;
                  for (var b = 0; b < tempLabelsArrays.length; b++) {
                    // console.log("tempCountsArrays[b]",tempCountsArrays[b]);
                    // console.log("tempCountsArrays[b].length",tempCountsArrays[b].length);
                      for (var v in tempLabelsArrays[b]) {
                        console.log("tempCountsArrays[b]",tempCountsArrays[b]);
                        if (tempCountsArrays[b])
                        temp1.push(0);
                        // temp1.push(tempCountsArrays[b][v].length); //get length

                        console.log("temp1: ", temp1);
                        s1++;
                        if (s1 = tempLabelsArrays[b].length-1) {
                          console.log("temp1: ", temp1);
                          countsArrays.push(temp1);
                          temp1 = [];
                          s1=0;
                        }
                      }
                  }
                  // var temp2 = [];
                  for (var b = 0; b < tempTitlesArray.length; b++) {
                      titlesArray.push(tempTitlesArray[b].text); //still need to get .text
                  }
                  var temp2= [];
                  var s2 = 0;
                  for (var b = 0; b < tempLabelsArrays.length; b++) {
                    // console.log("tempLabelsArrays[b]",tempLabelsArrays[b]);
                    // console.log("tempLabelsArrays[b].length",tempLabelsArrays[b].length);
                      for (var v in tempLabelsArrays[b]) {
                        // console.log("tempLabelsArrays[b][v]",tempLabelsArrays[b][v]);
                        temp2.push(tempLabelsArrays[b][v].option); //still need to get .option
                        // console.log("temp2: ", temp2);
                        s2++;
                        if (s2 = tempLabelsArrays[b].length-1) {
                          // console.log("temp2: ", temp2);
                          labelsArrays.push(temp2);
                          temp2 = [];
                          s2=0
                        }
                    }
                  }
                }

                  console.log("COUNTS ARRAY - ALL: ", countsArrays);
                  console.log("TITLES ARRAY - ALL: ", titlesArray);
                  console.log("LABELS ARRAY - ALL: ", labelsArrays);
                

                  console.log("counter: ", counter);
                  console.log("count_i: ", count_i);
                  counter++;
                  if (counter == questions_length){
                    console.log("SET DATA");
                    var quizMet = {};

                    quizMet = me.createQuizMetric(titlesArray, labelsArrays, countsArrays);
                    console.log("QUIZ METRIC IN DO MATH: ", quizMet);
                    data = getBarChartData(quizMet.questionTitles, quizMet.barLabels, quizMet.barCounts);

                    console.log("data: ", data);
                    return res(data);
                  }
              });*/
          }); 
        });
      }
    } else {
        //Question else
        /*Show all answers and number of students who answered question*/
        console.log("question else statement!");
        isBarChartGlobal = true; // Bar Chart
        isPercentGlobal = false; // Values

        //Get labels (answers for question)
        if (selected_question.type == "multipleChoice") {
        
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

            var labelArray = [];
            for(var i in answers) {
              labelArray.push(answers[i].option);
            }

            var questionName = selected_question.text; /* GET NAME OF QUESTION */
            data = getSingleItemBarChartData(questionName, labelArray, counts);

            // var complete_text = "<h2>Student Answers:</h2> <hr COLOR='black' SIZE='2'>";
            // var text = "text";
            // var student = "student";
            // var email = "email";
            // $("#AnswersContainer").
            var complete_text = "";
            // for (var l = 0; l < questionName.length; l++) {
                complete_text += "<h2>" + questionName + ":</h2> <hr COLOR='grey' SIZE='2'>";
                for (var k = 0; k < labelArray.length; k++){
                  if (answers[k].correct){
                    complete_text+="<font color='green'>";
                  }
                  complete_text += labelArray[k] + ": " + answers[k].text + "<br/><br/>";
                  if (answers[k].correct){
                    complete_text+="</font>";
                  }
                }
            // }



            $("#AnswersContainer").html(complete_text);
            console.log("data: ", data);
            return data;
          }).then(function(data){
            return res(data);
          });
      });
} else {
  //view free response question
  $.post('/studentanswer/find/', {question: selected_question.id})
    .then(function(student_answers){
      console.log("student_answer: ", student_answers);

      // console.log("student_answer.text: ", student_answers[0].text);
      var complete_text = "<h2>Student Answers:</h2> <hr COLOR='grey' SIZE='2'>";
      var text = "text";
      var student = "student";
      var email = "email";
      for (var l = 0; l < student_answers.length; l++) {
        complete_text += student_answers[l][student][email] + ": " + student_answers[l][text] + "<br/><br/>";
      }

      
      return complete_text;
      
    }).then(function(text){
      $("#AnswersContainer").html("");
      $("#DivChartContainer").html(text);

    });

}
      

    }
  } else {
    //Student else
    // $('#sections_div').selected();
    // var e= document.getElementById("sections_div");
    // e.options[]
    //Need student id
    // selected_student.
    if (this.state.question.id == -1) {
      //all questions
      if (this.state.quiz.id == -1) {

      

    console.log("Single Student Metrics");
    isBarChartGlobal = false; // Line Chart
    isPercentGlobal = true; // Values

    console.log("selected_student: ",selected_student);
    var studentSection;

    for (var p = 0; p <selected_student.sections.length; p++){
      console.log("selected_student.sections[p].course: ", selected_student.sections[p].course);
      console.log("me.props.course.id ", me.props.course.id);
      if (selected_student.sections[p].course == me.props.course.id) {
          studentSection = selected_student.sections[p];
           console.log("INSIDE: studentSection: ", studentSection);
      }
    } 
    console.log("studentSection: ", studentSection);
    //By section get all students
    //need average grade per section


    var quizSectionTitleArray = [];
    var quizSectionIDArray = [];
    var quizSectionAnswerCorrectArray = [];
    $.post('/studentanswer/find', {section: studentSection.id})
      .then(function(section_student_answers){
        //calculate average and percent
        section_student_answers.sort(function(a,b){
          return parseInt(a.quiz.id) - parseInt(b.quiz.id);
        });
        
        return section_student_answers;

      }).then(function(section_sorted_student_answers){
//TOP
    if (section_sorted_student_answers.length > 0) {
        var currentSectionQuizId;
        currentSectionQuizId = section_sorted_student_answers[0].quiz.id;
        // quizIDArray.push(student_answer_sorted[0].quiz.id);
        // quizTitleArray.push(student_answer_sorted[0].quiz.title);
        

        // $.post('/answers/find', {student: selected_student.id})
        //  .then(function(student_answer){


        //  });

        var correctCountPerQuizSection = 0; 
        // var totalPerQuiz = 0;
        // var percent;
        //iterate
        console.log("student_answer_sorted.length: ", section_sorted_student_answers.length);
        for(var g = 0; g < section_sorted_student_answers.length; g++) {
          if (section_sorted_student_answers[g].question.type == "multipleChoice") {

          if (currentSectionQuizId != section_sorted_student_answers[g].quiz.id) {
            currentSectionQuizId = section_sorted_student_answers[g].quiz.id;
            // percent = correctCountPerQuiz/totalPerQuiz;
            // console.log("percent: ",percent);
            
              // if (i != student_answer_sorted.length -1) {
                quizSectionTitleArray.push(section_sorted_student_answers[g-1].quiz.title);
                quizSectionIDArray.push(section_sorted_student_answers[g-1].quiz.id);
              // }

              quizSectionAnswerCorrectArray.push(correctCountPerQuizSection);
              console.log("1quizSectionAnswerCorrectArray: ", quizSectionAnswerCorrectArray);
               console.log("1quizSectionTitleArray: ", quizSectionTitleArray);
              correctCountPerQuizSection = 0; 
              
              // totalPerQuiz = 0;
              // if (student_answer_sorted[i].answer.correct){
              //   correctCountPerQuiz++; 
              // }

              // totalPerQuiz++;
            
          } 
          if (g == section_sorted_student_answers.length -1){
            if (section_sorted_student_answers[g].answer.correct){
              correctCountPerQuizSection++; 
            }
            // totalPerQuiz++;
            // percent = correctCountPerQuiz/totalPerQuiz;
            // console.log("percent: ",percent);
            quizSectionTitleArray.push(section_sorted_student_answers[g].quiz.title);
            quizSectionAnswerCorrectArray.push(correctCountPerQuizSection);
            quizSectionIDArray.push(section_sorted_student_answers[g].quiz.id);
            console.log("2quizSectionAnswerCorrectArray: ", quizSectionAnswerCorrectArray);
            console.log("2quizSectionTitleArray: ", quizSectionTitleArray);
            console.log("quizSectionIDArray: ", quizSectionIDArray);
            // console.log("quizIDArray")
            var totalQuestionsPerQuizSection = [];
            var type_section = "multipleChoice";
            var questions_later = [];
          Promise.each(quizSectionIDArray, function(quiz_section) {
            return $.post('/question/find', {quiz: quiz_section, type: type_section})
              .then(function(questions_section){
                questions_later.push(questions_section);
                totalQuestionsPerQuizSection.push(questions_section.length);
                console.log("totalQuestionsPerQuizSection", totalQuestionsPerQuizSection);
            });
          }).then(function() {

            console.log("quizSectionIDArray", quizSectionIDArray);
            // for (var j = 0; j < quizIDArray.length; j++) {

            //     $.post('/question/find', {quiz: quizIDArray[j]})
            //       .then(function(questions){
            //         totalQuestionsPerQuiz.push(questions.length);
            //         console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            //     });
            // }
            console.log("totalQuestionsPerQuizSection", totalQuestionsPerQuizSection);
            console.log("LastquizSectionAnswerCorrectArray: ", quizSectionAnswerCorrectArray);

            var totalStudents;
              //Get total number of students
              $.post('/student/getStudentsBySectionId/', {id: studentSection.id})
              .then(function(students_section){
                  totalStudents = students_section.length;
                  console.log("totalStudents: ", totalStudents);

            //Calculate percentage
            var quizSectionPercent = [];
            for (var f = 0; f < totalQuestionsPerQuizSection.length; f++) {
              var num = (quizSectionAnswerCorrectArray[f]/(totalQuestionsPerQuizSection[f]*totalStudents))*100;
              quizSectionPercent.push(num.toFixed(2));
            }

            //Percent
//AVERAGE DATA!!!!!!!!            
            console.log("quizSectionPercent: ", quizSectionPercent);
            // console.log("studentName: ", studentName);
            var studentNameSection = "average";
            //Quiz Name
            console.log("quizSectionTitleArray: ", quizSectionTitleArray);

            // data = getSingleItemLineChartData(quizSectionTitleArray, studentNameSection, quizSectionPercent);
            // console.log("data: ", data);
            // return res(data);

            console.log("selected_student: ", selected_student);
    //Need students answers
    var studentName = selected_student.firstName;
    var quiz = [];
    var quizTitleArray = [];
    var quizAnswerCorrectArray = [];
    var quizIDArray = [];
    $.post('/studentanswer/find', {student: selected_student.id})
      .then(function(student_answer){
        console.log("student_answer: ", student_answer);
        
        student_answer.sort(function(a,b){
          return parseInt(a.quiz.id) - parseInt(b.quiz.id);
        })
        
        

       return student_answer;

      }).then(function(student_answer_sorted){

        // console.log("student_answer_sorted: ", student_answer_sorted);
        //For each quiz (calculate percent)
        if (student_answer_sorted.length > 0) {
        var currentQuizId;
        currentQuizId = student_answer_sorted[0].quiz.id;
        // quizIDArray.push(student_answer_sorted[0].quiz.id);
        // quizTitleArray.push(student_answer_sorted[0].quiz.title);
        

        // $.post('/answers/find', {student: selected_student.id})
        //  .then(function(student_answer){


        //  });

        var correctCountPerQuiz = 0; 
        // var totalPerQuiz = 0;
        // var percent;
        //iterate
        // console.log("student_answer_sorted.length: ", student_answer_sorted.length);
        var quizFound = 0;
        // var prevQuestionSectionID = questions_section[0];
        // console.log("quizSectionIDArray: ", quizSectionIDArray);
        var previousId = 0;
        for (var d = 0; d < quizSectionIDArray.length; d++) {
        for (var o = 0; o < questions_later[d].length; o++) {


        for(var i = 0; i < student_answer_sorted.length; i++) {
          // console.log("student_answer_sorted[i].question.id: ", student_answer_sorted[i].question.id);
          // console.log("questions_section[o]: ", questions_later[o].id);
          // if ((student_answer_sorted[i].question.id==questions_later[o].id) && (student_answer_sorted[i].question.type == "multipleChoice")){
          //   console.log("quizFound");
          //     quizFound = 1;
          // }
          // if ((i == student_answer_sorted.length-1) && quizFound ==0) {
          //   console.log("hello");
          //     quizTitleArray.push(quizSectionTitleArray[o]);
          //     quizIDArray.push(quizSectionIDArray[o]);
          //     quizAnswerCorrectArray.push(0);
          //     // correctCountPerQuiz = 0;
          // }
          // if ((i == student_answer_sorted.length-1) && quizFound ==1) {
          //   quizFound = 0;
          //   // correctCountPerQuiz = 0;
          // }
          // if (currentQuizId == student_answer_sorted[0].quiz.id) {
          //   correctCountPerQuiz = 0;
          // }

           
          // // if (student_answer_sorted[i].question.type == "multipleChoice"){
          // if ((currentQuizId != student_answer_sorted[i].quiz.id) && currentQuizId != student_answer_sorted[0].quiz.id) {
          //   console.log("here");
            
          //   currentQuizId = student_answer_sorted[i].quiz.id;
          //   // percent = correctCountPerQuiz/totalPerQuiz;
          //   // console.log("percent: ",percent);
            
          //     // if (i != student_answer_sorted.length -1) {
          //       quizTitleArray.push(student_answer_sorted[i-1].quiz.title);
          //       quizIDArray.push(student_answer_sorted[i-1].quiz.id);
          //     // }

          //     quizAnswerCorrectArray.push(correctCountPerQuiz);
          //     console.log("1quizAnswerCorrectArray: ", quizAnswerCorrectArray);
          //      console.log("1quizTitleArray: ", quizTitleArray);
          //     correctCountPerQuiz = 0;
          //     // quizFound = 0; 
              
              
          //   // }
              
          //     // totalPerQuiz = 0;
          //     // if (student_answer_sorted[i].answer.correct){
          //     //   correctCountPerQuiz++; 
          //     // }

          //     // totalPerQuiz++;
            
          // } 

          if (previousId != d) {
            console.log("push");
              previousId = d;
              quizTitleArray.push(questions_later[d-1][0].quiz.title);
              quizIDArray.push(questions_later[d-1][0].quiz.id);
              quizAnswerCorrectArray.push(correctCountPerQuiz);
              correctCountPerQuiz = 0;
          }
          console.log("student_answer_sorted[i].question.id: ", student_answer_sorted[i].question.id);
          console.log("questions_section[o].id: ", questions_later[d][o].id);
            if ((i == student_answer_sorted.length -1) && (o == questions_later[quizSectionIDArray.length-1].length-1) && (d==quizSectionIDArray.length-1)){
           if ((student_answer_sorted[i].question.type == "multipleChoice") && (student_answer_sorted[i].question.id==questions_later[d][o].id)){
            if (student_answer_sorted[i].answer.correct){
              correctCountPerQuiz++; 
            }
            console.log("correctCountPerQuizININNerSIDE: ", correctCountPerQuiz);
            // totalPerQuiz++;
            // percent = correctCountPerQuiz/totalPerQuiz;
            // console.log("percent: ",percent);
            quizTitleArray.push(student_answer_sorted[i].quiz.title);
            quizAnswerCorrectArray.push(correctCountPerQuiz);
            quizIDArray.push(student_answer_sorted[i].quiz.id);
            console.log("2quizAnswerCorrectArray: ", quizAnswerCorrectArray);
            console.log("2quizTitleArray: ", quizTitleArray);
            // console.log("quizIDArray: ", quizIDArray);
          }
            var totalQuestionsPerQuiz = [];
            var type = "multipleChoice";
          Promise.each(quizIDArray, function(quiz) {
            return $.post('/question/find', {quiz: quiz, type: type})
              .then(function(questions){
                totalQuestionsPerQuiz.push(questions.length);
                // console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            });
          }).then(function() {

            // console.log("quizIDArray", quizIDArray);
            // for (var j = 0; j < quizIDArray.length; j++) {

            //     $.post('/question/find', {quiz: quizIDArray[j]})
            //       .then(function(questions){
            //         totalQuestionsPerQuiz.push(questions.length);
            //         console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            //     });
            // }
            // console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
            // console.log("LastquizAnswerCorrectArray: ", quizAnswerCorrectArray);


            //Calculate percentage
            var quizPercent = [];
            for (var k = 0; k < totalQuestionsPerQuiz.length; k++) {
                quizPercent.push((quizAnswerCorrectArray[k]/totalQuestionsPerQuiz[k])*100);
            }

            //Student
            //Percent
            // console.log("quizPercent: ", quizPercent);
            // console.log("studentName: ", studentName);
            //Quiz Name
            // console.log("quizTitleArray: ", quizTitleArray);

            //AVERAGE DATA!!!!!!!! 
            //Percent           
            // console.log("quizSectionPercent: ", quizSectionPercent);
            // console.log("studentName: ", studentName);
            var studentNameSection = "Average";
            //Quiz Name
            // console.log("quizSectionTitleArray: ", quizSectionTitleArray);

            var finalQuizTitles = [];
            var finalStudentNames = [];
            var finalPercents = [];
            // Add Student Data
            finalQuizTitles.push(quizTitleArray);
            finalStudentNames.push(studentName);
            finalPercents.push(quizPercent);
            // Add Average Data
            finalQuizTitles.push(quizSectionTitleArray);
            finalStudentNames.push(studentNameSection);
            finalPercents.push(quizSectionPercent);

            /*
            var sectionMet = {};
              sectionMet = me.createSectionMetric(sectionsNames, sectionsQuizNames, sectionsPercentArray);
              console.log("SECTION METRIC AFTER!!: ", sectionMet);
              data = getBarChartData(sectionMet.quizTitles, sectionMet.sectionTitles, sectionMet.quizPercents);
            */
            var lineMet = {};
            lineMet = me.createSectionMetric(finalStudentNames, finalQuizTitles, finalPercents);
            console.log("STUDENT LINE DATA: ", lineMet);
            data = getLineChartData(lineMet.quizTitles, lineMet.sectionTitles, lineMet.quizPercents);
            console.log("data: ", data);
            return res(data);
              

        });


          } else if ((student_answer_sorted[i].question.id==questions_later[d][o].id)){
            console.log("increment");
            if (student_answer_sorted[i].answer.correct){
               correctCountPerQuiz++;
            }
          }
          console.log("correctCountPerQuiz",correctCountPerQuiz);
              
            
            }
          }
        }
            } else {
        


      }

      });

    

              
          });
        });


          } else {

            if (section_sorted_student_answers[g].answer.correct){
              correctCountPerQuizSection++; 

            }
            // totalPerQuiz++;
          }
          console.log("correctCountPerQuiz",correctCountPerQuizSection);
              // quizTitleArray.push(student_answer_sorted[i].quiz.title);
              // quizAnswerArray.push(student_answer_sorted[i]);
              // currentQuizId = 
            }
            }
            } else {
        //if no answers at all


      }

      });

    
} else {
  //else student quizzes
  console.log("selected_student", selected_student);
  var prevQuizID;
  var quizCount = 0;
  var questionCount = 0;
  // console.log("me.state.course: ", me.state.course);
  // $.post('/quiz/find/',{course: me.state.course})
  //   .then(function(quizzes){
      // console.log("quizzes: ",quizzes);
      // prevQuizID = quizzes[0].id;
      // quizCount++;
      var questionsForQuiz = [];
      // Promise.each(quizzes, function(quiz){ 

        $.post('/question/find/',{quiz: selected_quiz.id})
        .then(function(questions){
          console.log("question: ", questions);
          Promise.each(questions, function(question){
          //Get Question Names
          if(question.type == "multipleChoice") {
            //Whatever data you want pushed
            questionsForQuiz.push(question);
          }
          // if (prevQuizID != quiz.id){
          //   quizCount++;
          //   quizQuestionNamesArray.push(questionsForQuiz); 
          //   questionsForQuiz = [];
          // }
          if(questionCount == questions.length - 1) {
            questionCount++;
            console.log("questionCount: ", questionCount);
            console.log("questions.length: ", questions.length);
            console.log("questionsForQuiz: ", questionsForQuiz);

            //here we are done with getting all question names
            //now we want to get what student answered for each of these questions/fill in dummy zeros
            var resultsCorrect = [];
            var found = 0;
            $.post('/studentanswer/find/',{student: selected_student.id, quiz: selected_quiz.id})
              .then(function(studentanswers){
              // console.log("student: ", student);
              console.log("studentanswers: ", studentanswers);
                // var k = 0;
                // for(var i in questionsForQuiz) {
                //     for (var k in studentanswers){
                      
                //       if (studentanswers[k].question.id = questionsForQuiz[i].id){
                //         var correct = k.answer.correct;
                //         resultsCorrect.push(correct);
                //           found = 1;
                        
                //       } else if (k == studentanswers.length -1 && !found) {
                //         resultsCorrect.push(0);
                //         console.log("resultsCorrectInside1: ", resultsCorrect);
                //       }
                     
                //       if (k == studentanswers.length-1) {
                //         found = 0;
                //         console.log("resultsCorrectInside2: ", resultsCorrect);
                //       } else {
                //         k++;
                //       }
                //     } 
                // }
                var temp_answers_from_student = [];
                for (var l = 0; l < studentanswers.length;l++){
                    if (studentanswers[l].question.type == "multipleChoice"){
                    temp_answers_from_student.push(studentanswers[l].answer);
                  }
                }
                console.log("temp_answers_from_student: ",temp_answers_from_student);


                temp_answers_from_student.sort(function(a,b){
                  return parseInt(a.question) - parseInt(b.question);
                });

                var answers_from_student = [];
                // var answers_from_student = [];
                var k = 0;
                answers_from_student.push(temp_answers_from_student[0]);
                for (var p = 1; p <temp_answers_from_student.length; p++){
                    console.log("answers_from_student[k].question.id",answers_from_student[k].question);
                    console.log("temp_answers_from_student[p].question.id", temp_answers_from_student[p].question);
                    if (answers_from_student[k].question == temp_answers_from_student[p].question){
                    console.log("howdy");
                    
                    }else {
                      console.log("hallelujah");
                      answers_from_student.push(temp_answers_from_student[p]);
                      k++;
                     
                    }
                
                }
                
                
                console.log("answers_from_student ", answers_from_student);
                console.log("HEREEEEE questionsForQuiz: ", questionsForQuiz);

                return answers_from_student;

            }).then(function(answers_return) {
                console.log("answers_return",answers_return);

              var complete_text = "";
            // for (var l = 0; l < questionName.length; l++) {
              console.log("questionsForQuiz",questionsForQuiz); //Just iterate and get .text
              for(var i = 0; i < questionsForQuiz.length; i++) { // iterate over each questions
                complete_text += "<h2>" + questionsForQuiz[i].text + ":</h2> <hr COLOR='grey' SIZE='2'>";
                console.log("LOOPING OVER questionsForQuiz: ", questionsForQuiz);
                for (var k = 0; k < questionsForQuiz[i].answers.length; k++){ // iterate over each answer
                  console.log("LOOPING OVER questionsForQuiz[i].answers: ", questionsForQuiz[i].answers);
                 // for (var j = 0; j < answers_return.length; j ++) { // iterate over THIS students answers
                  //console.log("LOOPING OVER answers_return[j]", questionsForQuiz[i].answers);

                    if (answers_return[i].id == questionsForQuiz[i].answers[k].id) { // Student's Answer
                      complete_text+= "<strong>";
                    } 

                    if (questionsForQuiz[i].answers[k].correct) {
                      complete_text+="<font color='green'>";
                    }

                    complete_text += questionsForQuiz[i].answers[k].option + ": " + questionsForQuiz[i].answers[k].text + "<br/><br/>";

                    if (questionsForQuiz[i].answers[k].correct) {
                      complete_text+="</font>";
                    }

                    if (answers_return[i].id == questionsForQuiz[i].answers[k].id) { // Student's Answer
                      complete_text+= "</strong>";
                    }
                 // } 
                }
              }

                // for(var i = 0; i < questionsForQuiz.length; i++) {
                //     for (var k = 0; k<answers_return.length; k++){
                //       // console.log("questionsForQuiz[i]",questionsForQuiz[i].id);
                //       // console.log("answers_return[k]",answers_return[k]);
                //       // console.log("answers_return[k].question",answers_return[k].question);
                //       console.log("k: ", k);
                //       console.log("answers_return.length", answers_return.length);
                //       // console.log("answers_return[k].question.id",answers_return[k].question.id);
                //       if (answers_return[k].question == questionsForQuiz[i].id){
                //         var correct = answers_return[k].correct;
                //         if (correct) {
                //           resultsCorrect.push(1);
                //          } else {
                //           resultsCorrect.push(0);
                //          }
                //         found = 1;
                //         console.log("resultsCorrectInside0: ", resultsCorrect);
                //       }
                //       if (k == answers_return.length -1 && !found) {
                //         resultsCorrect.push(0);
                //         console.log("resultsCorrectInside1: ", resultsCorrect);
                //       } else if (k == answers_return.length-1) {
                //         found = 0;
                //         console.log("resultsCorrectInside2: ", resultsCorrect);
                //       } else {
                        
                //       }
                //     } 
                // }

                // console.log("questionsForQuiz",questionsForQuiz); //Just iterate and get .text
                // var labelsArray = [];
                // for (var i in questionsForQuiz){
                //   labelsArray.push(questionsForQuiz[i].text);
                // }
                // console.log("labelsArray: ",labelsArray); //Just iterate and get .text
                // console.log("resultsCorrectOutside: ", resultsCorrect);



                // var complete_text = "";
                //         for(var r = 0; r < labelsArray.length;r++){
                //           if (resultsCorrect[r] == 1){
                //              complete_text+="<font color='green'>";
                //           } else {
                //               complete_text+="<font color='red'>";
                //           }
                //           var index = r+1;
                //           complete_text += "<h2>" + index + ". " + labelsArray[r] + "</h2> <hr COLOR='grey' SIZE='2'>";
                          
                //           complete_text+="</font>";
                //        }



                        $("#DivChartContainer").html(complete_text);



            });


        
          } else {
            questionCount++;
          }

          // console.log("questionNames: ",questionNames);
          });

        });


      // });
      

    // });

  // $.post('/question/find/',{quiz: })
  //   .then(function(){

  //   });

  // $.post('/studentanswer/find/',{student: selected_student.id, quiz: selected_quiz.id})
  //   .then(function(student){
        
  //       console.log("student: ", student);
  //       for(var i = 0; i < student.length; i++) {
  //         if (student.question.type = "multipleChoice"){


  //         }

  //       }
  //   });




}
}else {
  //student question
  console.log("student question");
  if (selected_question.type == "multipleChoice"){
  $.post('/studentanswer/find/', {student: selected_student.id, quiz: selected_quiz.id, question: selected_question.id})
    .then(function(answer){
      console.log("answer: ", answer);
      // console.log("answer: ")
      // var answer1 = "answer";
      // console.log("answer[answer]", answer[answer1]);
        return answer[0];



        }).then(function(answer_return){
            var studentAnswered = answer_return.answer.id;
            console.log("studentAnswered: ", studentAnswered);
                //find other answers
            var answerValues = [];
            $.post('/answer/find/', {question: answer_return.question.id})
              .then(function(answers){
                  for(var i = 0; i < answers.length; i++) {
                    if (studentAnswered == answers[i].id) {
                        answerValues.push(1);
                    } else {
                        answerValues.push(0);
                    }
                  }

                  console.log("answerValues", answerValues);
                  console.log("answers", answers); //get .option and/or .text


              var complete_text = "";
            // for (var l = 0; l < questionName.length; l++) {
                complete_text += "<h2>" + answer_return.question.text + ":</h2> <hr COLOR='grey' SIZE='2'>";
                for (var k = 0; k < answers.length; k++){
                  if (answerValues[k] > 0){
                    complete_text+= "<strong>";
                  }
                  if (answers[k].correct){
                    complete_text+="<font color='green'>";
                  }
                  complete_text += answers[k].option + ": " + answers[k].text + "<br/><br/>";
                  if (answers[k].correct){
                    complete_text+="</font>";
                  }
                  if (answerValues[k] > 0){
                    complete_text+= "</strong>";
                  }
                }
            // }



            $("#DivChartContainer").html(complete_text);


        });

        

    });

} else {
  //if free response 
  //display free response

  $.post('/studentanswer/find/', {question: selected_question.id, student: selected_student.id})
    .then(function(student_answers){
      console.log("student_answer: ", student_answers);
      // console.log("student_answer.text: ", student_answers[0].text);
      var complete_text = "<h2>Student Answers:</h2> <hr COLOR='grey' SIZE='2'>";
      var text = "text";
      var student = "student";
      var email = "email";
      for (var l = 0; l < student_answers.length; l++) {
        complete_text += student_answers[l][student][email] + ": " + student_answers[l][text] + "<br/><br/>";
      }

      
      return complete_text;
      
    }).then(function(text){
      
      $("#DivChartContainer").html(text);

    });

}
}

  }

}

createQuizMetric(titlesTotal, labelsTotal, countsTotal){
  console.log("Titles in QuizMetric: ", titlesTotal);
  console.log("Labels in QuizMetric: ", labelsTotal);
  console.log("Counts in QuizMetric: ", countsTotal);

  var questionsBarCounts = [];
  var answerCount = 1;
  var labelArray = [];

  for (var i = 0; i < labelsTotal.length; i++) {
    if (labelsTotal[i].length > answerCount) {
      answerCount = labelsTotal[i].length;
      labelArray = labelsTotal[i];
    }
  }
  console.log("Label Array: ", labelArray);

  //add Dummy Data to barCounts
  for (var i = 0; i < labelArray.length; i++){
    var thisCounts = [];
    for (var j = 0; j < countsTotal.length; j++) {
      if (i >= countsTotal[j].length) {
        thisCounts.push(0);
      } else {
        thisCounts.push(countsTotal[j][i]);
      }
    }
    questionsBarCounts.push(thisCounts)
  }
  console.log("COUNTS ARRAY: ", questionsBarCounts);

  var quizMetric = {
    questionTitles: [],
    barLabels: [],
    barCounts: [],
  };
  quizMetric.questionTitles = titlesTotal;
  quizMetric.barLabels = labelArray;
  quizMetric.barCounts = questionsBarCounts;
  console.log("************* QUIZ METRIC ", quizMetric);
  return quizMetric;
}

createSectionMetric(secTitles, quizTitlesArrays, quizPercentsArrays){
  console.log("Section Titles in SectionMetric: ", secTitles);
  console.log("Quiz Title Arrays in SectionMetric: ", quizTitlesArrays);
  console.log("Quiz Percents in SectionMetric: ", quizPercentsArrays);

  var sectionsQuizPercents = [];
  var answerCount = 1;
  var sectionsQuizTitles = [];

  for (var i = 0; i < quizTitlesArrays.length; i++) {
    if (quizTitlesArrays[i].length > answerCount) {
      answerCount = quizTitlesArrays[i].length;
      sectionsQuizTitles = quizTitlesArrays[i];
    }
  }
  console.log("MAX Quiz Titles: ", sectionsQuizTitles);

  //add Dummy Data to barCounts
  for (var i = 0; i < quizPercentsArrays.length; i++){
    while (quizPercentsArrays[i].length < answerCount) { // if less than answer Count
      quizPercentsArrays[i].push(0);
    }
  }
  console.log("PERCENTS ARRAY: ", quizPercentsArrays);

  var sectionMetric = {
    sectionTitles: [],
    quizTitles: [],
    quizPercents: [],
  };
  sectionMetric.sectionTitles = secTitles;
  sectionMetric.quizTitles = sectionsQuizTitles;
  sectionMetric.quizPercents = quizPercentsArrays;
  console.log("************* SECTION METRIC", sectionMetric);
  return sectionMetric;
}



  getAnswers(selected_question,res) {
    $.post('/answer/find', {question: selected_question.id})
      .then(function(answers_from_post) {
          console.log("answers_from_post: ", answers_from_post);
          return res(answers_from_post);
      });
  }


  changeSection(event) {
    var section = this.state.section;
    section.id = event.target.value;
    var me = this;

    if(section.id != -1) { // specific section
      $.post('/student/getStudentsBySectionId/' + section.id)
      .then(function(students) {
        me.setState({
          section: section,
          student: {id: -1},

          students: students,

          isAllSectionsOptionAvailable: true,
          isAllStudentsOptionAvailable: true,
        });
      });
    } else { // all sections
      $.when(
        $.post('/student/getStudentsByCourseId/' + this.state.course.id),
        $.post('/section/find', {course: this.state.course.id})
      )
      .then(function(students, sections) {
        me.setState({
          section: {id: -1},
          student: {id: -1},

          sections: sections[0],
          students: students[0],

          isAllSectionsOptionAvailable: true,
          isAllStudentsOptionAvailable: true,
        });
      });
    }
  }


  changeStudent(event) {
    var student = this.state.student;
    student.id = event.target.value;
    var me = this;

    if(student.id != -1) { // specific student
      $.post('/section/getSectionByStudentAndCourse/', {courseId: this.state.course.id, studentId: student.id})
      .then(function(section) {
        me.setState({
          section: section,
          student: student,

          sections: [section],
        });
      });
    } else { // all students
      $.post('/section/find', {course: this.state.course.id})
      .then(function(sections) {
        me.setState({
          student: {id: -1},

          sections: sections,
        });
      });
    }
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

          questions: questions,
        });
      });
    } else {
      me.setState({
        quiz: quiz,
        question: {id: -1},

        questions: [],
      });
    }
  }

  changeQuestion(event) {
    var question = this.state.question;
    question.id = event.target.value;
    this.setState({
      question: question,
    });
  }

  changeStudent(event) {
    var student = this.state.student;
    student.id = event.target.value;
    var event_target = event.target;
    var me = this;
    // $.post('/student/getStudentsByCourseId', {question: question.id})
    // .then(function(answers) {
      me.setState({
        // question: event_target,
        // answer: {id: -1},
        quiz: {id: -1},
        question: {id: -1},
        answer: {id: -1},
        student: student,
        
        // answers: answers,
        // students: [],

        isAllQuizzes: false,
        isAllQuestions: false,
        isAllAnswers: false,
        isAllStudents: false
      // });
    // });
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


    this.doMath(1, function(data){
      if (isBarChartGlobal) {
        console.log('IS BAR CHART');
        var options;
        if (isPercentGlobal) {
          console.log("Percent");
          options = getBarChartPercentOptions();
        } else {
          console.log("Values");
          options = getBarChartValueOptions();
        }
        var myNewChart = new Chart(ctx).Bar(data,options);
      } else {
        console.log('IS LINE CHART');
        var options = getLineChartPercentOptions();
        var myNewChart = new Chart(ctx).Line(data,options);
      }
    });

  }


  render() {
    return (
      <div id="metrics" className="quizzlyContent">
        <div className="flexHorizontal">
          <div>
            <div id="sections_div" className="small ml10">Sections</div>
            <select value={this.state.section.id} className="dropdown mr10" onChange={this.changeSection.bind(this)}>
              {this.state.isAllSectionsOptionAvailable ? <option value={this.state.allSections.id}>{this.state.allSections.title}</option> : null }
              {this.state.sections.map(function(section, sectionIndex) {
                return <option key={sectionIndex} value={sectionIndex+1}>{section.title}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Students</div>
            <select value={this.state.student.id} className="dropdown mr10" onChange={this.changeStudent.bind(this)}>
              {this.state.isAllStudentsOptionAvailable ? <option value={this.state.allStudents.id}>{this.state.allStudents.title}</option> : null }
              {this.state.students.map(function(student, studentIndex) {
                return <option key={studentIndex} value={studentIndex+1}>{student.firstName}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Quizzes</div>
            <select value={this.state.quiz.id} className="dropdown mr10" onChange={this.changeQuiz.bind(this)}>
              {this.state.isAllQuizzesOptionAvailable ? <option value={this.state.allQuizzes.id}>{this.state.allQuizzes.title}</option> : null }
              {this.state.quizzes.map(function(quiz, quizIndex) {
                return <option key={quizIndex} value={quizIndex+1}>{quiz.title}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Questions</div>
            <select value={this.state.question.id} className="dropdown mr10" onChange={this.changeQuestion.bind(this)}>
              {this.state.isAllQuestionsOptionAvailable ? <option value={this.state.allQuestions.id}>{this.state.allQuestions.title}</option> : null }
              {this.state.questions.map(function(question, questionIndex) {
                return <option key={questionIndex} value={questionIndex+1}>{question.text}</option>
              })}
            </select>
          </div>
          <button onClick={this.getMetrics.bind(this)}>GET METRICS</button>
        </div>

        {<div>
          <div id="DivChartContainer" className="metricsText"></div>
          <div id="AnswersContainer" className="metricsText"></div>
          </div>
        }
      </div>
    );
  }
}
