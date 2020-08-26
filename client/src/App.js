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
    //TODO move to helpers folder
    currentUsersClubs = () => {
      let { currentUser, memberships, clubs } = this.props;
      const membershipAssociations = memberships.filter( m => m.userId === currentUser.id );
      clubs = membershipAssociations.map( ({clubId}) => clubs.find( c => c.id === clubId ) );
      return clubs ? clubs : [];
    }
    //TODO move to helpers folder
    clubsCurrentUserMods = () => {
      let { currentUser, memberships, clubs } = this.props;
      const modAssociations = memberships.filter( m => m.userId === currentUser.id && m.isMod );
      clubs = modAssociations.map( ({clubId}) => clubs.find( c => c.id === clubId ) );
      return clubs;
    }
  
    //TODO move to helpers folder
    reifyClubById = clubId => {
      const { clubs, clubsPending } = this.props;
      
      if ( !clubsPending ) {
        const club = clubs.find( c => c.id === clubId );
        club.id = clubId;
        club.currentUserIsMod = this.clubsCurrentUserMods().includes(club);
        club.currentUserIsMember = this.currentUsersClubs().includes(club);
        return club
      };
    }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SidebarContainer currentUsersClubs={this.currentUsersClubs} />
        <MainContainer currentUsersClubs={this.currentUsersClubs} clubsCurrentUserMods={this.clubsCurrentUserMods} reifyClubById={this.reifyClubById} />
      </ThemeProvider>
    );
  };
}

const mapStateToProps = ({clubs, users}) => ({
  clubs: clubs.data,
  clubsPending: clubs.pending,
  currentUser: users.currentUser,
  memberships: users.memberships
});

export default connect(mapStateToProps, {getClubsRequest, fetchUsers, fetchThreads, fetchComments, authorizeToken })(App);
