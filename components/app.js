import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Style from './pages/Style.js'
import Entrance from './pages/Entrance.js'
import Layout from './pages/Layout.js'
import Courses from './pages/Courses.js'
import Quizzes from './pages/Quizzes.js'
import Metrics from './pages/Metrics.js'
import StudentQuizzes from './pages/StudentQuizzes.js'
import StudentMetrics from './pages/StudentMetrics.js'
import AskStudentQuestion from './pages/AskStudentQuestion.js'
import Download from './pages/Download.js'
import StudentList from './pages/StudentList.js'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="p/courses" component={Courses} />
      <Route path="p/quizzes" component={Quizzes} />
      <Route path="p/metrics" component={Metrics} />
      <Route path="p/download" component={Download} />
      <Route path="s/quizzes" component={StudentQuizzes} />
      <Route path="s/metrics" component={StudentMetrics} />
    </Route>
    <Route path="/s/question/:questionId/:sectionId" component={AskStudentQuestion} />
    <Route path="/entrance" component={Entrance} />
    <Route path="/style" component={Style} />
    <Route path="/studentlist" component={StudentList} />
  </Router>
), document.getElementById("quizzly"));
