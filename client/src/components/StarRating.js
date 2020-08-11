import React from 'react';
import Star from './Star';

import { Grid } from '@material-ui/core';

function StarRating({count}) {

  function convertToStars() {
    let rating = [];
    for (let i = 0; i < count; i++) {
      rating.push(<Star key={i} />)
    };
    return rating;
  }

  return (
    count
    ? <Grid container xs justify="space-around" alignItems="center">
        {convertToStars()}
      </Grid>
    : null
  );
}

export default StarRating;