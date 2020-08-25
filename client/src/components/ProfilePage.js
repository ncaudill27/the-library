import React, { PureComponent } from 'react';
import BookShow from './BookShow';

import { Typography } from '@material-ui/core';

function ProfilePage({bio, name, currentlyReading}) {
  
  return (
    <div className='Profile'>
      <div className='info'>
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
      <div className='reading'>
        <BookShow isbn={currentlyReading} />
      </div>
    </div>
  );
}

export default ProfilePage;