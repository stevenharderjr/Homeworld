import React from 'react';
import './Input.css';

class ControlledInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      placeholder: undefined,
      value: undefined
    }
  }

  handleInputChange(e) {
    const { name, update } = this.props;
    this.props.onUpdate({ [name]: e.currentTarget.value });
  }

  this.handleSubmit(e) {
    console.log(`Attempting to submit "${e.currentTarget.value}""`);
    this.props.onSubmit(e);
    this.setState({ value: '' });
  }

  render() {
    const { value, placeholder } = this.state;
    const { handleSubmit } = this;
    const { type } = this.props;
    return (
      <>
        <input type={this.props.type || 'text'} onSubmit={handleSubmit} placeholder={placeholder}>{value}</input>
      </>
    )
  }
}