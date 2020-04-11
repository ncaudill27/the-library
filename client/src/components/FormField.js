import React from 'react';

const FormField = ({handleChange, handleSubmit, inputValue, submitValue}) => (
  <div className='input-field'>
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={handleChange} value={inputValue} />
      <button>{submitValue}</button>
    </form>
  </div>
);

export default FormField;