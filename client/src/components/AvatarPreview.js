import React from 'react';
import Avatar from './Avatar';

function AvatarPreview({src, cancel, clubsCurrentUserMods, currentUser, setAvatar}) {

  const clubOptions = () => {
    return clubsCurrentUserMods().map( club => <option value={club.id}>{club.name}</option> );
  }

  const renderSelect = () => 
    <select name='avatar' onChange={setAvatar}>
      <option value={currentUser.username}>{currentUser.username}</option>
      {clubOptions()}
    </select>
  
  return (
    <div className='Avatar-preview'>
      <h2>Hello</h2>
      <Avatar avatar={src} />
      { renderSelect() }
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

export default AvatarPreview;