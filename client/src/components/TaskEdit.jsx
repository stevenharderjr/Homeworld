import React from 'react';
import Checkbox from './Checkbox.jsx';
import './Task.css';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.task.name,
      task: this.props.task
    }
  }

  handleKeyPress(e) {
    (e.key === 'Enter') && this.update(this.props.task);
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  delete(task) {
    console.log(`Delete ${task}`);
    this.props.onDelete({ name: task });
  }

  // create(task) {
  //   if (task.name !== this.state.taskName) {
  //     this.props.onCreate(task);
  //   }
  // }

  update(task) {
    if (task.name !== this.state.inputValue) {
      console.log(`Change ${task.name} to ${this.state.inputValue}`);
      this.props.onUpdate(task);
    } else {
      console.log('Nothing to update');
    }
  }

  render() {
    // console.log(this.props.minWidth);
    const {task} = this.props;
    return (
      <div className='task' onKeyPress={(e) => this.handleKeyPress(e)}>
        <Checkbox checked={false}/>
        <input type='text' className='taskName' size={this.props.minWidth} value={this.state.inputValue} onChange={(e) => this.handleInputChange(e)} />
        <button className='taskMenuButton' title={(task.name === this.state.inputValue) ? 'no change' : `change "${task.name}" to "${this.state.inputValue}"`} onClick={() => this.update(task)}>update</button>
        <button className='taskMenuButton' title={`remove "${task.name}"`} onClick={() => this.delete(task)}>remove</button>
      </div>
    );
  }
}

export default Task;
