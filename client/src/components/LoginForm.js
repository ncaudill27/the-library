import React, { Component } from 'react';
import FormField from './FormField';

class LoginForm extends Component {

  
  render() {
    return (
      <div className='Login-form'>

        <FormField
           handleChange={this.handleChange}
           handleSubmit={this.handleSubmit}
           inputValue={this.state.input}
           submitValue="Login"
        />
      </div>
    );
  }
}