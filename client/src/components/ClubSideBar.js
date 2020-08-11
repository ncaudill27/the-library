import React from 'react';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';

const ClubSideBar = ({id, name, avatar}) =>
  <NavLink to={`/clubs/${id}`} exact className='Navlink' >
    <div className='Club-sidebar'>
      {/* <Avatar avatar={avatar} showing={name} /> */}
      <h3>{name}</h3>
    </div>
  </NavLink>;

export default ClubSideBar;