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
                  var sectionTitle = section.title;

                  

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
              quizPercent.push((quizAnswerCorrectArray[k]/(totalQuestionsPerQuiz[k]*totalStudents))*100);
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
              data = getSingleItemLineChartData(quizTitleArray, studentName, quizPercent);
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
                    counts.push(count);
                    counts_i++;
                  });

                }).then(function() {
                  console.log("counts3: ",counts);
                  console.log("answers_beforedata: ", answers);

                  labelsTotal=[];
                  countsTotal=[];

                  for(var i in answers) {
                 
                    labelsTotal.push(answers[i].option);
                    countsTotal.push(counts[i]);
                  }
                  if (countsTotal.length > 0) {
                    countsArrays.push(countsTotal);
                    titlesArray.push(question.text);
                  }
                  if (labelsTotal.length > 0) {
                    labelsArrays.push(labelsTotal);
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
              });
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
      var complete_text = "<h2>Student Answers:</h2> <hr COLOR='black' SIZE='2'>";
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
  } else {
    //Fill the section
    // $('#sections_div').selected();
    // var e= document.getElementById("sections_div");
    // e.options[]
    //Need student id
    // selected_student.
    console.log("Single Student Metrics");
    isBarChartGlobal = false; // Line Chart
    isPercentGlobal = true; // Values

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


            //Calculate percentage
            var quizPercent = [];
            for (var k = 0; k < totalQuestionsPerQuiz.length; k++) {
                quizPercent.push((quizAnswerCorrectArray[k]/totalQuestionsPerQuiz[k])*100);
            }

            //Percent
            console.log("quizPercent: ", quizPercent);
            console.log("studentName: ", studentName);
            //Quiz Name
            console.log("quizTitleArray: ", quizTitleArray);

            data = getSingleItemLineChartData(quizTitleArray, studentName, quizPercent);
            console.log("data: ", data);
            return res(data);
              

        });


          } else {

            if (student_answer_sorted[i].answer.correct){
              correctCountPerQuiz++; 
            }
            // totalPerQuiz++;
          }
          console.log("correctCountPerQuiz",correctCountPerQuiz);
              // quizTitleArray.push(student_answer_sorted[i].quiz.title);
              // quizAnswerArray.push(student_answer_sorted[i]);
              // currentQuizId = 
            }
            }
            } else {
        //if no answers at all


      }

      });

    //For each quiz
      //Need to check each answer for correctness
      //Total number of questions


      // var totalQuestionsPerQuiz = [];
      // // Promise.each(quizIDArray, function(quiz) {
      // //     $.post('/questions/find', {quiz: quizIDArray[i]})
      // //       .then(function(questions){
      // //         totalQuestionsPerQuiz.push(questions.length);
      // //     });
      // //   });
      // console.log("quizIDArray", quizIDArray);
      // for (var i = 0; i < quizIDArray.length; i++) {

      //     $.post('/questions/find', {quiz: quizIDArray[i]})
      //       .then(function(questions){
      //         totalQuestionsPerQuiz.push(questions.length);
      //     });
      // }
      // console.log("totalQuestionsPerQuiz", totalQuestionsPerQuiz);
      // console.log("LastquizAnswerCorrectArray: ", quizAnswerCorrectArray);


      // //Calculate percentage
      // var quizPercent = [];
      // for (var i = 0; i < totalQuestionsPerQuiz.length; i++) {
      //     quizPercent.push(quizAnswerCorrectArray[i]/totalQuestionsPerQuiz[i]);
      // }

      // //Percent
      // console.log("quizPercent: ", quizPercent);
      // //Quiz Name
      // console.log("quizTitleArray: ", quizTitleArray);


      


  }

}

createQuizMetric(titlesTotal, labelsTotal, countsTotal){
  console.log("Titles in QuizMetric: ", titlesTotal);
  console.log("Labels in QuizMetric: ", labelsTotal);
  console.log("Counts in QuizMetric: ", countsTotal);

  var questionsBarCounts = [];
  var questionsBarLabels = [];
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


createMultiQuestionLabelsAndCounts(quizId, sectionId) {
  var me = this;
  var questionsMetric = {
    questionTitles: [],
    barLabels: [],
    barCounts: [],
    totalResponses: 0,
    correctResponses: 0,
    quizTitle: 0,
  };

  return $.post('/question/find', {quiz: quizId })
  .then(function(questions){
    console.log("Before Promise, questions ", questions);
    Promise.each(questions, function(question) {
      if (question.type != "freeResponse") {
        me.createLabelsAndCounts(sectionId, question.id)
        .then(function(questionMetric){
            questionsMetric.questionTitles.push(questionMetric.title);
            questionsMetric.barCounts.push(questionMetric.counts);
            questionsMetric.barLabels.push(questionMetric.labels);
            questionsMetric.totalResponses += parseInt(questionMetric.numResponses);
            questionsMetric.correctResponses += parseInt(questionMetric.numCorrect);
            questionsMetric.quizTitle = questionMetric.quizTitle;
            console.log("%%%%%%%%%%%%%%%%%%% questionsMetric", questionsMetric);
        });
      }
    })
    return questionsMetric;
  });
}


createLabelsAndCounts(sectionId, questionId) {
  var data = {};
  data.question = questionId;
  if(sectionId != -1) {
    data.section = sectionId;
  }
  return $.post('/studentanswer/find', data)
  .then(function(studentAnswers) {
    console.log("studentAnswers: ", studentAnswers);
    var labels = [];
    var counts = [];
    var barMetrics = {};
    var totalResponses = 0;
    var correctAnswer;
    var numCorrectResponses = 0;

    studentAnswers.map(function(studentAnswer) {
      if (isNaN(barMetrics[studentAnswer.answer.option])) {
        barMetrics[studentAnswer.answer.option] = parseInt(barMetrics[studentAnswer.answer.option]);
        barMetrics[studentAnswer.answer.option] = 1;
      } else {
        barMetrics[studentAnswer.answer.option] += 1;
      }
      if (studentAnswer.answer.correct == true) {
        correctAnswer = studentAnswer.answer.option;
      }
    });

    barMetrics = orderKeys(barMetrics);

    for (var label in barMetrics){
      labels.push(label);
      counts.push(barMetrics[label]);
      totalResponses += parseInt(barMetrics[label]);
    }

    numCorrectResponses = parseInt(barMetrics[correctAnswer]);

    var questionMetric  = {
      title: studentAnswers[0].question.text,
      labels: labels,
      counts: counts,
      numResponses: totalResponses,
      numCorrect: numCorrectResponses,
      quizTitle: studentAnswers[0].quiz.title,
    };
    console.log("++++++++++++++++++++++ question Metric: ", questionMetric);
    return questionMetric;
  });
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

    // if (isBarChartGlobal) {
    //   console.log('IS BAR CHART');
    //   var options = getBarChartValueOptions();
    //   this.doMath(1, function(data){
    //     var myNewChart = new Chart(ctx).Bar(data,options);
    //   });
    // } else {
    //   console.log('IS LINE CHART');
    //   var options = getLineChartPercentOptions();
    //   this.doMath(1, function(data){
    //     var myNewChart = new Chart(ctx).Line(data,options);
    //   });
    // }
    


    // $("#myChart").click(function(evt){
    //   var activeBars = myNewChart.getBarsAtEvent(evt);
    //   console.log(activeBars[0]);
    //   alert(activeBars[0].label);
    // });
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
                return <option key={quizIndex} value={quiz.id}>{quiz.title}</option>
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
          <div id="DivChartContainer"></div>

          </div>
        }
      </div>
    );
  }
}
