import React from 'react';
import MemberColumn from './MemberColumn.jsx';
import AddMember from './AddMember.jsx';
import './css/Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: this.props.household.members,
      addMemberDisplay: 'none',
      plusDisplay: 'block'
    };
  }

  handleClick(member) {
    if (member.name !== '+') {
      console.log(`${member.name} clicked`);
      this.props.onClick(member);
    } else {
      console.log('Add member');
    }
  }

  // addMember(name) {
  //   const existingMembers = this.state.members;
  //   if (!existingMembers.includes(name)) {
  //     console.log('Adding new member', name);
  //     const updatedMembers = this.state.members.slice();
  //     updatedMembers.push(name);
  //     this.setState({
  //       members: updatedMembers
  //     });
  //     this.props.onCreate({ name: name });
  //   }
  // }
  // componentDidMount() {

  // }

  render() {
    const { members } = this.state;
    let key = 0;

    return (
      <div id='dashboard'>
        <div className='titleBar'>
          <h1>{`Harder Household`}</h1>
        </div>
        {(members.length > 1) ? (
          <div className='members'>
            {members.map(member => (<MemberColumn key={`dashboard${member._id}`} workload={this.props.workload} household={this.props.household} member={member} tasks={member.assigned} onClick={e => this.handleClick(e)} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />))}
            <h2 className='component' style={{ display: this.state.plusDisplay }} onClick={() => this.setState({addMemberDisplay: 'block', plusDisplay: 'none'})}>+</h2>
            <div style={{ display: this.state.addMemberDisplay }}>
              <AddMember household={this.props.household} onCreate={(member) => {
                this.setState({ addMemberDisplay: 'none', plusDisplay: 'block' })
                this.props.onCreate(member)}} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dashboard;
