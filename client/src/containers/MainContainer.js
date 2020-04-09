import React, { Component } from 'react';
import NYTimesContainer from './NYTimesContainer';

class MainContainer extends Component {

  fetchClubs() {
    fetch('localhost:3001/api/v1/clubs')
    .then(res => res.json())
    .then(clubs => console.log(clubs))
  }
  
  render() {
    return (
      <main>
        MainContainer
        {/* <NYTimesContainer /> */}
      </main>
    )
  }
}

export default MainContainer;