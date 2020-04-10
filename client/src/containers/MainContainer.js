import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NYTimesContainer from './NYTimesContainer';
import ClubList from '../components/ClubList';
import ClubContainer from './ClubContainer';

class MainContainer extends Component {

  state = {
    clubs: []
  }

  componentDidMount() {
    this.fetchClubs()
  }

  fetchClubs() {
      fetch('http://localhost:3001/api/v1/clubs')
      .then(res => res.json())
      .then(json => this.parseClubs(json))
  }

  parseClubs = (json) => {
    const clubs = json.data.map(club => {
      return {
        id: club.id,
        name: club.attributes.name,
        description: club.attributes.description
      }
    })
    this.setState({
      clubs
    })
  }
    
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/clubs' component={() => <ClubList clubs={this.state.clubs} />} />
          <Route exact path='/clubs/:id' render={({match}) =>
            <ClubContainer id={match.params.id} clubs={this.state.clubs} />} />
          <Route path='/bestsellers' component={NYTimesContainer} />
        </Switch>
      </main>
    )
  }
}

export default MainContainer;