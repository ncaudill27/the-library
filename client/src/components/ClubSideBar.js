import React from 'react';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';

const ClubSideBar = ({id, name, avatar}) =>
  <div className='Club-sidebar'>
    <Avatar avatar={avatar} showing={name} />
    <h3>
      <NavLink
        to={`/clubs/${id}`}
        exact
        className='Navlink'
      >{name}</NavLink>
    </h3>
  </div>;

export default ClubSideBar;