import React from 'react';
import Avatar from './Avatar';

const Club = ({avatar, name, description}) => (
  <div className='club'>
    <Avatar
      avatar={avatar || 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'}
      showing={name}
    xx/>
    <h2>{name}</h2>
    <p>{description}</p>
  </div>
);

export default Club;