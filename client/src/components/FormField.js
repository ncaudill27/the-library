import React from 'react';
import Input from './Input';

// This component takes in objects the names and values of forms about to be rendered.
// Iterating over these objects it will dynamically create a form depending on the objects passed in.
const FormField = ({inputNames, inputValues, submitValue, handleChange, handleSubmit}) => {

  const renderInputs = () => {
    const inputs = []

    for (const i in inputNames) {
      // Grab needed values from both inputNames and inputValues simultaneously
      const name = inputNames[i]
      const value = inputValues[i]

      inputs.push(
        <label key={name}>
          {name === "comment" || name === "title" ? null : parseName(name)} {/* Conditional render of some labels */}
          {name === "title" ? null : <br/>}                                 {/* Conditional render of line break */}
          <Input
            key={name}
            name={name}
            value={value}
            handleChange={handleChange}
          />
        {name === "comment" || name === "title" ? null : <br/>}             {/* Conditional render of line break */}
        </label>
      );
    }

    return inputs;
  }

  // parseName will convert JS namespaced variables into user friendly text.
  const parseName = name => {
    // Here it checks for camelCase
    if ((/[A-Z]/.test(name))) {
      const upper = name.match(/[A-Z]/) // Saves the capital letter here
      //     Capitalize first letter      // Add a space before previously saved capital letter and join
      return name.charAt(0).toUpperCase() + name.slice(1).replace(upper[0], ' ' + upper[0])
    // If not camelCase
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1) // Capitalize first letter & join
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