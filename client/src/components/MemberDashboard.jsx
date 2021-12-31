import React from 'react';
import TaskList from './TaskList.jsx';
import './css/MemberDashboard.css';

class MemberDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: `${this.props.member.name}'s Tasks`
    };

    // this.handleClick.bind(this);
  }

  showNavText() {
    this.setState({
      titleText: '< Dashboard'
    });
  }

  showTitleText() {
    this.setState({
      titleText: `${this.props.member.name}'s Tasks`
    })
  }

  returnToMainDashboard() {
    this.props.goHome();
  }

  handleClick(task) {
    console.log(`${task.name} clicked`);
    this.props.onClick(task);
  }

  componentDidMount() {
    this.showTitleText();
  }

  render() {
    console.log(this.props.workload);
    const taskNames = this.props.member.assigned.slice();
    const tasks = taskNames.map(name => {
      const index = this.props.workload.nameLookup[name];
      return this.props.workload.tasks[index];
    });

    let key = 0;

    return (
      <div id='dashboard'>
        <div className='navTitleBar' title='return to household overview'  onMouseEnter={() => this.showNavText()} onMouseLeave={() => this.showTitleText()} onClick={this.props.goHome}>
          <h1>{this.state.titleText}</h1>
        </div>
        <div className='tasks'>
          <TaskList tasks={tasks} member={this.props.member} household={this.props.household} workload={this.props.workload} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />
        </div>
      </div>
    );
  }
}

export default MemberDashboard;
