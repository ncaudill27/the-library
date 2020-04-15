import React, { Component } from 'react';
import FormField from './FormField';
import { connect } from 'react-redux';
import { updateUserRequest } from '../actions/users';

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

  handleSubmit = e => {
    e.preventDefault()
    const { updateUserRequest, currentUser } = this.props
    updateUserRequest(this.state, currentUser.id);
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
        <h2>Welcome!</h2> 
        <p>
        Please fill out this information.
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
  };
}

export default connect(null, {updateUserRequest})(NewUser);