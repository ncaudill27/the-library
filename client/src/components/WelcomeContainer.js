import React from 'react';
import LoginForm from './LoginForm';
import SignUp from './SignUp';

class WelcomeContainer extends React.Component {
  
  render() {
    const {handleSignUp, loginRequest} = this.props
    return (
      <div className='WelcomeContainer'>
        <LoginForm loginRequest={loginRequest} />
        <SignUp handleSignUp={handleSignUp} />
      </div>
    )
  }
}

export default WelcomeContainer;
