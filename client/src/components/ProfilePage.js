import React, { PureComponent } from 'react';
import ClubBook from './ClubBook';

class ProfilePage extends PureComponent {

  componentDidMount() {
    this.props.fetchBookInfo(this.props.currentUser.currentlyReading)
  }

  render() {
    const {
      book,
      currentUser: {
        name,
        bio
      }
    } = this.props;

    console.log(this.props);
    

    return (
      <div className='Profile'>
        <div className='info'>
          <h2>{name}</h2>
          <p>{bio}</p>
        </div>
        <div className='reading'>
          <ClubBook {...book} />
        </div>
      </div>
    );
  };
}

export default ProfilePage;