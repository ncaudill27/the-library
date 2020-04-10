import React from 'react';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';

const Club = ({id, avatar, name, description}) => (
  <div className='Club'>
    <Avatar avatar={avatar} showing={name} />
    <div className='content'>
      <h3>
        <NavLink
          to={`/clubs/${id}`}
          exact
        >{name}</NavLink>
      </h3>
      <p>{description}</p>
    </div>
  </div>
);

export default Club;