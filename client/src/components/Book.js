import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserRequest } from '../actions/users';

function Book({title, author, description, src, isbn13, currentUser, updateUserRequest}) {

  const renderCurrentlyReadingButton = () => {
    return <NavLink to={`/${currentUser.username}`} exact className='Navlink'
    onClick={() => updateUserRequest({favorite_book_isbn13: isbn13}, currentUser.id)}
      ><h3>Make favorite</h3></NavLink>
  };
  
  return (
    <div className='Book'>
      <img src={src} alt={title + " Cover Picture"} />
      <div className='details'>
        <h3>
          <NavLink
            to={`/bestsellers/${isbn13}`}
            exact
            className='Navlink'
          >{title}</NavLink>
        </h3>
        <h3>By: {author}</h3>
        <p>{description}</p>
      </div>
      <div className='buttons'>
        {currentUser ? renderCurrentlyReadingButton() : null}
      </div>
    </div>
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