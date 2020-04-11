import React from 'react';
import { NavLink } from 'react-router-dom';

function Book({title, author, description, src, isbn13}) {
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
    </div>
  );
}

Book.defaultProps = {
  title: "Title Missing",
  author: "Author Missing",
  src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freadtiger.com%2Fwkp%2Fen%2FBook%3AJulia_Lee&psig=AOvVaw0DuqWZ0Te6nFrmVXIIVetb&ust=1586286067381000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjg6Z--1OgCFQAAAAAdAAAAABAD",
  description: "No description posted"
}

export default Book;