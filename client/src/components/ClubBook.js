import React from 'react';
import StarRating from './StarRating';
/* ----------
  Material imports
----------- */
import { Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  image: {
    height: 'auto',
    width: 'auto'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
});

function ClubBook({ title, authors, averageRating, imageLinks }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justify="space-around">
        <Grid item xs={6} container direction="column" spacing={2} justify="flex-start" alignItems="flex-start">
          <Grid item>
            <Typography variant='h6'>
                {title}
              </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} spacing={1} container direction="column" justify="flex-start" alignItems="flex-start">
          <Grid item>
            <Typography paragraph>
              {[...authors].join(', ')}
            </Typography>
          </Grid>
          <StarRating count={averageRating} />
          <Grid item>
            {/* <Container className={classes.image}> */}
              <img className={classes.img} src={ imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
            {/* </Container> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClubBook;