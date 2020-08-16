import React from 'react';
import LoginForm from './LoginForm';
import LibraryImg from '../library-welcome1.jpg'
import SignUp from './SignUp';
import NewUser from './NewUser';
import { loginRequest, loginUser } from '../actions/users';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( themes => ({
  form: {
    margin: themes.spacing(4)
  }
}));

function WelcomeContainer({currentUser}) {
  const classes = useStyles();

  return (
    <div className='WelcomeContainer'>
      {/* <img id="library" src={LibraryImg} alt="Library" /> */}
      {!!currentUser
        ? !!currentUser.name
          ? <h1>Welcome {currentUser.name}!</h1>
          : <NewUser currentUser={currentUser} loginUser={loginUser} />
        : <>
          <LoginForm />
          <SignUp />
        </>
      }
    </div>
  );
}

export default connect(null, { loginRequest, loginUser })(WelcomeContainer);
