import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NYTimesContainer from './NYTimesContainer';
import ClubList from '../components/ClubList';
import ClubContainer from './ClubContainer';

class MainContainer extends Component {

  render() {
    const {clubs} = this.props

    return (
      <main>
        <Switch>
          <Route exact path='/clubs' component={() => <ClubList clubs={clubs} />} />
          <Route exact path='/clubs/:id' render={({match}) =>
            <ClubContainer id={match.params.id} clubs={clubs}/>} />
          <Route path='/bestsellers' component={NYTimesContainer} />
        </Switch>
      </main>
    )
  }
}

const mapStateToProps = ({clubs}) => ({clubs})

export default connect(mapStateToProps)(MainContainer);