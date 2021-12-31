import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// import LiveInput from '../components/shared/LiveInput.jsx';
import ValidatedInput from '../components/shared/ValidatedInput.jsx';
import Button from '../components/shared/Button.jsx';
import axios from 'axios';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleUpdate(name, value, callback = () => {}) {
    this.setState({ [name]: value }, callback);
  }

  handleSubmit() {
    const { username, password } = this.state;
    if (username && password) {
      console.log(
        `Submitting username (${username}) and password (${password})`
      );
      axios
        .post('/login', this.state)
        .then((response) => {
          console.log('Response from server:', response);
        })
        .catch((err) => {
          console.log('Unable to authenticate:', err);
        });
      // this.props.updateSession({ username, password });
    }
  }

  render() {
    const { handleUpdate, handleSubmit } = this;
    return (
      <div id="Login" className="loginForm component">
        <h2>Homeworld Login</h2>
        <ValidatedInput
          key="1"
          name="username"
          auto="username"
          onUpdate={handleUpdate}
          onSubmit={handleSubmit}
          hint="Username"
          focus={true}
        />
        <ValidatedInput
          key="2"
          name="password"
          auto="current-password"
          onUpdate={handleUpdate}
          onSubmit={handleSubmit}
          hint="Password"
        />
        <Button label="Submit" onClick={handleSubmit} />
        <Link className="linkText" to="/registration">
          New to Homeworld? Register here!
        </Link>
      </div>
    );
  }
}

export default Login;
