import React from 'react';
import { NavLink } from 'react-router-dom';

const StyledLink = props =>
  <div className='Thread-link'>
    <NavLink {...props} />
  </div>;

export default StyledLink;