import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/users';

import WelcomeContainer from '../components/WelcomeContainer';
import NYTimes from './NYTimes';
import ProfilePage from '../components/ProfilePage';
import ClubList from '../components/ClubList';
import ClubContainer from './ClubContainer';
import ClubForm from '../components/ClubForm';
import FlashMessage from '../components/FlashMessage';
import EditUser from '../components/EditUser';
import AvatarSelection from '../components/AvatarSelection';

class MainContainer extends Component {

  clubsCurrentUserisMember = () => {
    let { currentUser, memberships, clubs } = this.props;
    const membershipAssociations = memberships.filter( m => m.userId === currentUser.id );
    clubs = membershipAssociations.map( ({clubId}) => clubs.find( c => c.id === clubId ) );
    return clubs;
  }
  clubsCurrentUserMods = () => {
    let { currentUser, memberships, clubs } = this.props;
    const modAssociations = memberships.filter( m => m.userId === currentUser.id && m.isMod );
    clubs = modAssociations.map( ({clubId}) => clubs.find( c => c.id === clubId ) );
    return clubs;
  }

  clubsMembers = clubId => {
    const { memberships, users } = this.props;
    const clubMemberships = memberships.filter( m => m.clubId === clubId );

    return clubMemberships.map( m => users.find( u => u.id === m.userId ) );
  }

  findMembershipId = ({clubId, userId}) => {
    const { memberships } = this.props;
    return memberships.find( m => m.userId === userId && m.clubId === clubId ).id;
  }

  reifyClubById = clubId => {
    const { clubs, clubsPending } = this.props;
    
    if ( !clubsPending ) {
      const club = clubs.find( c => c.id === clubId );
      club.members = this.clubsMembers(club.id);
      club.threads = club.threadIds.map( threadId => this.props.threads.find( t => t.id === threadId ) );
      club.currentUserIsMod = this.clubsCurrentUserMods().includes(club);
      club.currentUserIsMember = this.clubsCurrentUserisMember().includes(club);
      return club
    };
  }

  findThreadsByClub = club => {
    return 
  }
  
  render() {
    const {
      currentUser,
      message,
      memberships
    } = this.props;

    return (
      <main>

        { message ? <FlashMessage /> : null }

        <Switch>

          <Route exact path='/' render={ () => <WelcomeContainer currentUser={currentUser} /> } />

          {
            currentUser && memberships.length
            ? <Route exact path='/avatar-selection' render={ () =>
                <AvatarSelection currentUser={currentUser} clubsCurrentUserMods={this.clubsCurrentUserMods} />
              } />
            : null
          }

          <Route exact path='/clubs' render={ () => <ClubList currentUser={currentUser} /> } />

          <Route exact path='/clubs/new' render={ () => <ClubForm currentUser={currentUser}  /> } />

          {
            currentUser && memberships.length
            ? <Route exact path='/clubs/:id' render={ ({match}) => {
              const club = this.reifyClubById(match.params.id);
              return <ClubContainer {...club} currentUser={currentUser} findMembershipId={this.findMembershipId} />
            }
              } />
            : null
          }

          <Route exact path='/bestsellers' render={ () => <NYTimes clubsCurrentUserMods={this.clubsCurrentUserMods} /> } />

          {
            currentUser
            ? <Route exact path='/:username/settings' render={ () => <EditUser currentUser={currentUser} />} />
            : null
          }
          <Route exact path='/:username' component={ProfilePage} />

        </Switch>
      </main>
    );
  };
}

const mapStateToProps = ({clubs, users, threads, messages}) => ({
    message: messages.message,
    clubs: clubs.data,
    clubsPending: clubs.pending,
    threads: threads.data,
    threadsPending: threads.pending,
    users: users.data,
    usersPending: users.pending,
    currentUser: users.currentUser,
    memberships: users.memberships
});

export default connect(mapStateToProps, { logOutUser })(MainContainer);