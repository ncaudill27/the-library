import React from 'react';
import LoginForm from './LoginForm';

class WelcomeContainer extends React.Component {

  state = {
    currentUser: {}
  }

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
    .then(response => {
      if (response.failure) return console.log(response.failure); //TODO Handle this
      localStorage.setItem('token', response.auth_token)
      localStorage.setItem('currentUser', response.user.data.id)
      // <FlashMessage message{response} />
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