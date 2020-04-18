import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/users';

import Header from '../components/Header';
import WelcomeContainer from '../components/WelcomeContainer';
import BookShow from '../components/BookShow';
import NYTimes from './NYTimes';
import ProfilePage from '../components/ProfilePage';
import ClubList from '../components/ClubList';
import ClubContainer from './ClubContainer';
import ClubForm from '../components/ClubForm';

class MainContainer extends Component {

  clubMembers


  render() {
    const {
      currentUser
    } = this.props;

    return (
      <main>
        {currentUser ? <Header currentUser={currentUser} logOutUser={logOutUser} /> : null}
        <Switch>

          <Route exact path='/' render={ () =>
            <WelcomeContainer
              currentUser={currentUser}
            />}
          />

          <Route exact path='/clubs' render={() => <ClubList currentUser={currentUser} />} />

          <Route exact path='/clubs/new' render={() => <ClubForm currentUser={currentUser}  />} />

          <Route exact path='/clubs/:id' render={({match}) =>
            <ClubContainer clubId={match.params.id} currentUser={currentUser} />} />

          <Route exact path='/bestsellers' component={NYTimes} />

          <Route exact path={`/bestsellers/:isbn`} render={({match}) =>
            <BookShow isbn={match.params.isbn} />} />


          <Route exact path='/:username' render={ () => <ProfilePage />} />
        </Switch>
      </main>
    );
  };
}

const mapStateToProps = ({clubs, users}) => {
  return {
    clubs: clubs.data,
    currentUser: users.currentUser
  }
}

export default connect(mapStateToProps, { logOutUser })(MainContainer);