import React from 'react';
import Star from './Star';

function StarRating({count}) {

  function convertToStars() {
    let rating = [];
    for (let i = 0; i < count; i++) {
      rating.push(<Star />)
    };
    return rating;
  }

  return (
    count
    ? <div className='Rating'>
        <div className='Stars'>
          {convertToStars()}
        </div>
      </div>
    : null
  );
}

export default StarRating;