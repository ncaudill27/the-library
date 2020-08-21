import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
/* ----------
  Material imports
----------- */
import { Grid, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const { REACT_APP_GOOGLE_BOOKS_KEY } = process.env;

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),
    backgroundColor: '#eaa29f',
    overflow: 'auto'
  },
  title: {
    height: '100%',
    width: '100%'
  },
  details: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
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
  },
  description: {
    marginTop: theme.spacing(2)
  }
}));

function BookShow({ isbn, hide }) {
  const classes = useStyles();
  const theme = useTheme();

  const [book, setBook] = useState(null);
  console.log(theme);

  useEffect( () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${REACT_APP_GOOGLE_BOOKS_KEY}`)
    .then( res => res.json() )
    .then( data => setBook(data.items[0].volumeInfo) )
    .catch(errors => console.log(errors));
  }, [isbn]);

  if (!book) return <h2 onClick={hide}>loading...</h2>;
  else return (
    <Paper elevation={3} className={classes.paper} onClick={hide} color={theme.palette.secondary.light}>
      <Grid item >
        <Box className={classes.title}>
        <Typography variant='h5' align='center'>
            {book.title}
        </Typography>
        </Box>
      </Grid>
      <Grid className={classes.details} xs={6} item container direction='column' spacing={0} justify='flex-start' alignItems='center'>
        <Grid item>
          <Typography variant='h6' align='center'>
            Author{book.authors.length <= 1 || 's'}: {[...book.authors].join(', ')}
          </Typography>
        </Grid>
        <Grid item>
            <StarRating count={book.averageRating} />
        </Grid>
        <Grid item>
          <img className={classes.img} src={book.imageLinks ? book.imageLinks.thumbnail : ''} alt={book.title + " Cover Art"} />
        </Grid>
      </Grid>
      <Typography paragraph className={classes.description}>
        {book.description}
      </Typography>
    </Paper>
  );
}

export default BookShow;