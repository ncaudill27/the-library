import React from 'react';

const Input = ({name, value, onChange}) =>
  name === 'password' 
  ? <input name={name} type='password' onChange={onChange} value={value} autoComplete='off' />
  : <input name={name} type='text' onChange={onChange} value={value} autoComplete='off' />

export default Input