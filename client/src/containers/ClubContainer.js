import React, { Component } from 'react';

class ClubContainer extends Component {

  renderClub = club => {
    if (club) {
      const {name, description} = club
      return (
        <>
          <h2>{name}</h2>
          <p>{description}</p>
        </>
      )
    }
  }
  
  render() {
    const club = this.props.clubs.find(club => club.id === this.props.id)
    return (
      <div className='Club-container'>
        {this.renderClub(club)}
      </div>
    )
  }
}

export default ClubContainer;