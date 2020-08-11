import React, { Component } from 'react';
import Club from './Club';
import ClubSideBar from './ClubSideBar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
/* ----------
  Material imports
----------- */
import { Avatar, Typography, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';

class ClubList extends Component {

  renderClubs = () => {
    let {
      clubs,
      currentUser,
      memberships
    } = this.props;

    const usersMemberships = memberships.filter( m => m.userId === currentUser.id );
    const usersClubs  = usersMemberships.map( m => {
      return clubs.find( c => c.id === m.clubId );
    });
    
    const userAssociatedClubIds = usersClubs.map( c => c.id );    

    clubs = currentUser ? clubs.filter(club => !userAssociatedClubIds.includes(club.id)) : clubs;
    
    return clubs.map( ({id, name, avatar, description}) =>
      <Box>
        <Avatar alt={name} src={avatar} />
        <Typography variant="h5">
          <Link href={`/clubs/${id}`}>
            {name}
          </Link>
        </Typography>
        <Typography>
          {description}
        </Typography>
      </Box>
    );
    {/* OLD CODE
      <Club
      key={id}
      id={id}
      avatar={avatar}
      name={name}
      description={description}
      currentUser={currentUser}
    /> */}
  };

  renderClubsSidebar = () => {
    let {
      clubs,
      currentUser,
      memberships
    } = this.props;

    const usersMemberships = memberships.filter( m => m.userId === currentUser.id );
    clubs  = usersMemberships.map( m => {
      return clubs.find( c => c.id === m.clubId );
    });
    clubs = clubs.map(({id, name, avatar}) => <ClubSideBar key={id} id={id} name={name} avatar={avatar} />);

    return <>
      {clubs}
      <NavLink
        to='/clubs/new'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Create Club</h3></div></NavLink>
    </>;
  };

  render() {
    const {renderClubs, renderClubsSidebar, props: {styling, memberships, clubs}} = this;
    return (
      <div className='Club-list'>
        {styling === 'sidebar' ? null : <Typography variant="h2">Clubs</Typography>}
        {
          memberships.length && clubs.length
          ? styling === 'sidebar' ? renderClubsSidebar() : renderClubs()
          : null
        }
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