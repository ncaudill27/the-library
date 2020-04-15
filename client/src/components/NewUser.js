import React, { Component } from 'react';
import FormField from './FormField';

class NewUser extends Component {

  state = {
    name: '',
    username: '',
    bio: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateUserRequest = () => {
    const {
      props: {
        currentUser, updateCurrentUser
      },
      state
    } = this

    const token = localStorage.getItem('token')
    const requestObj = {
      'method': 'PATCH',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify(state)
    };

    fetch(`/api/v1/users/${currentUser.id}`, requestObj)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      updateCurrentUser(response.user.data)
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    this.updateUserRequest();
    this.setState({
      name: '',
      username: '',
      bio: ''
    });
  };

  render() {
    const {handleChange, handleSubmit, state} = this;
    const inputNames = Object.keys(state);
    const inputValues = Object.values(state);
    
    return (
      <div class='New-user'>
        <p>
        <strong>Welcome!</strong> Please fill out this information.
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
}

export default NewUser;