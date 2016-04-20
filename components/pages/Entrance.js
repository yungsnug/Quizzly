"use strict";

import React from 'react'
import {Link} from 'react-router'
import { browserHistory } from 'react-router'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      isProfessor: false,
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
    var firstName = "", lastName = "";
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!password || !email) {
      return;
    }
    if(this.state.isSignIn) {
      $.post('/login', {email: email, password: password}, function(user) {
        console.log("User is logged in", user);
        var route = 'p';
        switch(user.type) {
          case 'PROFESSOR':
            route = '/p/courses';
            break;
          case 'STUDENT':
            route = '/s/quizzes';
            break;
        }
        browserHistory.push(route);
      })
      .fail(function(err) {
        alert("Sign in failed!");
        console.log(err);
      });
    } else {
      var firstName = this.state.firstName.trim();
      var lastName = this.state.lastName.trim();
      var isProfessor = this.state.isProfessor;

      if (!firstName || !lastName) {
        return;
      }

      $.post('/signup', {email: email, password: password, firstName: firstName, lastName: lastName, isProfessor: isProfessor})
      .then(function(user) {
        console.log("User is logged in", user);
        var route = 'p';
        if(isProfessor) {
          route = '/p/courses';
        } else {
          route = '/s/quizzes';
        }
        browserHistory.push(route);
      })
      .fail(function(err) {
        alert("Sign up failed!");
        console.log(err);
      });
    }
  }

  swapEntryType() {
    var isSignIn = this.state.isSignIn;
    this.setState({isSignIn: !isSignIn});
  }

  updateIsProfessor(e) {
    var isProfessor = e.target.checked;
    console.log("isProfessor", isProfessor);
    this.setState({isProfessor: isProfessor});
  }

  render() {
    return (
      <div id="quizzlyEntrance" className="gradientBody">
        <div className="centerBlock alignC" style={{"paddingTop": "5%"}}>
          <div className="title mb10">QUIZZLY</div>
          <div className="subtitle mb20">The scholastic environment where clickers do not exist</div>
          <img className="logo mb20" src={LOGO_IMAGE_PATH} />
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
            {(() => {
              if(!this.state.isSignIn) {
                return (
                  <div className="mb20">
                    <input type="checkbox" className="mr10" onChange={this.updateIsProfessor.bind(this)} checked={this.state.isProfessor}/>
                    <span className="p white">{"I'm a Professor"}</span>
                  </div>
                );
              }
            })()}
            <input type="submit" value={this.state.isSignIn ? "SIGN IN" : "SIGN UP"} className="signButton mb20"/>
          </form>
          <div className="subsubtitle">Or switch to&nbsp;
            <a href="#" className="bold" onClick={this.swapEntryType.bind(this)}>{this.state.isSignIn ? "sign up" : "sign in"}</a>
            &nbsp;or&nbsp;
            <a href="#" className="bold">sign in with Blackboard</a>
          </div>
        </div>
        <a className="footer">About</a>
      </div>
    )
  }
}
