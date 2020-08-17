import React, { useState } from 'react';
import FormField from './FormField';
import { connect } from 'react-redux';
import { updateUserRequest, loginUser } from '../actions/users';
import { Typography } from '@material-ui/core'

function NewUser({currentUser, loginUser, updateUserRequest}) {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const handleChange = (setFn, e) => {
    const value = e.target.value;
    setFn(value);
  };

  const handleSubmit = e => {
    const payload = {
      name,
      username,
      bio
    }
    updateUserRequest(payload, currentUser.id);
    setName('');
    setUsername('');
    setBio('');
  };
    
  return (
    <div class='New-user'>
      <Typography variant='h4'>
        Welcome!
      </Typography> 
      <Typography paragraph>
        Please fill out this information.
        Don't worry your name or email won't be made public.
      </Typography>
    </div>
  );
}

export default connect(null, {updateUserRequest})(NewUser);