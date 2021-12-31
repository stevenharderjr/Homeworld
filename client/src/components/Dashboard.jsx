import React from 'react';
import MemberColumn from './MemberColumn.jsx';
import AddMember from './AddMember.jsx';
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.addMember = this.addMember.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(member) {
    if (member.name !== '+') {
      console.log(`${member.name} clicked`);
      this.props.onClick(member);
    } else {
      console.log('Add member');
    }
  }

  addMember(name) {
    const existingMembers = this.state.members;
    if (!existingMembers.includes(name)) {
      console.log('Adding new member', name);
      const updatedMembers = this.state.members.slice();
      updatedMembers.push(name);
      this.setState({
        members: updatedMembers
      });
      this.props.onCreate({ name: name });
    }
  }

  render() {
    const { addMember, handleClick } = this;
    const { members } = this.props.household;
    let key = 0;

    return (
      <div id='dashboard'>
        <div className='titleBar'>
          <h1>{`Harder Household`}</h1>
        </div>
        {(members.length > 1) ? (
          <div className='members columnContainer'>
            {members.map(member => (
              <MemberColumn
                key={`dashboard${key++}`}
                workload={this.props.workload}
                household={this.props.household}
                member={member}
                tasks={member.assigned}
                onClick={handleClick}
                onUpdate={this.props.onUpdate}
                onDelete={this.props.onDelete}
              />
            ))}
            <AddMember household={this.props.household} onSubmit={addMember} />
          </div>
        ) : (
          <AddMember household={this.props.household} onSubmit={addMember} />
        )}
      </div>
    );
  }
}

export default Dashboard;
