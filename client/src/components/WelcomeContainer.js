import React from 'react';
import LoginForm from './LoginForm';

class WelcomeContainer extends React.Component {
  
  render() {
    return (
      <div className='WelcomeContainer'>
        <LoginForm loginRequest={this.props.loginRequest} />
      </div>
    )
  }
}

export default WelcomeContainer;