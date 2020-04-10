import React, { Component } from 'react';
import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import MainContainer from './containers/MainContainer';
import Header from './components/Header';
import { connect } from 'react-redux';
import { fetchClubs } from './actions/clubs';

class App extends Component {

  componentDidMount() {
    this.props.fetchClubs()
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

export default connect(null, { fetchClubs })(App);
