import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postThread } from '../actions/threads';
import FormField from './FormField';
import { FormControl, TextField, Button, Box, Grid } from '@material-ui/core';

function ThreadForm({clubId, postThread}) {
  const [title, setTitle] = useState('');

  const handleChange = e => setTitle(e.target.value);

  const handleSubmit = e => {
    const payload = {
      club_id: clubId,
      title
    }
    postThread(payload);
    setTitle('');
  };

  return (
    <FormControl>
      <Grid container spacing={0} alignItems='flex-end' justify='space-evenly'>
        <Grid item xs={6}>
          <TextField label='Open new thread' variant='outlined' size='small' value={title} onChange={handleChange} />
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit}>
            Create Discussion
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default connect(null, {postThread})(ThreadForm);