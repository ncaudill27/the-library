import React from 'react';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import NewUser from './NewUser';
import { loginRequest, loginUser } from '../actions/users';
import { connect } from 'react-redux';

class WelcomeContainer extends React.Component {
  
  render() {
    const {loginRequest, currentUser} = this.props
    return (
      <div className='WelcomeContainer'>
        {!!currentUser
          ? !!currentUser.name
            ? <h1>Welcome {currentUser.name}</h1>
            : <NewUser currentUser={currentUser} loginUser={loginUser} />
          : <>
            <LoginForm loginRequest={loginRequest} />
            <SignUp loginUser={loginUser} />
          </>
        }
      </div>
    )
  }
}

export default connect(null, { loginRequest, loginUser })(WelcomeContainer);
