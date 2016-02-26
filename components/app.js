import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Layout from './pages/Layout.js'
import Courses from './pages/Courses.js'
import Quizzes from './pages/Quizzes.js'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="courses" component={Courses}/>
      <Route path="quizzes" component={Quizzes}/>
    </Route>
  </Router>
), document.getElementById("quizzly"));
