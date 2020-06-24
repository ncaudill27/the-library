import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOutUser } from '../actions/users';
import Avatar from './Avatar';

const UserBox = ({user, logOutUser}) => {

  const [showing, showingSet] = useState(false);
  const show = () => showingSet(true);
  const hide = () => showingSet(false);

  const userOptions = () => <>
      <NavLink to='/'>
        <button className='logout' onClick={logOutUser}>
          logout
        </button>
      </NavLink>
      <NavLink to={`/${user.username}/settings`}>
        <button className='settings'>
          settings
        </button>
      </NavLink>
    </>
  
  return (
    <div onMouseEnter={show} onMouseLeave={hide} className='User-box'>
      { showing ? userOptions() : <Avatar avatar={user.avatar} showing={user.username} /> }
      <br/>
      <NavLink to={`/${user.username}`} exact className='Navlink'><h3>{user.username}</h3></NavLink>
  </div>
  );
};

export default connect(null, { logOutUser })(UserBox);