import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NYTimesContainer from './NYTimesContainer';
// import GoogleBooksContainer from './GoogleBooksContainer';
import ClubList from '../components/ClubList';
import Header from '../components/Header';


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
    console.log(this.state)
    return (
      <main>
        {/* <Header /> */}
        <Switch>
          <Route exact path='/clubs' component={() => <ClubList clubs={this.state.clubs} />} />
          <Route path='/bestsellers' component={NYTimesContainer} />
          {/* <GoogleBooksContainer /> */}

        </Switch>
      </main>
    )
  }
}

export default MainContainer;