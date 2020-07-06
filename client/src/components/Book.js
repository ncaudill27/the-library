import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserRequest } from '../actions/users';
import { patchClubRequest } from '../actions/clubs';
import BookShow from './BookShow';

function Book({title, author, description, src, isbn13, currentUser, updateUserRequest, patchClubRequest, clubsCurrentUserMods}) {

  const [showing, showingSet] = useState(false);
  const toggleShowing = () => showingSet(!showing);

  const [updateTarget, updateTargetSet] = useState(currentUser.username);
  const setUpdateTarget = e => updateTargetSet(e.target.value);
  
  const renderCurrentlyReadingButton = () => <>
    <h3>Mark as currently reading for: {select()}
    <NavLink
      to={linkDestination}
      onClick={handleUpdate}
      className='Navlink'
    >Set</NavLink>
    </h3>
  </>;

  const select = () =>
    <select name='isbn' onChange={setUpdateTarget}>
      <option value={currentUser.username}>{currentUser.username}</option>
      { clubOptions() }
    </select>

  const clubOptions = () => {
    return clubsCurrentUserMods().map( club => <option key={club.id} value={club.id}>{club.name}</option> );
  }

  const linkDestination = () => {
    return updateTarget === currentUser.username
    ? `/${updateTarget}`
    : `/clubs/${updateTarget}`
  }

  const handleUpdate = () => {
    updateTarget === currentUser.username
    ? userUpdate()
    : clubUpdate();
  }

  const userUpdate = () => {
    const payload = {
      user: {
        favorite_book_isbn13: isbn13
      }
    };

    updateUserRequest(payload, currentUser.id);
  }

  const clubUpdate = () => {
    const payload = {
      club: {
        active_book_isbn13: isbn13
      }
    };

    patchClubRequest(payload, updateTarget);
  }

  const listBook = () =>
    <div className='Book'>
      <img src={src} alt={title + " Cover Picture"} />
      <div className='details'>
        <h3 onClick={toggleShowing} className='Navlink'>{title}</h3>
        <h3>By: {author}</h3>
        <p>{description}</p>
      </div>
      <div className='buttons'>
        {currentUser ? renderCurrentlyReadingButton() : null}
      </div>
    </div>;
  
  return (
    showing ? <BookShow isbn={isbn13} hide={toggleShowing} /> : listBook()
  );
}

Book.defaultProps = {
  title: "Title Missing",
  author: "Author Missing",
  src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freadtiger.com%2Fwkp%2Fen%2FBook%3AJulia_Lee&psig=AOvVaw0DuqWZ0Te6nFrmVXIIVetb&ust=1586286067381000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjg6Z--1OgCFQAAAAAdAAAAABAD",
  description: "No description posted"
}

const mapStateToProps = ({users}) => ({
  currentUser: users.currentUser
});


export default connect(mapStateToProps, { updateUserRequest, patchClubRequest })(Book);