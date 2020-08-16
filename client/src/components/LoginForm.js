import React, { useState } from 'react';
import FormField from './FormField';
import { loginRequest } from '../actions/users';
import { connect } from 'react-redux';
import { FormControl, TextField } from '@material-ui/core';

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
    setUsername('');
    setPassword('');
  };

  return (
    <div className='Login-form'>
      <h2>Login</h2>
      <FormControl>
        
      </FormControl>
    </div>
  );
}

export default connect(null, { loginRequest })(LoginForm);