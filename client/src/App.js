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

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

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
      <ThemeProvider theme={theme}>
        <SidebarContainer />
        <MainContainer />
      </ThemeProvider>
    );
  };
}


export default connect(null, {getClubsRequest, fetchUsers, fetchThreads, fetchComments, authorizeToken })(App);
