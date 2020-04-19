                import React, { Component } from 'react';
import Club from './Club';
import ClubSideBar from './ClubSideBar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class ClubList extends Component {

  renderClubs = () => {
    let {props: {clubs, currentUser}} = this;
    clubs = currentUser ? clubs.filter(club => !currentUser.clubIds.includes(club.id)) : clubs;

    return clubs.map(({id, name, avatar, description, memberIds})=>
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
    let {props: {clubs, currentUser}} = this;
    if (currentUser) clubs = clubs.filter(c => c.memberIds.includes(currentUser.id));
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
    const {renderClubs, renderClubsSidebar, props: {styling, clubsPending}} = this;
    return (
      <div className='Club-list'>
        {styling === 'sidebar' ? null : <h2>Clubs</h2>}
        {clubsPending === false
          ? styling === 'sidebar'
            ? renderClubsSidebar()
            : renderClubs()
        : <p>Loading...</p>}
      </div>
    );
  };
}

const mapStateToProps = ({clubs, users}) => ({
  clubs: clubs.data,
  clubsPending: clubs.pending,
  currentUser: users.currentUser
});

export default connect(mapStateToProps)(ClubList);