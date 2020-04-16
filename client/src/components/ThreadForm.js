import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postThread } from '../actions/threads';
import FormField from './FormField';

function ThreadForm({clubId, currentUserId, postThread}) {
  const [title, setTitle] = useState('');

  const handleChange = event => {
    setTitle(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const payload = {
      club_id: clubId,
      title
    }
    postThread(payload);
    setTitle('');
  };

  return (
    <div className='Thread-form'>
      <h2>New Thread</h2>
      <FormField
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputNames={{1: 'title'}}
        inputValues={{1: title}}
        submitValue="Begin Thread"
      />
    </div>
  );
}

export default connect(null, {postThread})(ThreadForm);