"use strict";

import React from 'react'

export class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: props.user
    };
  }

  handleChange(i, event) {
    var user = this.state.user;
    user[i] = event.target.value;

    this.setState({user: user});
  }

  updateUser() {
    var user = this.state.user;
    var me = this;
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
      me.setState({user: user});
      me.props.updateUser(user);
      me.props.closeModal();
    });
  }

  render() {
    return (
      <div id="modalContainer">
        <div id="modal">
          <div id="header">
            Profile Information
            <span className="floatR pointer" onClick={this.props.closeModal.bind(this)}><img src={CLOSE_IMAGE_PATH} style={{"width":"12px"}}/></span>
          </div>
          <div id="body" className="p20">
            <input
              type="text"
              value={this.state.user.firstName}
              placeholder="First name"
              onChange={this.handleChange.bind(this, 'firstName')}
              className="show normalInput mb20"
            />
            <input
              type="text"
              value={this.state.user.lastName}
              placeholder="Last name"
              onChange={this.handleChange.bind(this, 'lastName')}
              className="show normalInput mb20"
            />
            <input
              type="text"
              value={this.state.user.email}
              placeholder="Email"
              onChange={this.handleChange.bind(this, 'email')}
              className="show normalInput mb20"
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
                      className="show normalInput mb20"
                    />);
                  break;
                case 'PROFESSOR':
                  (<input
                    type="text"
                    value={this.state.user.facultyId}
                    placeholder="ID"
                    onChange={this.handleChange.bind(this, 'facultyId')}
                    className="show normalInput mb20"
                  />);
                  break;
              }
            })()}
            <button className="centerBlock" onClick={this.updateUser.bind(this)}>UPDATE INFO</button>
          </div>
        </div>
      </div>
    );
  }
}
