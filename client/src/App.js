import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import MainContainer from './containers/MainContainer';

import { getClubsRequest } from './actions/clubs';
import { fetchUsers } from './actions/users';
import { fetchThreads } from './actions/threads';
import { fetchComments } from './actions/comments';
import { authorizeToken } from './actions/users';

class App extends Component {

  componentDidMount() {
    const { getClubsRequest, fetchUsers, fetchThreads, fetchComments, authorizeToken } = this.props;
    if (!!localStorage.getItem('token')) authorizeToken(); //TODO Add await and loading animation
    getClubsRequest();
    fetchUsers();
    fetchThreads();
    fetchComments();
  }

  render() {
    return (
      <div className="App">
        <SidebarContainer />
        <MainContainer />
      </div>
    );
  };
}

export default connect(null, {getClubsRequest, fetchUsers, fetchThreads, fetchComments, authorizeToken })(App);
