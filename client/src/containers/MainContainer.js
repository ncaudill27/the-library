import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NYTimes from './NYTimes';
import ClubList from '../components/ClubList';
import ClubContainer from './ClubContainer';
import BookShow from '../components/BookShow';
import WelcomeContainer from '../components/WelcomeContainer';
import Header from '../components/Header';
import NewUser from '../components/NewUser';

class MainContainer extends Component {

  render() {
    const {
      clubs: {
        data: clubs
      },
      loginRequest,
      currentUser,
      logOutUser,
      // handleSignUp, //! Remove!
      updateCurrentUser
    } = this.props;

    return (
      <main>
        <Header currentUser={currentUser} logOutUser={logOutUser} />
        <Switch>

          <Route exact path='/' render={ () =>
            <WelcomeContainer
              loginRequest={loginRequest}
              // handleSignUp={handleSignUp} //! Remove!
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
            />}
          />

          <Route exact path='/clubs' component={() => <ClubList clubs={clubs} />} />

          <Route exact path='/clubs/:id' render={({match}) =>
            <ClubContainer id={match.params.id} clubs={clubs} currentUser={currentUser} />} />

          <Route exact path='/bestsellers' component={NYTimes} />

          <Route exact path={`/bestsellers/:isbn`} render={({match}) =>
            <BookShow isbn={match.params.isbn} />} />

        </Switch>
      </main>
    );
  };
}

const mapStateToProps = ({clubs}) => ({clubs})

export default connect(mapStateToProps)(MainContainer);