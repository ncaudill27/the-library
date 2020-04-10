import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () =>
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
  </div>;

export default NavBar;