import React, { PureComponent } from 'react';
import BookShow from './BookShow';

class ProfilePage extends PureComponent {

  render() {
    const {
      bio,
      name,
      currentlyReading
    } = this.props.currentUser;

    const isbn = RegExp(currentlyReading);

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
  };
}

export default ProfilePage;