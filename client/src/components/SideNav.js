import React from 'react';
import StyledLink from './StyledLink';

function SideNav() {
  return (
    <div className='SideNav'>
      <StyledLink to='/' exact className='Navlink' styling='Sidebar-link'><h3>Home</h3></StyledLink>
      <StyledLink to='/bestsellers' exact className='Navlink' styling='Sidebar-link'><h3>New York Times Bestsellers</h3></StyledLink>
      <StyledLink to='/clubs' exact className='Navlink' styling='Sidebar-link'><h3>Clubs</h3></StyledLink>
    </div>
  );
}

export default SideNav;