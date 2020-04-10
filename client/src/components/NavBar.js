import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  textDecoration: 'none',
  color: 'white',
}

const NavBar = () =>
  <div className='Navbar'>
    <NavLink
      to='/bestsellers'
      exact
      style={link}
    >New York Times Bestsellers</NavLink>
    
    <NavLink
      to='/clubs'
      exact
      style={link}
    >Clubs</NavLink>
  </div>;

export default NavBar;