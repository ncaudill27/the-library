import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormField from './FormField';
import { postComment } from '../actions/comments';
/* ----------
  Material imports
---------- */
import { Avatar, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const CommentField = ({currentUser: {id: userId, avatar, username}, threadId, postComment}) => {
  const [comment, setComment] = useState('');

  const handleChange = event => {
    setComment(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const payload = {
      user_id: userId,
      board_id: threadId,
      content: comment
    };
    postComment(payload);
    setComment('');
  };

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Avatar src={avatar} showing={username + "'s avatar"} />
      <FormField
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputNames={{1: 'comment'}}
        inputValues={{1: comment}}
        submitValue={<SendIcon />}
      />
  </Box>
  );
};

export default connect(null, { postComment })(CommentField);