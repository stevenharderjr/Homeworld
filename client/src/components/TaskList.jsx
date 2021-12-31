import React from 'react';
import Task from './Task.jsx';
import Checkbox from './shared/Checkbox.jsx';
import './TaskList.css';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      inputValue: ''
    }
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleKeyPress(e) {
    (e.key === 'Enter') && this.handleAddTask({ name: this.state.inputValue });
  }

  handleClick(e) {
    this.handleAddTask({ name: this.state.inputValue });
  }

  handleAddTask(newTask) {

    if (!newTask.name.length) {
      return;
    }
    console.log(`Assigned "${this.state.inputValue}" to ${this.props.member.name}`);
    const updatedTasks = [...this.state.tasks, newTask];
    this.setState({
      inputValue: '',
      tasks: updatedTasks
    });
    // this.newTask = React.createRef();
    this.newTask.current.focus();
    this.props.onUpdate(this.props.member, newTask);
  }

  render() {
    const { handleInputChange, handleClick, handleKeyPress } = this;
    const { inputValue } = this.state;
    const { tasks } = this.props;
    const minWidth = String(Math.max(...tasks.map(task => (task.name.length))));


    // console.log(Math.max(...tasks.map(task => (task.length))));

    let key = 0;

    return (
      <div className='taskList'>
        {/* <p className='columnHeading'>{(tasks.length) ? 'Assigned:' : 'None assigned'}</p> */}
        <div className='newTaskRow'>
          <div className='blankBox'></div>
          <input type='text' size={minWidth} autoFocus={true} title='Enter new task' className='taskName' value={inputValue} placeholder='New task' onChange={handleInputChange} onKeyPress={handleKeyPress}/>
          <input type='button' value='Assign' className='taskMenuButton' title={`Assign "${inputValue}"`} onClick={handleClick} />
        </div>
        {tasks.map(task => (<Task key={task._id || `task${key++}`} task={task} minWidth={minWidth} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />))}
      </div>
    );
  }
}

export default TaskList;
