import React, {PureComponent} from 'react';
import ValidatedInput from '../components/shared/ValidatedInput.jsx';
import Button from '../components/shared/Button.jsx';
import {Link} from 'react-router-dom';
import validate from '../helpers/formValidation.js';

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {
      householdName: '',
      username: '',
      contact: '',
      password: ''
    }
  }

  handleUpdate(name, value, callback = () => {}) {
    this.setState({ [name]: value }, callback);
  }

  handleSubmit() {
    if (householdName && householdUUID && email && password) {
      this.props.registerHousehold({...this.state});
    }
  }

  render() {
    const { handleUpdate, handleSubmit } = this;
    let key = 0;
    return (
      <div className='registrationForm component'>
        <h2>Household Registration</h2>
        <ValidatedInput key='1' name='householdName' auto='family-name' type='username' onUpdate={handleUpdate} onSubmit={handleSubmit} hint='Household Name' focus={true} />
        <ValidatedInput key='2' name='contact' auto='on' type='text' onUpdate={handleUpdate} onSubmit={handleSubmit} hint='Email or phone number' />
        <ValidatedInput key='3' name='username' auto='username' onUpdate={handleUpdate} onSubmit={handleSubmit} hint='Create username' />
        <ValidatedInput key='4' name='password' auto='new-password' onUpdate={handleUpdate} onSubmit={handleSubmit} hint='Create password' />
        <Button label='Submit' onClick={handleSubmit} />
        <Link className='linkText' to='/login'>Already have an account? Sign in here!</Link>
      </div>
    );
  }
}

export default Register;
