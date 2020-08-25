import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
/* ----------
  Material imports
----------- */
import { Grid, Button, Link, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const { REACT_APP_GOOGLE_BOOKS_KEY } = process.env;

const useStyles = makeStyles( theme => ({
  root: {
    margin: theme.spacing(-1)
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),
    backgroundColor: '#f0f0f0',
    overflow: 'auto'
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: '500',
    paddingTop: theme.spacing(1),
    height: '100%',
    width: '100%'
  },
  details: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),

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
    textAlign: 'justify'
  },
  fallback: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    marginBottom: theme.spacing(1)
  }
}));

function Missing() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant='h5'>
        Select a book
      </Typography>
      <Link
        href='/bestsellers'
        underline='none'
        component={Button}
        variant='contained'
        className={classes.button}
      >
        New York Times Bestsellers
      </Link>
    </Paper>
  )
}
function Fallback({hide}) {
  const classes = useStyles();

  const [message, setMessage] = useState('loading...');
  
  useEffect( () => {
    const timer = setTimeout( () => {
      setMessage(`Sorry we couldn't seem to find more details for this book.`);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Paper elevation={3} onClick={hide} className={classes.fallback}>
      <Typography variant='h5'>
        {message}
      </Typography>
    </Paper>
  )
}

function BookShow({ isbn, hide }) {
  const classes = useStyles();

  const [book, setBook] = useState(null);

  useEffect( () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${REACT_APP_GOOGLE_BOOKS_KEY}`)
    .then( res => res.json() )
    .then( data => setBook(data.items[0].volumeInfo) )
    .catch(errors => console.log(errors));
  }, [isbn]);


  if (!isbn) return <Missing />;
  if (!book) return <Fallback hide={hide} />;
  else return (
    <Box className={classes.root} onClick={hide}>
      <Paper elevation={3}>
        <Typography variant='h5' align='center' className={classes.title}>
          {book.title}
        </Typography>
      </Paper>
      <Paper elevation={1} className={classes.paper} square>
        <Grid className={classes.details} xs={6} item container direction='column' spacing={0} justify='flex-start' alignItems='center'>
          <Grid item>
            <img className={classes.img} src={book.imageLinks ? book.imageLinks.thumbnail : ''} alt={book.title + " Cover Art"} />
          </Grid>
          <Grid item>
            <Typography variant='h6' align='center'>
              Author{book.authors.length <= 1 ? '' : 's'}: {[...book.authors].join(', ')}
            </Typography>
          </Grid>
          <Grid item>
              <StarRating count={book.averageRating} />
          </Grid>
        </Grid>
        <Typography paragraph className={classes.description}>
          {book.description}
        </Typography>
      </Paper>
    </Box>
  );
}

export default BookShow;