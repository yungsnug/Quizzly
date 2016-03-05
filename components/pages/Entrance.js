"use strict";

import React from 'react'
import {Link} from 'react-router'
import { browserHistory } from 'react-router'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }

  handleInputChange(input, e) {
    var state = this.state;
    state[input] = e.target.value;
    this.setState(state);
  }

  handleEntranceSubmit(e) {
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

  swapEntryType() {
    var isSignIn = this.state.isSignIn;
    this.setState({isSignIn: !isSignIn});
  }

  render() {
    var firstName = {};
    var lastName = {};
    if(!this.state.isSignIn) {
      firstName =
        <input
          className="entranceInput mb30"
          type="text"
          placeholder="First name"
          value={this.state.firstName}
          onChange={this.handleInputChange.bind(this, 'firstName')}
        />;
      lastName =
        <input
          className="entranceInput mb30"
          type="text"
          placeholder="Last name"
          value={this.state.lastName}
          onChange={this.handleInputChange.bind(this, 'lastName')}
        />;
    }
    return (
      <div id="quizzlyEntrance" className="gradientBody">
        <div className="centerBlock alignC" style={{"paddingTop": "5%"}}>
          <div className="title mb10">QUIZZLY</div>
          <div className="subtitle mb20">The scholastic environment where clickers do not exist</div>
          <img className="logo mb20" src="/images/logo.png"/>
          <form className="loginForm" onSubmit={this.handleEntranceSubmit.bind(this)}>
            {(() => {
              if(!this.state.isSignIn) {
                return (
                  <div>
                    <input
                      className="entranceInput mb30"
                      type="text"
                      placeholder="First name"
                      value={this.state.firstName}
                      onChange={this.handleInputChange.bind(this, 'firstName')}
                    />
                    <input
                      className="entranceInput mb30"
                      type="text"
                      placeholder="Last name"
                      value={this.state.lastName}
                      onChange={this.handleInputChange.bind(this, 'lastName')}
                    />
                  </div>
                );
              }
            })()}
            <input
              className="entranceInput mb30"
              type="text"
              placeholder="School email"
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
            <input type="submit" value={this.state.isSignIn ? "SIGN IN" : "SIGN UP"} className="signButton mb20"/>
          </form>
          <div className="subsubtitle">Or switch to&nbsp;
            <a href="#" onClick={this.swapEntryType.bind(this)}>{this.state.isSignIn ? "sign up" : "sign in"}</a>
            &nbsp;or&nbsp;
            <a href="#">sign in with Blackboard</a>
          </div>
        </div>
        <a className="footer">About</a>
      </div>
    )
  }
}
