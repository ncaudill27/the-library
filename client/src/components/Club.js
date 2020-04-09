import React from 'react';
import Avatar from './Avatar';

const Club = ({avatar, name, description}) => (
  <div className='club'>
    <Avatar avatar={avatar} showing={name} />
    <h2>{name}</h2>
    <p>{description}</p>
  </div>
);

export default Club;