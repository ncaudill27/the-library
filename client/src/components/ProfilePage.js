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
        bio,
        currentlyReading
      }
    } = this.props;

    const isbn = RegExp(currentlyReading);

    return (
      <div className='Profile'>
        <div className='info'>
          <h2>{name}</h2>
          <p>{bio}</p>
        </div>
        <div className='reading'>
          { isbn.test(book.infoLink) ? <ClubBook {...book} /> : null }
        </div>
      </div>
    );
  };
}

export default ProfilePage;