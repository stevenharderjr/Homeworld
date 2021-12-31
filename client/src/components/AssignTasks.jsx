import React from 'react';
import TaskList from './TaskList.jsx';

class AddTasks extends React.Component {
  constructor(props) {
    super(props);

    this.taskInput = React.createRef();
    // this.handleSubmit.bind(this);
    // this.handleTextInputChange.bind(this);

    this.state = {
      inputText: '',
      availableTasks: ['one', 'two', 'three'],
      currentTasks: []
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const task = this.state.inputText;
    console.log(`${task} submitted`);
    const currentTasks = [ ...this.state.currentTasks, task ];
    let availableTasks = this.state.availableTasks.slice();

    if (availableTasks.includes(task)) {
      availableTasks.splice(availableTasks.indexOf(task), 1);
    }

    this.setState({
      currentTasks: currentTasks,
      availableTasks: [task, ...availableTasks],
      inputText: ''
    });

    this.taskInput.current.focus();
  }

  handleTextInputChange(e) {
    // console.log(this.text.value);
    this.setState({
      inputText: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  // handleSelectChange(e) {
  //   this.setState({
  //     inputText: e.target.selected
  //   });
  // }

  // componentDidMount() {
  //   this.taskInput.current.focus();
  // }

  render() {
    const { availableTasks, currentTasks, inputText } = this.state;
    let key=0;
    let reset = false;
    if (this.state.resetTextInput) {
      reset = true;
    }

    return (
      <div id="addTasksDiv" className='component'>
        <h2>Assign Tasks</h2>
        {(currentTasks.length > 0) ? <ul>{currentTasks.map(task => (<li key={`currentTask${key++}`}>{task}</li>))}</ul> : ''}
        <form name='assignTasksForm'>
          <input type='text' list='previouslyAssigned' className='input' ref={this.taskInput} value={inputText} onChange={e => this.handleTextInputChange(e)}/>
          <datalist id='previouslyAssigned'>
            {availableTasks.map(task => (<option key={`previouslyAssignedTask${key++}`} value={task}/>))}
          </datalist>
          <input type='submit' className='submit' value="Add" onClick={e => this.handleSubmit(e)} onKeyPress={e => handleKeyPress(e)}/>
        </form>
      </div>

    );
  }
}

export default AddTasks;
