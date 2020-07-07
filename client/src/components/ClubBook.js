import React from 'react';
import StarRating from './StarRating';

function ClubBook({ title, authors, averageRating, imageLinks }) {

  return (
    <div className='Club-book'>
      <img id="clubbook" src={ imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
      <div className='Club-book-details'>
        <h3>{title}</h3>
        <p>{authors}</p>
        <StarRating count={averageRating} />
      </div>
    </div>
  );
}

export default ClubBook;