import React, { Component } from 'react';
import Avatar from './Avatar';

function AvatarPreview({src, cancel}) {

  return (
    <div className='Avatar-preview'>
      <h2>Hello</h2>
      <Avatar avatar={src} />
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

export default AvatarPreview;