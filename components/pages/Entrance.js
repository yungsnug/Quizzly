"use strict";

import React from 'react'
import {Link} from 'react-router'
import { browserHistory } from 'react-router'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange(input, e) {
    var state = this.state;
    state[input] = e.target.value;
    this.setState(state);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!password || !email) {
      return;
    }

    $.post('/login', {email: email, password: password}, function(user) {
      console.log("User is logged in", user);
      browserHistory.push('/courses');
    })
    .fail(function(err) {
      alert(err);
      console.log(err);
    });
  }

  render() {
    return (
      <div id="quizzlyEntrance" className="gradientBody">
        <div className="centerBlock alignC" style={{"paddingTop": "5%"}}>
          <div className="title mb10">QUIZZLY</div>
          <div className="subtitle mb20">The scholastic environment where clickers do not exist</div>
          <img className="logo mb20" src="/images/logo.png"/>
          <form className="loginForm" onSubmit={this.handleLoginSubmit.bind(this)}>
            <input
              className="entranceInput mb30"
              type="text"
              placeholder="School Email"
              value={this.state.email}
              onChange={this.handleInputChange.bind(this, 'email')}
            />
            <input
              className="entranceInput mb30"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange.bind(this, 'password')}
            />
            <input type="submit" value="SIGN IN" className="signInButton mb20"/>
          </form>
          <div className="subsubtitle">Or switch to&nbsp;
            <a href="#">sign up</a>
            &nbsp;or&nbsp;
            <a href="#">sign in with Blackboard</a>
          </div>
        </div>
        <a className="footer">About</a>
      </div>
    )
  }
}
