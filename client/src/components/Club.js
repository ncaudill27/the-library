import React from 'react';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';

const Club = ({id, avatar, name, description, members}) => 
  <div className='Club'>
    <Avatar avatar={avatar} showing={name} />
    <div className='content'>
      <h3>
        <NavLink
          to={`/clubs/${id}`}
          exact
          className='Navlink'
          >{name}</NavLink>
      </h3>
      <p>{description} <br/><small>{members.length} members</small></p>
    </div>
  </div>;

export default Club;