import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserRequest } from '../actions/users';
import BookShow from './BookShow';

function Book({title, author, description, src, isbn13, currentUser, updateUserRequest, clubsCurrentUserMods}) {

  const [showing, showingSet] = useState(false);
  const toggleShowing = () => showingSet(!showing);
  
  const renderCurrentlyReadingButton = () => <>
    <h3>Mark as currently reading for: {select()}</h3><button onClick={() => updateUserRequest({favorite_book_isbn13: isbn13}, currentUser.id)}>Set</button>
  </>;

  const select = () =>
    <select name='isbn'>
      <option value={currentUser.username}>{currentUser.username}</option>
      { clubOptions() }
    </select>

  const clubOptions = () => {
    return clubsCurrentUserMods().map( club => <option key={club.id} value={club.id}>{club.name}</option> );
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


export default connect(mapStateToProps, { updateUserRequest })(Book);