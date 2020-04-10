import React from 'react';

const InputField = ({handleChange, handleSubmit, input, value}) => (
  <div className='input-field'>
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={handleChange} value={input} />
      <button>{value}</button>
    </form>
  </div>
);

export default InputField;