import React from 'react';
import './css/Checkbox.css';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked
    }
  }

  toggleCheckbox() {
    const toggle = !this.state.checked;
    this.setState({ checked: toggle });
  }

  render() {
    return (
      <div className='Checkbox' onClick={() => this.toggleCheckbox()}>
        <div className={`Checkmark ${(this.state.checked) ? 'Checked' : 'Unchecked'}`}></div>
      </div>
    );
  }
}

export default Checkbox;
