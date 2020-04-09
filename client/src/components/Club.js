import React from 'react';
import Avatar from './Avatar';

const Club = ({avatar, name, description}) => (
  <div className='Club'>
    <Avatar
      avatar={avatar}
      showing={name}
    />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

export default Club;