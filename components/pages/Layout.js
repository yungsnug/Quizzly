"use strict";

import React from 'react'
import {browserHistory} from 'react-router'
import {Sidebar} from '../partials/Sidebar.js'
import {Header} from '../partials/Header.js'
import {ProfileModal} from '../partials/ProfileModal.js'
import {UrbanAirshipPush} from 'urban-airship-push'


export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urbanAirshipPush: {},
      showProfileModal: false,
      course: {
        id: -1,
        title: "FAKE 101",
        quizzes: [],
        sections: []
      },
      term: {
        id: -1,
        season: {season: "Oalcoa"},
        year: {year: "1398"},
      },
      terms: [],
      user: {
        courses: [],
        email: "",
        firstName: "",
        lastName: "",
        facultyId: "",
        school: "",
        id: -1
      }
    }
  }

  checkSession() {
    return $.post('/session')
    .then(function(user) {
      console.log(user);
      return user;
    })
    .fail(function() {
      console.log("redirecting to entrance...");
      browserHistory.push('/entrance');
    });
  }

  componentDidMount() {
    var me = this;
    this.initPush();
    this.checkSession()
    .then(function(user) {
      //TODO: might not be able to be /PROFESSOR/find/:id
      return $.post('/' + user.type + '/find/' + user.id);
    })
    .then(function(user) {
      console.log('user', user);
      switch(user.type) {
        case 'STUDENT':
          me.addPusherListener();
          var courseIds = [];
          user.sections.map(function(section) {
            courseIds.push(section.course);
          });
          $.post('/course/multifind', {ids: courseIds})
          .then(function(courses) {
            console.log('courseIds', courseIds);
            console.log('courses', courses);
            if(courses[0] != undefined) {
              me.getCourseById(courses[0].id);
              me.getTermsFromCourses(courses);
            }
            user.courses = courses;
            me.setState({user: user});
          });
          break;
        case 'PROFESSOR':
          if(user.courses[0] != undefined) {
            me.getCourseById(user.courses[0].id);
            me.getTermsFromCourses(user.courses);
          }
          me.setState({user: user});
          break;
      }
    });
  }

  addPusherListener() {
    var me = this;
    var pusher = new Pusher('638c5913fb91435e1b42', {
      encrypted: true
    });

    var channel = pusher.subscribe('test_channel');
    channel.bind('my_event', function(data) {
      console.log("pusher data", data);
      $.post('/section/find/' + data.sectionId)
      .then(function(section) {
        section.students.map(function(student) {
          if(me.state.user.id == student.id) {
            $.post('/studentanswer/find', {question: data.questionId, student: student.id})
            .then(function(studentanswer) {
              console.log(studentanswer);
              if(studentanswer.length == 0) { // the student has not answered this question before
                browserHistory.push('/s/question/' + data.questionId + "/" + data.sectionId);
              }
            });
          }
        });
      });
    });
  }

  getTermsFromCourses(courses) {
    var me = this;
    var termIds = [];
    courses.map(function(course) {
      termIds.push(course.term);
    });

    termIds = Utility.removeDuplicates(termIds);
    return $.post('/term/multifind', {termIds: termIds})
    .then(function(terms) {
      console.log("terms", terms);
      me.setState({
        term: terms[0],
        terms: terms
      });
      return terms;
    });
  }

  initPush() {
    var config = {
      key: 'RpquxajkQKeLnupkBrvWtw',
      secret: 'O8p2HuxVQBOrYaTersE5CA',
      masterSecret: 'Lcay6AUkQXapKaztfYSJGw'
    };

    // Create a push object
    // var urbanAirshipPush = new UrbanAirshipPush(config);
    // this.setState({urbanAirshipPush: urbanAirshipPush});
  }

  getQuestion() {
    var urbanAirshipPush = this.state.urbanAirshipPush;
    UrbanAirship.getNotification(function(object) {
      browserHistory("//" + object.question.id);
    });
  }

  showProfileModal() {
    this.setState({showProfileModal: true});
  }

  changeCourse(courseId) {
    this.getCourseById(courseId);
  }

  getCourseById(courseId) {
    var me = this;

    return $.post('/course/find/' + courseId)
    .then(function(course) {
      if(course == undefined) return; // if there are no courses, then there are no sections
      me.setState({course: course});
    });
  }

  changeTerm(termId) {
    var me = this;
    this.getTermByTermId(termId)
    .then(function() {
      var courseId = -1;
      me.state.user.courses.map(function(course) {
        if(courseId == -1 && course.term == termId) {
          courseId = course.id;
        }
      });
      if(courseId == -1) return;
      me.changeCourse(courseId);
    });
  }

  getTermByTermId(termId) {
    var me = this;
    return $.post('/term/find/' + termId)
    .then(function(term) {
      if(term == undefined) return; // if there are no courses, then there are no sections
      me.setState({term: term});
    });
  }

  addCourseToProfessor(course, term) {
    var me = this;
    //TODO: add student array to section
    for(var i = 0; i < course.sections.length; ++i) { // this removes empty answers from the array
      if(course.sections[i].title.length == 0) {
        course.sections.splice(i, 1);
        --i;
      }
    }
    console.log("user", this.state.user);
    return $.post('/course/create/', {title: course.title, professor: this.state.user.id, sections: course.sections, term: term.id})
    .then(function(course) {
      console.log("created course", course);
      var user = me.state.user;
      course.quizzes = [];
      course.sections = [];

      user.courses.push(course);

      var isNewTerm = true;
      var terms = me.state.terms;
      for(var i = 0; i < terms.length; ++i) {
        if(terms[i].id == term.id) {
          isNewTerm = false;
          break;
        }
      }

      if(isNewTerm) {
        terms.push(term);
      }

      me.setState({
        user: user,
        course: course,
        term: term,
        terms: terms
      });
      return course;
    });
  }

  addStudentsToSection(sectionId, studentIds) {
    var me = this;
    return $.post('/section/updateStudents/' + sectionId, {studentIds: studentIds})
    .then(function(section) {
      console.log("Updated section", section);
    });
  }

  deleteCourseFromProfessor(course) {
    console.log(">>>>>>>> deleting shit", course);
    var me = this;

    var sectionIds = [];
    course.sections.map(function(section){sectionIds.push(section.id);});
    var quizIds = [];
    course.quizzes.map(function(quiz){quizIds.push(quiz.id);});
    var questionIds = [];
    var answerIds = [];

    return $.post('/question/find', {quiz: quizIds})
    .then(function(questions) {
      console.log("questions", questions);
      console.log("quizIds", quizIds);
      questionIds = [];
      questions.map(function(question){ questionIds.push(question.id);});
      return $.post('/answer/find', {question: questionIds})
    })
    .then(function(answers) {
      answerIds = [];
      answers.map(function(answer){answerIds.push(answer.id);});
      return $.post('/course/destroy', {id: course.id});
      // return $.when(
      //   ,
        // $.post('/section/multidestroy', {ids: sectionIds}),
        // $.post('/quiz/multidestroy', {ids: quizIds}),
        // $.post('/question/multidestroy', {ids: questionIds}),
        // $.post('/answer/multidestroy', {ids: answerIds})
      // );
    })
    .then(function() {
      return $.post('/professor/find/' + me.state.user.id);
    })
    .then(function(user) {
      console.log("DELETED------------", user);
      var course = {};
      if(user.courses.length == 0) {
        course = {
          id: -1,
          title: "FAKE 101",
          quizzes: [],
          sections: []
        };
      } else {
        course = user.courses[0];
      }
      me.getTermsFromCourses(user.courses);
      me.setState({
        course: course,
        user: user
      });
    });
  }

  updateUser(user) {
    var courses = this.state.user.courses;
    user.courses = courses;
    this.setState({user: user});
  }

  closeModal() {
    this.setState({showProfileModal: false});
  }

  render() {
    var me = this;
    var props = {
      course: me.state.course,
      term: me.state.term,
    };

    switch(this.state.user.type) {
      case 'STUDENT':
        props.student = this.state.user
        break;
      case 'PROFESSOR':
        props.addCourseToProfessor = me.addCourseToProfessor.bind(me);
        props.deleteCourseFromProfessor = me.deleteCourseFromProfessor.bind(me);
        props.addStudentsToSection = me.addStudentsToSection.bind(me);
        break;
    }

    return (
      <div id="quizzlyApp">
        <Sidebar
          user={this.state.user}
        />
        <Header
          course={this.state.course}
          courses={this.state.user.courses}
          term={this.state.term}
          terms={this.state.terms}
          user={this.state.user}
          changeCourse={this.changeCourse.bind(this)}
          changeTerm={this.changeTerm.bind(this)}
          showProfileModal={this.showProfileModal.bind(this)}
        />
        {React.Children.map(me.props.children, function (child) {
          return React.cloneElement(child, props);
        })}
        {(() => {
          var me = this;
          if(this.state.showProfileModal) {
            return (
              <ProfileModal
                user={this.state.user}
                updateUser={this.updateUser.bind(this)}
                closeModal={this.closeModal.bind(this)}
              />
            );
          }
        })()}
      </div>
    )
  }
}
