import React from 'react';
import './MemberColumn.css';

class MemberColumn extends React.Component {
  constructor(props) {
    super(props);

    // this.addUser = React.createRef();

    this.state = {
      inputValue: ''
    };
  }

  handleClick(e) {
    this.props.onClick(this.props.member);
  }

  componentDidMount() {
    // this.addUser.current.focus();
  }

  render() {
    const { member } = this.props;
    const taskNames = this.props.tasks;
    const tasks = taskNames.map(name => {
      const index = this.props.workload.nameLookup[name];
      return this.props.workload.tasks[index];
    });

    let key = 0;
    return (
      <div className='component MemberColumn' title={`Edit ${member.name}'s tasks`} onClick={(e) => this.handleClick(e)}>
        <h2>{member.name}</h2>
        {(tasks.length) ? tasks.map(task => (<a key={`memberColumn${key++}`}>{task.name}</a>)) : <span>Assign tasks</span>}
      </div>
    );
  }
}

export default MemberColumn;
