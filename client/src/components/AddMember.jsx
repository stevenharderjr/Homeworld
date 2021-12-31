import React from 'react';
import './AddMember.css';

class AddMember extends React.Component {
  constructor(props) {
    super(props);

    this.userInput = React.createRef();
    this.toggleForm = this.toggleForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form: false,
      inputValue: '',
    };
  }

  toggleForm() {
    const { form } = this.state;
    this.setState({ form: !form });
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
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
      this.props.addMember(this.state.inputValue);
    }
  }

  componentDidMount() {
    if (this.state.form && this.state.inputValue === '') {
      this.userInput.current.focus();
    }
  }

  render() {
    const { toggleForm, handleKeyPress, handleInputChange } = this;

    return this.state.form ? (
      <div
        className="component addMemberForm"
        id="addMemberComponent"
        title="Enter new household member"
        onClick={toggleForm}
      >
        {/* <h2>New Member</h2> */}
        <form target="">
          <input
            autoFocus={true}
            type="text"
            className="newMemberInput"
            id="addMemberInput"
            placeholder="First name"
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
          />
          <input
            type="button"
            className="newMemberInput"
            id="addMemberSubmit"
            value="Add member"
            onClick={(e) =>
              this.props.onCreate({ name: this.state.inputValue })
            }
          />
        </form>
      </div>
    ) : (
      <div
        className="component formHidden"
        title="Tap to enter new household member"
        onClick={toggleForm}
      >
        <span>+</span>
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
