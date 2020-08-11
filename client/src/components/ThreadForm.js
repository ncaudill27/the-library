import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postThread } from '../actions/threads';
import FormField from './FormField';

function ThreadForm({clubId, postThread}) {
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
      <FormField
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputNames={{1: 'Start New Thread '}}
        inputValues={{1: title}}
        submitValue="Begin Thread"
      />
  );
}

export default connect(null, {postThread})(ThreadForm);