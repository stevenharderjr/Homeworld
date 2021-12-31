import React, {useState} from 'react';

const Button = ({ label, onClick }) => (
  <input type='button' className='formInput' value={label} title={label} onClick={onClick} />
);

export default Button;
