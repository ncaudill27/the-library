import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({currentUser, logOutUser}) =>{

  function logOutButton() {
    return currentUser !== 0
    ? <NavLink to='/' exact className='Navlink' onClick={logOutUser}>Log Out</NavLink>
    : null;
  }

  return (
    <div className='Navbar'>
      <NavLink
        to='/bestsellers'
        exact
        className='Navlink'
      >New York Times Bestsellers</NavLink>

      <NavLink
        to='/clubs'
        exact
        className='Navlink'
      >Clubs</NavLink>

      <NavLink
        to='/'
        exact
        className='Navlink'
      >Home</NavLink>

      {logOutButton()}
    </div>
  );
};

export default NavBar;