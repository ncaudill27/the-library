import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import MainContainer from './containers/MainContainer';
import Header from './components/Header';

import { fetchClubs } from './actions/clubs';
import { fetchUsers } from './actions/users';
import { fetchThreads } from './actions/threads';
import { fetchComments } from './actions/comments';
import { Redirect } from 'react-router-dom';

class App extends Component {

  state = {
    currentUser: false
  }

  loginRequest = payload => {
    const requestObj = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify(payload)
    } 
    fetch('/auth/login', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.failure) return console.log(response.failure); //TODO Handle this
      localStorage.setItem('token', response.auth_token);
      this.handleLogin(response.user.data);
      // <FlashMessage message{response} />
    })
    .catch(errors => console.log(errors)); 
  }
  handleLogin(userData) {
    this.setState({
      currentUser: {
        id: userData.id,
        name: userData.attributes.name,
        username: userData.attributes.username,
        email: userData.attributes.email,
        bio: userData.attributes.bio,
        avatar: userData.attributes.avatar,
        currentFavorite: userData.attributes.favorite_book_isbn13,
        clubIds: userData.relationships.clubs.data.map(club => club.id),
        commentIds: userData.relationships.comments.data.map(comment => comment.id),
      }
    })
    // <Redirect />
  }
  authorizeToken = () => {
    const token = localStorage.getItem('token');
    const requestObj = {
      'method': 'POST',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }
    }
    fetch('/auth/auto', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.failure) return console.log(response.failure);
      this.handleLogin(response.data);
    })
  }

  logOutUser = () => {
    localStorage.clear()
    this.setState({ currentUser: {} })
  }
  
  componentDidMount() {
    this.props.fetchClubs()
    this.props.fetchUsers()
    this.props.fetchThreads()
    this.props.fetchComments()
    if (!!localStorage.getItem('token')) this.authorizeToken()
  }
  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} logOutUser={this.logOutUser} />
        <SidebarContainer currentUser={this.state.currentUser} />
        <MainContainer loginRequest={this.loginRequest} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default connect(null, { fetchClubs, fetchUsers, fetchThreads, fetchComments })(App);
