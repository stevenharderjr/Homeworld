import React from 'react';
import TaskList from './TaskList.jsx';
import './MemberDashboard.css';

class MemberDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);

    this.state = {
      nav: false,
    };

    // this.handleClick.bind(this);
  }

  showNav() {
    this.setState({
      nav: true,
    });
  }

  hideNav() {
    this.setState({
      nav: false,
    });
  }

  // returnToMainDashboard() {
  //   this.props.goHome();
  // }

  handleClick(task) {
    console.log(`${task.name} clicked`);
    this.props.onClick(task);
  }

  render() {
    const { household, member, workload, onUpdate, onDelete, goHome } =
      this.props;
    const taskNames = this.props.member.assigned.slice();
    const tasks = taskNames.map((name) => {
      const index = this.props.workload.nameLookup[name];
      return this.props.workload.tasks[index];
    });

    return (
      <div id="dashboard">
        <div
          className="navTitleBar"
          title="Return to household dashboard"
          onMouseEnter={this.showNav}
          onMouseLeave={this.hideNav}
          onClick={goHome}
        >
          <h1>
            {this.state.nav
              ? '< Dashboard'
              : `${this.props.member.name}'s Tasks`}
          </h1>
        </div>
        <div className="tasks">
          <TaskList
            tasks={tasks}
            member={member}
            household={household}
            workload={workload}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      </div>
    );
  }
}

export default MemberDashboard;
