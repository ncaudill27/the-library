import React from 'react';
import Input from './Input';

const FormField = ({inputNames, inputValues, submitValue, handleChange, handleSubmit}) => {

  const renderInputs = () => {
    const inputs = []
    for (const i in inputNames) {
      inputs.push(<Input name={inputNames[i]} value={inputValues[i]} handleChange={handleChange} />)
    }
    return inputs
  }
  
  return (
    <div className='input-field'>
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <input type='submit' value={submitValue} />
        </form>
    </div>
  )
};

export default FormField;