import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WelcomeContainer from '../components/WelcomeContainer';
import BookShow from '../components/BookShow';
import NYTimes from './NYTimes';
import ClubList from '../components/ClubList';
import ClubContainer from './ClubContainer';
import ClubForm from '../components/ClubForm';
import { logOutUser } from '../actions/users';

class MainContainer extends Component {

  render() {
    const {
      currentUser,
      logOutUser,
      clubs: {
        data: clubs
      },
    } = this.props;

    return (
      <main>
        <Header currentUser={currentUser} logOutUser={logOutUser} />
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

        </Switch>
      </main>
    );
  };
}

const mapStateToProps = ({clubs, users}) => {
  return {
    clubs,
    currentUser: users.currentUser
  }
}

export default connect(mapStateToProps, { logOutUser })(MainContainer);