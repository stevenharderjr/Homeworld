import React from 'react';
import './css/AddMember.css';

class AddMember extends React.Component {
  constructor(props) {
    super(props);

    this.userInput = React.createRef();

    this.state = {
      inputValue: ''
    };
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.inputValue.length) {
      this.props.onCreate({ name: this.state.inputValue });
    }
  }

  componentDidMount() {
    this.userInput.current.focus();
  }

  render() {
    return (
      <div className='component' id='addMemberComponent'>
        <h2>Add Household Member</h2>
        <form target=''>
          <input type='text' className='input' id='addMemberInput' placeholder='First name' ref={this.userInput} onKeyPress={(e) => this.handleKeyPress(e)} onChange={(e) => this.handleInputChange(e)} />
          <input type='button' className='submit' id='addMemberSubmit' value='submit' onClick={(e) => this.props.onCreate({ name: this.state.inputValue })} />
        </form>
      </div>
    );
  }
}

export default AddMember;


// : (
//   <div className='newMemberInput component'>
//     <h2>Add Household Member</h2>
//     <input type='text' size='41' ref={this.addUser} className='input' onChange={(e) => this.handleChange} onKeyPress={(e) => this.handleKeyPress(e)}/>
//     <button className='submit' onClick={(e) => this.handleSubmit(e)}>Add</button>
//   </div>
// )