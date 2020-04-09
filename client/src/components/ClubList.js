import React, { Component } from 'react';
import Club from './Club';

class ClubList extends Component {

  renderClubs = () => {
    return this.props.clubs.map( club => <Club avatar={club.avatar} name={club.name} description={club.description}/> );
  };

  render() {
    console.log(this.props)
    return (
      <div className='list-clubs'>
        <h2>Clubs</h2>
        {this.renderClubs()}
        {/* <div className='find-club' onClick={}>
          <h3>Find Club</h3>
        </div> */}
      </div>
    );
  }
}

export default ClubList;