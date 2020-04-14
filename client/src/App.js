import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import MainContainer from './containers/MainContainer';

import { fetchClubs } from './actions/clubs';
import { fetchUsers } from './actions/users';
import { fetchThreads } from './actions/threads';
import { fetchComments } from './actions/comments';

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

  updateCurrentUser(userData) {
    const {
      id,
      attributes: {
        name, username, email, bio, avatar, favorite_book_isbn13
      } = {
        // Fallback default values
        name: 'Anon',
        username: 'Anon',
        email: 'no@email.com',
        avatar: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
        favorite_book_isbn13: '978-1455841653'
      },
      relationships: {
        clubs: {
          data: clubs
        },
        comments: {
          data: comments
        }
      }
    } = userData; 

    this.setState({
      currentUser: {
        id: id,
        name: name,
        username: username,
        email: email,
        bio: bio,
        avatar: avatar,
        currentFavorite: favorite_book_isbn13,
        clubIds: clubs.map(club => club.id),
        commentIds: comments.map(comment => comment.id),
      }
    });
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
      console.log(response);

      if (response.failure) return console.log(response.failure);
      this.updateCurrentUser(response.data);
    });
  };

  handleSignUp(userData) {
    this.setState({
      currentUser: {
        id: userData.id,
        name: userData.attributes.name,
        username: userData.attributes.username,
        email: userData.attributes.email
      }
    });

  }

  logOutUser = () => {
    localStorage.clear()
    this.setState({ currentUser: false })
  }
  
  componentDidMount() {
    this.props.fetchClubs()
    this.props.fetchUsers()
    this.props.fetchThreads()
    this.props.fetchComments()
    if (!!localStorage.getItem('token')) this.authorizeToken()
  }
  render() {
    const {
      loginRequest,
      logOutUser,
      handleSignUp,
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
          handleSignUp={handleSignUp}
          updateCurrentUser={updateCurrentUser}
        />
      </div>
    );
  };
}

export default connect(null, { fetchClubs, fetchUsers, fetchThreads, fetchComments })(App);
