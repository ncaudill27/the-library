import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from './Avatar';
import FormField from './FormField';
import { postComment } from '../actions/comments';


const CommentField = ({currentUser: {id: userId, avatar, username}, threadId, postComment}) => {
  const [comment, setComment] = useState('');

  const handleChange = event => {
    setComment(event.target.value);
    console.log(event.target.value);
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
    <div className='Comment-field'>
      <Avatar avatar={avatar} showing={username} />
      <FormField
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputNames={{1: 'comment'}}
        inputValues={{1: comment}}
        submitValue="Comment"
      />
  </div>
  );
};

export default connect(null, { postComment })(CommentField);