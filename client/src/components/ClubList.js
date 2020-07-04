import React, { Component } from 'react';
import Club from './Club';
import ClubSideBar from './ClubSideBar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class ClubList extends Component {

  renderClubs = () => {
    let {props: {clubs, currentUser}} = this;
    clubs = currentUser ? clubs.filter(club => !currentUser.clubIds.includes(club.id)) : clubs;

    return clubs.map( ({id, name, avatar, description, memberIds}) =>
      <Club
        key={id}
        id={id}
        avatar={avatar}
        name={name}
        description={description}
        members={memberIds}
        currentUser={currentUser}
      />
    );
  };

  renderClubsSidebar = () => {
    let {
      props: {
        clubs,
        currentUser,
        memberships
      }
    } = this;

    const usersClubIds = memberships.filter( m => m.userId === currentUser.id );
    if (currentUser) clubs = clubs.filter( club => usersClubIds.includes(club.id) );
    let list = clubs.map(({id, name, avatar}) => <ClubSideBar key={id} id={id} name={name} avatar={avatar} />);

    return <>
      {list}
      <NavLink
        to='/clubs/new'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Create Club</h3></div></NavLink>
    </>;
  };

  render() {
    const {renderClubs, renderClubsSidebar, props: {styling}} = this;
    return (
      <div className='Club-list'>
        {styling === 'sidebar' ? null : <h2>Clubs</h2>}
        {styling === 'sidebar' ? renderClubsSidebar() : renderClubs()}
      </div>
    );
  };
}

const mapStateToProps = ({clubs, users}) => ({
  clubs: clubs.data,
  clubsPending: clubs.pending,
  currentUser: users.currentUser,
  memberships: users.memberships
});

export default connect(mapStateToProps)(ClubList);