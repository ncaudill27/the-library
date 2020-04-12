import React from 'react';
import LoginForm from './LoginForm';

class WelcomeContainer extends React.Component {

  loginRequest = payload => {
    const requestObj = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify(payload)
    } 
    fetch('/auth/login', requestObj)
    .then(res => res.json())
    .then(user => {
      console.log(user.auth_token, user.success)
    })
    .catch(errors => console.log(errors)); 
  }
  
  render() {
    return (
      <div className='WelcomeContainer'>
        <LoginForm loginRequest={this.loginRequest} />
      </div>
    )
  }
}

export default WelcomeContainer;