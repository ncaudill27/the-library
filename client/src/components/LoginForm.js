import React, { Component } from 'react';
import FormField from './FormField';

class LoginForm extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const payload = this.state
  }
  
  render() {
    const {username, password} = this.state
    return (
      <div className='Login-form'>
        <h2>Login</h2>
        <FormField
           handleChange={this.handleChange}
           handleSubmit={this.handleSubmit}
           inputNames={{ 1: "username", 2: "password" }}
           inputValues={{ 1: username, 2: password }}
           submitValue="Login"
        />
      </div>
    );
  }
}

export default LoginForm;