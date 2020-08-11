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
    height: 150,
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
      <Grid container spacing={2}>
        <Grid item xs container direction="column" spacing={2} justify="flex-start" alignItems="flex-start">
          <Grid item>
            <Typography variant='h6'>
                {title}
              </Typography>
          </Grid>
          <Grid item justify="flex-start">
            <Container className={classes.image}>
              <img className={classes.img} src={ imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
            </Container>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container direction="column">
          <Grid item>
            <Typography paragraph>
              {[...authors].join(', ')}
            </Typography>
          </Grid>
          <StarRating count={averageRating} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ClubBook;