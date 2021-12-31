import React from 'react';
import Checkbox from './shared/Checkbox.jsx';
import './Task.css';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      inputValue: this.props.task.name,
      task: this.props.task
    }
  }

  handleKeyPress(e) {
    (e.key === 'Enter') && this.updateTask(this.props.task);
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  deleteTask() {
    const { task, onDelete } = this.props;
    console.log(`Delete ${task}`);
    onDelete({ name: task });
  }

  // create(task) {
  //   if (task.name !== this.state.taskName) {
  //     this.props.onCreate(task);
  //   }
  // }

  updateTask() {
    const { task, onUpdate } = this.props;
    console.log('Before update', task);
    const { inputValue } = this.state;
    if (task.name !== inputValue) {
      console.log(`Change ${task.name} to ${inputValue}`);
      Object.assign(task, { name: inputValue });
      console.log('After update', task);
      onUpdate(task);
    } else {
      alert('Task name has not changed. Nothing to update.');
    }
  }

  render() {
    const { inputValue } = this.state;
    const { task, minWidth } = this.props;
    const { updateTask, deleteTask, handleKeyPress, handleInputChange } = this;

    return (
      <div className='taskRow' onKeyPress={handleKeyPress}>
        <Checkbox checked={false}/>
        <input type='text' className='taskName' title={inputValue} size={minWidth} value={inputValue} onChange={handleInputChange} />
        <div className='buttonGroup'>
          <input type='button' value='update' className='taskMenuButton' title={(task.name === inputValue) ? 'no change' : `change "${task.name}" to "${inputValue}"`} onClick={updateTask} />
          <input type='button' value='remove' className='taskMenuButton' title={`remove "${task.name}"`} onClick={deleteTask} />
        </div>
      </div>
    );
  }
}

export default Task;
