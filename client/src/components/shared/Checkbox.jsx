import React from 'react';
import './Checkbox.css';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      checked: this.props.checked
    }
  }

  toggle() {
    const toggled = !this.state.checked;
    this.setState({ checked: toggled });
  }

  render() {
    return (
      <div className='Checkbox' onClick={this.toggle}>
        <div className={`Checkmark ${(this.state.checked) ? 'Checked' : 'Unchecked'}`}></div>
      </div>
    );
  }
}

export default Checkbox;
