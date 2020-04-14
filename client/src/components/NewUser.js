import React, { useState } from 'react';
import FormField from './FormField';

const NewUser = ({currentUser, updateCurrentUser}) => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  const updateUserRequest = payload => {
    const token = localStorage.getItem('token')
    const requestObj = {
      'method': 'PATCH',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify(payload)
    };

    fetch('/api/v1/users', requestObj)
    .then(res => res.json())
    .then(response => {
      console.log(response);

    })
  }

  function handleSubmit() {
    console.log(this.state);
    
  }

  const inputNames = Object.key(this.state);
  const inputValues = Object.values(this.state);

  return (
    <div class='New-user'>
      <p>
      Welcome! Please fill out this information.
      Don't worry your name or email won't be made public.
      </p>
      <FormField
        inputNames={inputNames}
        inputValues={inputValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default NewUser;