import React, { useState } from 'react';
import { loginRequest } from '../actions/users';
import { connect } from 'react-redux';
import { Typography, FormControl, TextField, Button, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles( themes => ({
  form: {
    margin: themes.spacing(4)
  }
}));

function LoginForm({loginRequest}) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setFn, e) => {
    const value = e.currentTarget.value;
    setFn(value);
  }

  const handleSubmit = e => {
    const payload = {
      username,
      password
    };
    console.log(username, password);
    loginRequest(payload);
    // TODO redirect to '/'
    setUsername('');
    setPassword('');
  };

  return (
    <Box className={classes.form}>
      <Typography variant='h4'>
        Login
      </Typography>
      <FormControl fullWidth>
        <TextField label='Username' onChange={ e => handleChange(setUsername, e) } />
        <TextField type='password' label='Password' onChange={ e => handleChange(setPassword, e) } />
        <Button onClick={handleSubmit}>Login</Button>
      </FormControl>
    </Box>
  );
}

export default connect(null, { loginRequest })(LoginForm);