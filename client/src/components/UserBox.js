import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOutUser } from '../actions/users';
import Avatar from './Avatar';

const UserBox = ({user, logOutUser}) => {
  return (
    <div className='User-box'>
      <Avatar avatar={user.avatar} showing={user.username} />
      <br/>
      <NavLink to='/' exact className='Navlink'><h3>{user.username}</h3></NavLink>
  </div>
  );
};

export default connect(null, { logOutUser })(UserBox);