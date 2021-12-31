import React from 'react';
import './css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {

  // }

  render() {
    return (
      <div className='component'>
        <h2>Login / Sign up</h2>
        <form action="">
          <div>
            <input type='text' className='input' placeholder='username'/>
          </div>
          <div>
            <input type='text' className='input' placeholder='password'/>
          </div>
          <input id='submit' className='submit' type='button' value='Submit'/>
        </form>
      </div>
    );
  }
}

export default Login;
