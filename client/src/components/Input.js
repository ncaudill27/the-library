import React from 'react';

const Input = ({name, value, onChange}) => {
  switch(name) {

    case "password":
    case "confirmPassword":
      return <input name={name} type='password' onChange={onChange} value={value} autoComplete='off' />;

    case "description":
    case "bio":
      return <textarea name={name} onChange={onChange}>{value}</textarea>;

    default:
      return <input name={name} type='text' onChange={onChange} value={value} autoComplete='off' />;
  };
};

export default Input;