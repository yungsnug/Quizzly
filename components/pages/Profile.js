"use strict";

import React from 'react'
import Quiz from '../partials/Quiz.js'
import Modal from '../partials/Modal.js'
import { browserHistory } from 'react-router'

var Promise = require('bluebird');

export default class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.getUserFromSession();
  }

  getUserFromSession() {
    var me = this;
    $.post('/session')
    .then(function(user) {
      me.setState({user: user});
    })
    .fail(function() {
      browserHistory.push('/entrance');
    });
  }

  handleChange(i, event) {
    var user = this.state.user;
    user[i] = event.target.value;

    this.setState({user: user});
  }

  updateUser() {
    var user = this.state.user;
    var newUser = {email: user.email, firstName: user.firstName, lastName: user.lastName};
    var route = "/update/" + user.id;
    switch (user.type) {
      case 'STUDENT':
        newUser.studentId = user.studentId;
        route = '/student' + route;
        break;
      case 'PROFESSOR':
        newUser.facultyId = user.facultyId;
        route = '/professor' + route;
        break;
    }

    $.post(route, newUser)
    .then(function(user) {
      console.log("updated user: ", user);
    });
  }

  render() {
    return (
      <div>
        <div id="profile" className="p20 quizzlyContent">
          <input
            type="text"
            value={this.state.user.firstName}
            placeholder="First name"
            onChange={this.handleChange.bind(this, 'firstName')}
          />
          <input
            type="text"
            value={this.state.user.lastName}
            placeholder="Last name"
            onChange={this.handleChange.bind(this, 'lastName')}
          />
          <input
            type="text"
            value={this.state.user.email}
            placeholder="Email"
            onChange={this.handleChange.bind(this, 'email')}
          />
          {(() => {
            switch (this.state.user.type) {
              case 'STUDENT':
                return
                  (<input
                    type="text"
                    value={this.state.user.studentId}
                    placeholder="ID"
                    onChange={this.handleChange.bind(this, 'studentId')}
                  />);
                break;
              case 'PROFESSOR':
                (<input
                  type="text"
                  value={this.state.user.facultyId}
                  placeholder="ID"
                  onChange={this.handleChange.bind(this, 'facultyId')}
                />);
                break;
            }
          })()}
        </div>
      </div>
    );
  }
}
