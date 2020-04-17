import React from 'react';
import StyledLink from './StyledLink';
import { logOutUser } from '../actions/users';
import { connect } from 'react-redux';

const NavBar = ({currentUser, logOutUser}) =>{

  function logOutButton() {
    return currentUser
    ? <StyledLink to='/' exact className='Navlink' styling='Header-link' onClick={logOutUser}>Log Out</StyledLink>
    : null;
  }

  return (
    <div className='Navbar'>
      {/* <StyledLink
        to='/bestsellers'
        exact
        className='Navlink'
        styling='Header-link'
      >New York Times Bestsellers</StyledLink>

      <StyledLink
        to='/clubs'
        exact
        className='Navlink'
        styling='Header-link'
      >Clubs</StyledLink> */}

      {/* <StyledLink
        to='/'
        exact
        className='Navlink'
        styling='Header-link'
      >Home</StyledLink> */}

      {logOutButton()}
    </div>
  );
};

export default connect(null, { logOutUser })(NavBar);