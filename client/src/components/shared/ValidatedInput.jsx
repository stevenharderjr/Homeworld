import React from 'react';
import LiveInput from './LiveInput.jsx';
import validate from '../../helpers/formValidation.js';

const ValidatedInput = props => {
  const validateInput = (name, value, callback = () => {}) => {
    console.log(validate, props);
    const result = validate[props.type || props.name](value);
    if (result === true) {
      props.onUpdate(name, value, callback);
    } else {
      props.invalidInput(name, value, result);
    }
  }

  return (
    <LiveInput {...props} onUpdate={validateInput} />
  );
}

export default ValidatedInput;