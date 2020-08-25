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
/* ----------
  Material imports
---------- */
import { Container } from '@material-ui/core';

class MainContainer extends Component {

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
    const {
      message,
      currentUser,
      memberships,
      clubsPending,
      usersPending
    } = this.props;

    return (
      <Container maxWidth='sm'>

        { message ? <FlashMessage /> : null }

        <Switch>

          <Route exact path='/' render={ () => <WelcomeContainer currentUser={currentUser} currentUsersClubs={this.currentUsersClubs}  /> } />

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
            //TODO dig into why the container doesn't recognize clubId
            memberships.length
            ? <Route exact path='/clubs/:id' render={ ({match}) => {
              const club = this.reifyClubById(match.params.id);
              return  (
                <ClubContainer
                  {...club}
                />
              )
            }
              } />
            : null
          }

          <Route exact path='/bestsellers' render={ () => 
              <NYTimes clubsCurrentUserMods={this.clubsCurrentUserMods} /> 
          }/>

          {
            currentUser
            ? <Route exact path='/:username/settings' render={ () => <EditUser currentUser={currentUser} />} />
            : null
          }
          {
            usersPending
            ? null
            : (
              <Route exact path='/:username' render={ () => 
                <ProfilePage currentUser={currentUser} />
              }/>
            )
          }

        </Switch>
      </Container>
    );
  };
}

const mapStateToProps = ({clubs, users, messages}) => ({
    message: messages.message,
    clubs: clubs.data,
    clubsPending: clubs.pending,
    users: users.data,
    usersPending: users.pending,
    currentUser: users.currentUser,
    memberships: users.memberships
});

export default connect(mapStateToProps, { logOutUser })(MainContainer);