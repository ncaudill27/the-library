import React from 'react';
import LoginForm from './LoginForm';

class Welcome extends React.Component {
  render() {
    return (
      <div className='Welcome'>
        <LoginForm />
      </div>
    )
  }
}

export default Welcome;