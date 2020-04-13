import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderLink = props =>
  <div className='Header-link'>
    <NavLink {...props} />
  </div>

export default HeaderLink;