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

class App extends Component {

  componentDidMount() {
    this.props.fetchClubs()
    this.props.fetchUsers()
    this.props.fetchThreads()
    this.props.fetchComments()
  }
  render() {
    return (
      <div className="App">
        <Header />
        <SidebarContainer />
        <MainContainer />
      </div>
    );
  }
}

export default connect(null, { fetchClubs, fetchUsers, fetchThreads, fetchComments })(App);
