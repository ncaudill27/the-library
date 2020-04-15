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
        {parseName(name)}
        <br/>
        <Input
          key={name}
          name={name}
          value={value}
          handleChange={handleChange}
        /></label><br/>
      </> );
    }

    return inputs;
  }

  const parseName = name => {
    if ((/[A-Z]/.test(name))) {
      const upper = name.match(/[A-Z]/)
      return name.charAt(0).toUpperCase() + name.slice(1).replace(upper[0], ' ' + upper[0])
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1)
    };
  };

  return (
    <div className='Form-field'>
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <input type='submit' value={submitValue} />
        </form>
    </div>
  );
};

export default FormField;