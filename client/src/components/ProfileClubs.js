import React from 'react';
import Avatar from './Avatar';

function ProfileClubs({clubs}) {
  function renderAvatars() {
    return clubs.map(club => <Avatar src={club.avatar} showing={club.name} />);
  }
  
  return renderAvatars();
}

export default ProfileClubs;