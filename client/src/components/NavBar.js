import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLink from './HeaderLink';

const NavBar = ({currentUser, logOutUser}) =>{

  function logOutButton() {
    return currentUser
    ? <HeaderLink to='/' exact className='Navlink' onClick={logOutUser}>Log Out</HeaderLink>
    : null;
  }

  return (
    <div className='Navbar'>
      <HeaderLink
        to='/bestsellers'
        exact
        className='Navlink'
      >New York Times Bestsellers</HeaderLink>

      <HeaderLink
        to='/clubs'
        exact
        className='Navlink'
      >Clubs</HeaderLink>

      <HeaderLink
        to='/'
        exact
        className='Navlink'
      >Home</HeaderLink>

      {logOutButton()}
    </div>
  );
};

export default NavBar;