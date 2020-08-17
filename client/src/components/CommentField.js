import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormField from './FormField';
import { postComment } from '../actions/comments';
/* ----------
  Material imports
---------- */
import { Avatar, Box, Button, FormControl, TextField, Container } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const CommentField = ({currentUser: {id: userId, avatar, username}, threadId, postComment}) => {
  const [comment, setComment] = useState('');

  const handleChange = event => {
    setComment(event.target.value);
  }

  const handleSubmit = () => {
    const payload = {
      user_id: userId,
      board_id: threadId,
      content: comment
    };
    console.log(payload);
    postComment(payload);
    setComment('');
  };

  return (
    <Container>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Avatar src={avatar} showing={username + "'s avatar"} />
        <FormControl>
          <Box display='flex' alignItems='center' justifyContent='spread-evenly'>
            <TextField label='New comment' variant='outlined' size='small' value={comment} onChange={handleChange} />
            <Button onClick={handleSubmit}><SendIcon /></Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
};

export default connect(null, { postComment })(CommentField);