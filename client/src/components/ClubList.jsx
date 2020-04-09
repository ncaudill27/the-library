import React, { Component } from 'react';
import ClubSibebar from './ClubSidebar';
import ClubMain from './ClubMain';

class ClubList extends Component {

  renderClubs = () => {
    return this.props.clubs.map( club => <ClubSibebar club={club} /> );
  };

  render() {
    return (
      <div className='list-clubs'>
        <h2>Clubs</h2>
        {this.renderClubs()}
        <div className='find-club' onClick={}>
          <h3>Find Club</h3>
        </div>
      </div>
    );
  }
}

export default ClubList;