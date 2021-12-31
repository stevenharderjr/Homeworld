import React from 'react';
import Task from './Task.jsx';
import Checkbox from './Checkbox.jsx';
import './css/TaskList.css';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.newTask = React.createRef();

    this.state = {
      inputValue: '',
      tasks: this.props.tasks
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

  handleDeleteTask(e) {

  }

  handleEditTask(e) {

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

  componentDidMount() {
    this.newTask.current.focus();
  }

  render() {
    let tasks = this.state.tasks;
    const minWidth = String(Math.max(...tasks.map(task => (task.name.length))));


    // console.log(Math.max(...tasks.map(task => (task.length))));

    let key = 0;

    return (
      <div className='taskList'>
        <p className='columnHeading'>{(this.state.tasks.length) ? 'Assigned:' : 'None assigned'}</p>
        {this.state.tasks.map(task => (<Task key={task._id || `task${key++}`} task={task} minWidth={minWidth} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />))}
        <div className='task'>
          <div className='blankBox'></div>
          <input type='text' size={minWidth} ref={this.newTask} className='taskName' value={this.state.inputValue} placeholder='New task' onChange={(e) => this.handleInputChange(e)} onKeyPress={(e) => this.handleKeyPress(e)}/>
          <button className='taskMenuButton' title={`Assign "${this.state.inputValue}"`} onClick={e=> this.handleClick(e)} >Assign</button>
        </div>
      </div>
    );
  }
}

export default TaskList;
