import React from 'react';
import StarRating from './StarRating';
/* ----------
  Material imports
----------- */
import { Grid, Container, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( themes => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: themes.spacing(2),
    marginBottom: themes.spacing(4),
    backgroundColor: '#f0f0f0',
    overflow: 'auto'
  },
  details: {
    margin: themes.spacing(1),
    padding: themes.spacing(1),
    float: 'right',
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
    <Paper elevation={3} className={classes.paper}>
      <Typography variant='h6' align='center'>
        Current Book
      </Typography>
        <Grid className={classes.details} xs={6} item container direction='column' spacing={0} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant='h5' align='center'>
                {title}
              </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h6' align='center'>
              Author{authors.length <= 1 || 's'}: {[...authors].join(', ')}
            </Typography>
          </Grid>
          <Grid item>
              <StarRating count={averageRating} />
          </Grid>
          <Grid item>
            <img className={classes.img} src={imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
          </Grid>
        </Grid>
      <Typography paragraph>
        {description}
      </Typography>
    </Paper>
  );
}

export default ClubBook;