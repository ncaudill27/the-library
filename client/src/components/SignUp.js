import React, { Component } from 'react';
import FormField from './FormField';

class SignUp extends Component {

  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  userPostRequest = payload => {
    const requestObj = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      'body': JSON.stringify(payload)
    }
    fetch('/api/v1/users', requestObj)
    .then(res => res.json())
    .then(response => {
      console.log(response);

      if (response.failure) return console.log(response.failure);
      this.props.handleSignUp(response.data);
      // <FlashMessage response.success />
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const {username, email, password, confirmPassword} = this.state
    const payload = {
        username,
        email,
        password,
        password_confirmation: confirmPassword
    }
    this.userPostRequest(payload);
    this.setState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }
  
  render() {
    const {handleChange, handleSubmit, state} = this;
    const inputNames = Object.keys(state);
    const inputValues = Object.values(state);

    return (
      <div className='Sign-up'>
        <h2>Sign Up</h2>
        <FormField
          inputNames={inputNames}
          inputValues={inputValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitValue="Sign Up"
        />
      </div>
    );
  };
}

export default SignUp;