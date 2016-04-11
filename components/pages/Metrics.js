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
    multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>"
  };
  return options;
}

function getLineChartPercentOptions(){
  var options = {
    responsive : true,
    animation: true,
    showScale: true,
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
      student: {id: -1, getFullName: function() {return "Conner Jack"}, firstName: "Jake"},
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
                //console.log("SELECTED COURSE", selected_course);


            } else {
              //section else
              /*Show percent correct of each quiz*/
              //Labels will be ALL quizzes
              console.log("section else statement!");
              console.log("SELECTED_QUIZ", selected_quiz);
              // this.createAllQuizzesMetric(selected_quiz)
              // .then(function(quizzesMet){
              //   console.log("quizzes met HEREE:", quizzesMetric);
              // });
            }
        } else {
            //Quiz else
            /*Show percent correct of each question*/
            //Labels will be questions
            console.log("quiz else statement!");

            var me = this;
            var quizMetric = [];
            this.createMultiQuestionLabelsAndCounts(this.state.quiz.id)
            .then(function(questionsMetric){
              console.log("QUESTIONSSSSS METRIC AFTERRRRRRRRRRRRRRRRRR", questionsMetric);
              setTimeout(function(){
                quizMetric = me.createQuizMetricFromQuestionsMetric(questionsMetric);
                console.log("QUIZ METRIC AFTERRRRRRRRRRRRRRRRRR", quizMetric);
                data = getBarChartData(quizMetric.questionTitles, quizMetric.barLabels, quizMetric.barCounts);
                console.log("data: ", data);
                return res(data);
              },1000);
            });
      }
    } else {
        //Question else
        /*Show all answers and number of students who answered question*/
        console.log("question else statement!");
        //Get labels (answers for question)
         this.createLabelsAndCounts(this.state.section.id, this.state.question.id)
          .then(function(questionMetric){
              console.log("QUESTION METRIC ****************************", questionMetric);
              data = getSingleItemBarChartData(questionMetric.title, questionMetric.labels, questionMetric.counts);
              console.log("DATA ", data);
              return res(data);
          });
    }
}

createAllQuizzesMetric(selected_quizzes){
  var me = this;
  var quizzesMetric = {
    quizTitles: [],
    quizAverages: [],
  };
  Promise.each(selected_quizzes, function(quiz){
    me.createMultiQuestionLabelsAndCounts(quiz.id)
      .then(function(questionsMetric){
        quizzesMetric.quizTitles.push(questionsMetric.quizTitle);
        quizzesMetric.quizAverages.push((questionsMetric.correctResponses / questionsMetric.totalResponses) * 100.0);
        console.log("HEREEEEEE Quizzes METRIC: ", quizzesMetric);
      });
  })
  return quizzesMetric;
  // return $.post('/quiz/find', {course: courseId })
  // .then(function(quizzes){
  //   console.log("Before Promise, QUIZZES ", quizzes);
  //   Promise.each(quizzes, function(quiz) {
  //     me.createMultiQuestionLabelsAndCounts(quiz.id)
  //     .then(function(questionsMetric){
  //       quizzesMetric.quizTitles.push(questionsMetric.quizTitle);
  //       quizzesMetric.quizAverages.push((questionsMetric.correctResponses / questionsMetric.totalResponses) * 100.0);
  //       console.log("HEREEEEEE Quizzes METRIC: ", quizzesMetric);
  //     });
  //   })
  //   return quizzesMetric;
  // });
}

createQuizMetricFromQuestionsMetric(questionsMetric){
  console.log("questionMetirc in QuizMetric: ", questionsMetric);
  var questionsBarCounts = [];
  var questionsBarLabels = [];
  var answerCount = 1;
  var labelArray = [];
  questionsBarLabels = questionsMetric.barLabels;

  for (var i = 0; i < questionsBarLabels.length; i++) {
    if (questionsBarLabels[i].length > answerCount) {
      answerCount = questionsBarLabels[i].length;
      labelArray = questionsBarLabels[i];
    }
  }
  console.log("Label Array: ", labelArray);

  //add Dummy Data to barCounts
  for (var i = 0; i < labelArray.length; i++){
    var thisCounts = [];
    for (var j = 0; j < questionsMetric.barCounts.length; j++) {
      if (i >= questionsMetric.barCounts[j].length) {
        thisCounts.push(0);
      } else {
        thisCounts.push(questionsMetric.barCounts[j][i]);
      }
    }
    questionsBarCounts.push(thisCounts)
  }
  console.log("COUNTS ARRAY: ", questionsBarCounts);

  var quizMetric = {
    quizTitle: 0,
    questionTitles: [],
    barLabels: [],
    barCounts: [],
    percentCorrect: 0,
  };
  quizMetric.quizTitle = questionsMetric.quizTitle;
  quizMetric.percentCorrect = (questionsMetric.correctResponses / questionsMetric.totalResponses) * 100.0;
  console.log("PERCENT CORRECT: ", quizMetric.percentCorrect);
  quizMetric.questionTitles = questionsMetric.questionTitles;
  quizMetric.barLabels = labelArray;
  quizMetric.barCounts = questionsBarCounts;
  console.log("************* QUIZ METRIC ", quizMetric);
  return quizMetric;
}


createMultiQuestionLabelsAndCounts(quizId) {
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
        me.createLabelsAndCounts(me.state.section.id, question.id)
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

    // var mainLabelLine = ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4"];
    // var pointLabelsLine = ["Mary", "Joey", "Class Average"];
    // var dataArraysLine = [[80, 60, 78, 92],[64, 62, 77, 83],[84, 65, 87, 86]];

    // var lineChartData = getLineChartData(mainLabelLine, pointLabelsLine, dataArraysLine);

    var options = getBarChartValueOptions();
    this.doMath(1, function(data){
      var myNewChart = new Chart(ctx).Bar(data,options);
    });


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
            <div className="small ml10">Sections</div>
            <select value={this.state.section.id} className="dropdown mr10" onChange={this.changeSection.bind(this)}>
              {this.state.isAllSectionsOptionAvailable ? <option value={this.state.allSections.id}>{this.state.allSections.title}</option> : null }
              {this.state.sections.map(function(section, sectionIndex) {
                return <option key={sectionIndex} value={section.id}>{section.title}</option>
              })}
            </select>
          </div>
          <div>
            <div className="small ml10">Students</div>
            <select value={this.state.student.id} className="dropdown mr10" onChange={this.changeStudent.bind(this)}>
              {this.state.isAllStudentsOptionAvailable ? <option value={this.state.allStudents.id}>{this.state.allStudents.title}</option> : null }
              {this.state.students.map(function(student, studentIndex) {
                return <option key={studentIndex} value={student.id}>{student.firstName}</option>
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
