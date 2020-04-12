import React from 'react';
import Avatar from './Avatar';

const UserBox = ({user}) => {
  return (
    <div className='User-box'>
      <Avatar avatar={user.avatar} showing={user.username} />
      <h3>{user.username}</h3>
      <p>Settings</p>
  </div>
  );
};

export default UserBox;