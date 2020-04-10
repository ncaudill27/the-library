import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

const NavBar = () =>
  <div className='Navbar'>
    <NavLink
      to='/bestsellers'
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >New York Times Bestsellers</NavLink>
    
    <NavLink
      to='/clubs'
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >Clubs</NavLink>
  </div>;

export default NavBar;