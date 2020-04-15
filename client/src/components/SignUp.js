import React, { Component } from 'react';
import FormField from './FormField';
import { userPostRequest } from '../actions/users';
import { connect } from 'react-redux';

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
    this.props.userPostRequest(payload);
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

export default connect(null, { userPostRequest })(SignUp);