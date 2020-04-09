import React from 'react';
import Avatar from './Avatar';

const Club = ({avatar, name, description}) => (
  <div className='club'>
    <Avatar
      avatar={avatar}
      showing={name}
    xx/>
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

export default Club;