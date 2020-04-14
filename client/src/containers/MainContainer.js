import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NYTimesContainer from './NYTimesContainer';
import ClubList from '../components/ClubList';
import ClubContainer from './ClubContainer';
import BookShow from '../components/BookShow';
import WelcomeContainer from '../components/WelcomeContainer';
import Header from '../components/Header';
import SignUp from '../components/SignUp';

class MainContainer extends Component {

  render() {
    const {clubs: {data: clubs}, loginRequest, currentUser, logOutUser, handleSignUp} = this.props

    return (
      <main>
        <Header currentUser={currentUser} logOutUser={logOutUser} />
        {/* <SignUp handleSignUp={handleSignUp} /> */}
        <Switch>
          <Route exact path='/' render={() => <WelcomeContainer loginRequest={loginRequest} />} />
          <Route exact path='/clubs' component={() => <ClubList clubs={clubs} />} />
          <Route exact path='/clubs/:id' render={({match}) =>
            <ClubContainer id={match.params.id} clubs={clubs} currentUser={currentUser} />} />
          <Route exact path='/bestsellers' component={NYTimesContainer} />
          <Route exact path={`/bestsellers/:isbn`} render={({match}) =>
            <BookShow isbn={match.params.isbn} />} />
        </Switch>
      </main>
    );
  };
}

const mapStateToProps = ({clubs}) => ({clubs})

export default connect(mapStateToProps)(MainContainer);