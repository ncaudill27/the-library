import React from 'react';
import Avatar from './Avatar';

const ClubSidebar = ({avatar, name}) => (
  <div className='sidebar-club'>
    <Avatar avatar={avatar} showing={name} />
    <h2>ClubName</h2>
  </div>
);

export default ClubSidebar;