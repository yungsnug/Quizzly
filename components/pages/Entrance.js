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

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    browserHistory.push('/courses');
    // window.location.href = "/courses";
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!password || !email) {
      return;
    }
    // TODO: send request to the server
    this.setState({email: '', password: ''});

  }

  componentDidMount() {
    console.log("Entrance componentDidMount");
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
              onChange={this.handleEmailChange.bind(this)}
            />
            <input
              className="entranceInput mb30"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
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
