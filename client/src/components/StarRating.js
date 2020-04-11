import React from 'react';
import Star from './Star';

const StarRating = ({count}) => {

  function convertToStars() {
    let rating = []
    for (let i = 0; i < count; i++) {
      rating.push(<Star />)
    }
    return rating
  }
  
  return convertToStars()
}

export default StarRating;