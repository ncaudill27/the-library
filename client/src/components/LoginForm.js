import React, { Component } from 'react';
import InputField from './InputField';

class LoginForm extends Component {

  
  render() {
    return (
      <div className='Login-form'>

        <InputField
           handleChange={this.handleChange}
           handleSubmit={this.handleSubmit}
           inputValue={this.state.input}
           submitValue="Login"
        />
      </div>
    );
  }
}