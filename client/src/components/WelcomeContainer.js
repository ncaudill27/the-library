import React from 'react';
import LoginForm from './LoginForm';
// import LibraryImg from '../library-welcome1.jpg'
import SignUp from './SignUp';
import NewUser from './NewUser';

function WelcomeContainer({currentUser}) {

  return (
    <div className='WelcomeContainer'>
      {/* <img id="library" src={LibraryImg} alt="Library" /> */}
      {!!currentUser
        ? !!currentUser.name
          ? <h1>Welcome {currentUser.name}!</h1>
          : <NewUser currentUser={currentUser} />
        : <>
          <LoginForm />
          <SignUp />
        </>
      }
    </div>
  );
}

export default WelcomeContainer;
