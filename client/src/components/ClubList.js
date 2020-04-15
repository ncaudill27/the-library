import React, { Component } from 'react';
import Club from './Club';
import ClubSideBar from './ClubSideBar';
import { NavLink } from 'react-router-dom';

class ClubList extends Component {

  renderClubs = () => {
    let {props: {clubs, currentUser}} = this;
    clubs = clubs.filter(club => !currentUser.clubIds.includes(club.id));

    return clubs.map(({id, name, avatar, description, memberIds})=>
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

  renderClubsSidebar = () => {
    const {props: {clubs}} = this;

    let list = clubs.map(({id, name, avatar}) => <ClubSideBar key={id} id={id} name={name} avatar={avatar} />);
    return <>
      {list}
      <NavLink
        to='/create-club'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Create Club</h3></div></NavLink>
    </>
  }

  render() {
    const {renderClubs, renderClubsSidebar, props: {styling}} = this;
    return (
      <div className='Club-list'>
        <h2>Clubs</h2>
        {styling === 'sidebar' ? renderClubsSidebar() : renderClubs()}
      </div>
    );
  };
}

export default ClubList;