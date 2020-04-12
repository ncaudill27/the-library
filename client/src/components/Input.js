import React from 'react';

const Input = ({name, value, onChange}) =>
  name === 'password' 
  ? <input name={name} type='password' onChange={onChange} value={value} />
  : <input name={name} type='text' onChange={onChange} value={value} />

export default Input;