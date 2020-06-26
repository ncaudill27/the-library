import React from 'react';

const Input = ({name, value, handleChange}) => {
  switch(name) {

    case "password":
    case "confirmPassword":
      return <input name={name} type='password' onChange={handleChange} value={value} autoComplete='off' />;

    case "description":
    case "bio":
      return <textarea name={name} onChange={handleChange} value={value}></textarea>;

    default:
      return <input name={name} type='text' onChange={handleChange} value={value} autoComplete='off' />;
  };
};

export default Input;