import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import MainContainer from './containers/MainContainer';

import { fetchClubs } from './actions/clubs';
import { fetchUsers } from './actions/users';
import { fetchThreads } from './actions/threads';
import { fetchComments } from './actions/comments';
import { authorizeToken } from './actions/users';

class App extends Component {

  // state = {
  //   currentUser: false
  // }

  loginRequest = payload => {
    const requestObj = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify(payload)
    };

    fetch('/auth/login', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.failure) return console.log(response.failure); //TODO Handle this
      localStorage.setItem('token', response.auth_token);
      this.updateCurrentUser(response.user.data);
      // <FlashMessage message{response} />
    })
    .catch(errors => console.log(errors)); 
  }

  //! Remove!
  // handleSignUp(userData) {
  //   console.log(userData);
    
  //   this.setState({
  //     currentUser: {
  //       id: userData.id,
  //       name: userData.attributes.name,
  //       username: userData.attributes.username,
  //       email: userData.attributes.email
  //     }
  //   });
  // }

  logOutUser = () => {
    localStorage.clear()
    this.setState({ currentUser: false })
  }
  
  componentDidMount() {
    const {props: {fetchClubs, fetchUsers, fetchThreads, fetchComments, authorizeToken}} = this
    if (!!localStorage.getItem('token')) authorizeToken() //TODO Add await and loading animation
    fetchClubs()
    fetchUsers()
    fetchThreads()
    fetchComments()
  }

  render() {
    const {
      loginRequest,
      logOutUser,
      // handleSignUp, //! Remove!
      updateCurrentUser,
      state: {
        currentUser
      }
    } = this;

    return (
      <div className="App">
        <SidebarContainer currentUser={currentUser} />
        <MainContainer
          loginRequest={loginRequest}
          currentUser={currentUser}
          logOutUser={logOutUser}
          // handleSignUp={handleSignUp} //! Remove!
          updateCurrentUser={updateCurrentUser}
        />
      </div>
    );
  };
}

export default connect(
  null, {
    fetchClubs,
    fetchUsers,
    fetchThreads,
    fetchComments,
    authorizeToken
  }
)(App);
