import React from 'react';
import Avatar from './Avatar';
import FormField from './FormField';

const CommentField = ({avatar, username, handleSubmit, handleChange, comment}) => (
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

export default CommentField;