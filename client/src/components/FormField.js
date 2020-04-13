import React from 'react';
import Input from './Input';

const FormField = ({inputNames, inputValues, submitValue, handleChange, handleSubmit}) => {

  const renderInputs = () => {
    const inputs = []
    for (const i in inputNames) {
      const name = inputNames[i]
      const value = inputValues[i]
      inputs.push( <>
        <label>
        {name.charAt(0).toUpperCase() + name.slice(1)}
        <br/>
        <Input
          key={name}
          name={name}
          value={value}
          onChange={handleChange}
        /></label><br/>
      </> );
    }
    return inputs;
  }

  return (
    <div className='Form-field'>
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <input type='submit' value={submitValue} />
        </form>
    </div>
  )
};

export default FormField;