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

class MainContainer extends Component {

  render() {
    const {
      currentUser,
      message
    } = this.props;

    return (
      <main>

        { message ? <FlashMessage /> : null}

        <Switch>

          <Route exact path='/' render={ () => <WelcomeContainer currentUser={currentUser} /> } />

          <Route exact path='/clubs' render={ () => <ClubList currentUser={currentUser} /> } />

          <Route exact path='/clubs/new' render={ () => <ClubForm currentUser={currentUser}  /> } />

          <Route exact path='/clubs/:id' render={ ({match}) =>
            <ClubContainer clubId={match.params.id} currentUser={currentUser} />
          } />

          <Route exact path='/bestsellers' component={NYTimes} />

          <Route exact path='/:username/settings' render={ ({match}) => <EditUser currentUser={currentUser} username={match} />} />
          <Route exact path='/:username' component={ProfilePage} />

        </Switch>
      </main>
    );
  };
}

const mapStateToProps = ({clubs, users, messages}) => {
  return {
    clubs: clubs.data,
    currentUser: users.currentUser,
    message: messages.message
  }
}

export default connect(mapStateToProps, { logOutUser })(MainContainer);