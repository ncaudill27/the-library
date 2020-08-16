import React, { useState } from 'react';
import FormField from './FormField';
import { loginRequest } from '../actions/users';
import { connect } from 'react-redux';
import { FormControl, TextField, Button, Box, makeStyles } from '@material-ui/core';

function LoginForm({loginRequest}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setFn, e) => {
    const value = e.currentTarget.value;
    setFn(value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      username,
      password
    };
    loginRequest(payload);
    // TODO redirect to '/'
    setUsername('');
    setPassword('');
  };

  return (
    <Box>
      <h2>Login</h2>
      <FormControl fullWidth>
        <TextField label='Username' onChange={ e => handleChange(setUsername, e) } />
        <TextField type='password' label='Password' />
        <Button onClick={handleSubmit}>Login</Button>
      </FormControl>
    </Box>
  );
}

export default connect(null, { loginRequest })(LoginForm);