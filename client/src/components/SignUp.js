import React, { Component } from 'react';
import FormField from './FormField';

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: ''
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
      if (response.errors) return console.log(response.errors);
      localStorage.setItem('token', response.auth_token);
      this.props.updateCurrentUser(response.user.data);
      // <FlashMessage response.success />
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const {email, password, confirmPassword} = this.state
    const payload = {
        user: {
          email,
          password,
          password_confirmation: confirmPassword
        }
    }
    this.userPostRequest(payload);
    this.setState({
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