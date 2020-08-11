import React from 'react';
import Star from './Star';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  rating: {
    marginLeft: '6px'
  }
})

function StarRating({count}) {
  const classes = useStyles();

  function convertToStars() {
    let rating = [];
    for (let i = 0; i < count; i++) {
      rating.push(<Star key={i} />)
    };
    return rating;
  }

  return (
    count
    ? <Grid className={classes.rating} container xs justify="flex-start" alignItems="center">
        {convertToStars()}
      </Grid>
    : null
  );
}

export default StarRating;