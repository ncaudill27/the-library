import React from 'react';
import Input from './Input';

const FormField = ({inputNames, inputValues, submitValue, handleChange, handleSubmit}) => {

  const renderInputs = () => {
    const inputs = []
    for (const i in inputNames) {
      inputs.push(<Input key={inputNames[i]} name={inputNames[i]} value={inputValues[i]} onChange={handleChange} />)
    }
    return inputs
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