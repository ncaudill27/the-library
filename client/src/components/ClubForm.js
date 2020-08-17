import React, { useState } from 'react';
import FormField from './FormField';
import { postClubRequest } from '../actions/clubs';
import { addClub } from '../actions/users';
import { connect } from 'react-redux';
import { Typography, FormControl, TextField, Button, Box } from '@material-ui/core';

function ClubForm({postClubRequest, addClub}) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = (setFn, e)=> {
    const value = e.target.value;
    setFn(value);
  }

  const handleSubmit = e => {
    const payload = {
      club: {
        name,
        description
      }
    };
    
    postClubRequest(payload);
    setName('');
    setDescription('');
  }

  return (
    <Box>
      <Typography variant='h4'>
        Create Club
      </Typography>
      <FormControl fullWidth>
        <TextField
          label='Club name'
          value={name}
          onChange={ e => handleChange(setName, e)}
        />
        <TextField
          label='Description'
          value={description}
          multiline
          rowsMax={6}
          onChange={ e => handleChange(setDescription, e)}
        />
        <Button onClick={handleSubmit}>
          Create Club
        </Button>
      </FormControl>
    </Box>
  );
}

export default connect(null, { postClubRequest, addClub })(ClubForm);