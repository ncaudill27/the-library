import React, { Component } from 'react';
import FormField from './FormField';

class SignUp extends Component {

  state = {
    name: '',
    username: '',
    email: ''
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
  
  render() {
    const {handleSubmit} = this.props;
    const inputNames = Object.keys(this.state);
    const inputValues = Object.values(this.state);

    return (
      <div className='Sign-up'>
        <h2>Sign Up</h2>
        <FormField
          inputNames={inputNames}
          inputValues={inputValues}
          handleChange={this.handleChange}
          handleSubmit={handleSubmit}
          submitValue="Sign Up"
        />
      </div>
    );
  };
}

export default SignUp;