import React, { Component } from 'react';
import NYTimesContainer from './NYTimesContainer';
import GoogleBooksContainer from './GoogleBooksContainer';
import ClubList from '../components/ClubList';

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
        MainContainer
        {/* <NYTimesContainer /> */}
        {/* <GoogleBooksContainer /> */}
        <ClubList clubs={this.state.clubs} />
      </main>
    )
  }
}

export default MainContainer;