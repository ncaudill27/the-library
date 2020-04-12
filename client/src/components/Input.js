import React from 'react';

const Input = ({name, value, onChange}) =>
  <input name={name} type='text' onChange={onChange} value={value} />

export default Input;