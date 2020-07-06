import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser, memberJoinRequest } from '../actions/users';

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

  clubsCurrentUserMods = () => {
    let { currentUser, memberships, clubs } = this.props;
    const modAssociations = memberships.filter( m => m.userId === currentUser.id && m.isMod );
    clubs = modAssociations.map( ({clubId}) => clubs.find( c => c.id === clubId ) );
    return clubs;
  }
  
  render() {
    const {
      currentUser,
      message,
      memberships
    } = this.props;
    if (currentUser && memberships.length ) console.log(this.clubsCurrentUserMods());

    return (
      <main>

        { message ? <FlashMessage /> : null }

        <Switch>

          { currentUser ? <Route exact path='/' render={ () => <WelcomeContainer currentUser={currentUser} /> } /> : null }

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
            ? <Route exact path='/clubs/:id' render={ ({match}) =>
                <ClubContainer clubId={match.params.id} currentUser={currentUser} />
              } />
            : null
          }

          <Route exact path='/bestsellers' component={NYTimes} />

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

const mapStateToProps = ({clubs, users, messages}) => {
  return {
    message: messages.message,
    clubs: clubs.data,
    currentUser: users.currentUser,
    memberships: users.memberships
  }
}

export default connect(mapStateToProps, { logOutUser })(MainContainer);