import React, { Component } from 'react';
import Club from './Club';

class ClubList extends Component {

  renderClubs = () => {
    return this.props.clubs.map(({id, name, avatar, description, memberIds})=>
      <Club
        key={id}
        id={id}
        avatar={avatar}
        name={name}
        description={description}
        members={memberIds}
      />
    );
  };

  render() {
    return (
      <div className='Club-list'>
        <h2>Clubs</h2>
        {this.renderClubs()}
        {/* Render Find Club Button if on sidebar */}
        {/* <div className='find-club' onClick=''>
          <h3>Find Club</h3>
        </div> */}
      </div>
    );
  };
}

export default ClubList;