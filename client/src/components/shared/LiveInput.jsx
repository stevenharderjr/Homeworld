import React, {useState} from 'react';
import './LiveInput.css';

const LiveInput = ({ name, type, title, hint, label, auto, focus, onUpdate, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = ({ currentTarget: { value }}) => {
    setInputValue(value);
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    inputValue && onUpdate(name, inputValue);
  };

  const handleSubmit = () => {
    inputValue && onUpdate(name, inputValue, onSubmit);
  };

  return (
    <>
      {label && <label htmlFor={name}>{name}</label>}
      <input
        name={name}
        type={type || name}
        title={title || `Enter ${name}`}
        autoFocus={!!focus}
        placeholder={hint || name}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        className='formInput'
        autoComplete={auto || 'off'}
      />
    </>
  );
}

export default LiveInput;
