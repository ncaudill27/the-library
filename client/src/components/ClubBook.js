import React from 'react';
import StarRating from './StarRating';
/* ----------
  Material imports
----------- */
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( themes => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: themes.spacing(2),
    backgroundColor: '#f0f0f0'
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
}));

function ClubBook({ title, authors, averageRating, imageLinks, description }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={1} justify="flex-start">
          <Grid item xs={6} container direction="column" spacing={2} justify="flex-start" alignItems="flex-start">
            <Grid item>
              <Typography variant='h5'>
                  {title}
                </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h6'>
                Author{authors.length <= 1 || 's'}: {[...authors].join(', ')}
              </Typography>
            </Grid>
            <StarRating count={averageRating} />
            <Grid item>
              {/* <Container className={classes.image}> */}
                <img className={classes.img} src={ imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
              {/* </Container> */}
            </Grid>
          </Grid>
          <Grid item xs={6} container alignItems="center" justify="flex-start">
            <Grid item>
                <Typography paragraph>
                    {description}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ClubBook;