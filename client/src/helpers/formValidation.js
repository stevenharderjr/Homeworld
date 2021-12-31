const validate = {
  username: input => {
    console.log('Validating username:', input);
    return true;
  },
  email: input => {
    console.log('Validating email:', input);
    return true;
  },
  password: input => {
    console.log('Validating password:', input);
    return true;
  }
};

export default validate;
