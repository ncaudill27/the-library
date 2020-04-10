import React from 'react';

const InputField = ({handleChange, handleSubmit}) => (
  <div className='input-field'>
    <input type='text' onChange={handleChange} />
    <button onClick={handleSubmit} >Click me!</button>
  </div>
);

export default InputField;