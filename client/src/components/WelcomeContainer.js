import React from 'react';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import NewUser from './NewUser';

class WelcomeContainer extends React.Component {
  
  render() {
    const {handleSignUp, loginRequest, currentUser, updateCurrentUser} = this.props
    return (
      <div className='WelcomeContainer'>
        {!!currentUser
          ? !!currentUser.name
            ? <h1>Welcome {currentUser.name}</h1>
            : <NewUser currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
          : <>
            <LoginForm loginRequest={loginRequest} />
            <SignUp updateCurrentUser={updateCurrentUser} />
          </>
        }
      </div>
    )
  }
}

export default WelcomeContainer;
