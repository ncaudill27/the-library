import React from 'react';

const InputField = ({handleChange, handleSubmit, inputValue, submitValue}) => (
  <div className='input-field'>
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={handleChange} value={inputValue} />
      <button>{submitValue}</button>
    </form>
  </div>
);

export default InputField;