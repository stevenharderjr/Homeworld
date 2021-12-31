import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard.jsx';
import MemberDashboard from './components/MemberDashboard.jsx';
// import Login from './components/Login.jsx';
import css from './css/style.css';
import axios from 'axios';

const members = [];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.workload = undefined;
    this.household = undefined;

    this.state={
      nav: ''
    };
  }

  memberDashboard(member) {
    console.log(`${member.name}'s overview`);
    this.setState({
      nav: <MemberDashboard member={member} household={this.household} workload={this.workload} onUpdate={(member, task) => this.assignAndSave(member, task)} onDelete={this.deleteTask} goHome={() => this.comeHome()}/>
    });
  }

  comeHome() {
    this.setState({
      nav: <Dashboard household={this.household} workload={this.workload} onClick={(name) => this.memberDashboard(name)} onCreate={this.addMember} />
    });
  }

  getHouseholdData() {
    axios.get('/members')
      .then(res => {
        this.household = new MemberCollection(res.data);
        // console.log('Data recieved');
        // this.setState({
        //   household: household,
        //   nav: <Dashboard members={members} onClick={(name) => this.memberDashboard(name)}/>
        // });
      })
      .catch(err => {
        console.log('Could not fetch member data', err);
      })
      .then(() => {
        axios.get('/tasks')
          .then(res => {
            this.workload = new TaskCollection(res.data);
          })
          .then(() => {
            this.comeHome();
          })
          .catch(err => {
            console.log('Could not fetch task data', err);
          });
      });

  }

  addMember(member) {
    console.log(member);
    this.household.save(this.household.add(member));
  }

  assignAndSave(member, task) {
    // console.log(member, task);
    // const actualTask = this.workload.nameLookup[task.name];
    this.workload.add(task);
    this.household.assign(member, task);
    this.workload.assign(member, task);
    this.workload.save(task);
    this.household.save(member);
    // axios.post('/tasks', task)
    //   .then(res => {
    //     console.log(res.data);
    //     this.updateMemberTasks(res.data);
    //   })
    //   .catch(err => {
    //     console.log('Could not create/update task record', err);
    //   });
  }

  updateMemberTasks(task) {
    const member = this.state.member;
    member.addTask(task._id);
    axios.post('/members', member)
      .then(res => {
        console.log(res.data);
        household.tasks.push(task);
        this.setState({
          tasks: household.tasks,
          member: res.data
        });
      })
      .catch(err => {
        console.log(`Could not update ${member.name}'s DB record`);
      })
  }

  deleteTask(task) {
    axios.delete('/tasks', task)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('Could not remove task from DB');
      });
  }

  componentDidMount() {
    this.getHouseholdData();
  }

    render() {
      return (
        <div>
        {this.state.nav}
        {/* <AddMember />
        <AddTasks />
        <HouseholdView />
        <MemberView />
      <TasksView /> */}
      </div>
    );
  }
}

export default App;

let AppContainer = document.createElement('div');
AppContainer.setAttribute('id', 'App');
document.body.appendChild(AppContainer);

ReactDOM.render(<App />, document.getElementById('App'));

// class Household {
//   constructor(members = [], surname = '') {
//     this.surname = surname;
//     this.names = new Set();
//     this.members = members;
//     this.members = members.map(member => {
//       // const priorSize = this.names.size;
//       this.names.add(member.name);
//       // if (this.names.size > priorSize) {
//       return new HouseholdMember(member);
//     }) || [];
//     this.tasks = [];
//   }

//   createMember(member) {
//     const priorSize = this.names.size;
//     this.names.add(member.name);
//     if (this.members.size > priorSize) {
//       // newMember = new HouseholdMember(member);
//       this.members.push(new Member);
//     }
//   }

//   deleteMember(memberID) {}

//   updateMember(member) {

//   }

//   createTask(task) {}

//   deleteTask(taskID) {}
// };

// class HouseholdMember {
//   constructor(member, allTasks) {
//     this.id = member._id;
//     this.name = member.name;
//     // this.role = member.role;
//     // tasks is a list of taskIDs
//     this.assigned = new Set(member.tasks);
//     this.completed = member.completed || member.tasks.map(task => {
//       const obj = {};
//       obj[task.name] = false;
//       return obj;
//     });
//   }

//   toggleComplete(taskID) {
//     this.completed[taskID] = !this.completed[taskID];
//     return this.completed[taskID];
//   }

//   complete(taskID) {
//     this.completed[taskID] = true;
//   }

//   assign(taskID) {
//     if (this.completed.taskID !== undefined) {
//       this.completed[taskID] = false;
//     } else {
//       this.addTask(taskID);
//     }
//   }

//   addTask(taskID) {
//     if (this.completed[taskID] === undefined) {
//       this.tasks.add(taskID);
//       this.completed[taskID] = false;
//     }
//   }

//   tasks(allTasks) {
//     return (this.tasks.reduce((tasks, task) => {
//       if (allTasks[task._id] !== undefined) {
//         this.tasks.push(task);
//       }
//     }));
//   }

//   taskNames() {
//     return Object.keys(this.completed);
//   }
// }

class AssignmentCollection {
  constructor(members, tasks) {
    this.memberIndex = members.length;
    this.taskIndex = tasks.length;
    this.memberAssigned = {};
    this.taskAssigned = {};
    for (let i = 0; i < memberIndex; i++) {
      const member = members[i];
      this.memberAssigned[member.name] = new Set();
    }
    for (let i = 0; i < taskIndex; i++) {
      const task = tasks[i];
      this.taskAssigned[task.name] = new Set();
    }
  }

  link(member, task) {
    memberAssigned[member.name].add(task.name);
    taskAssigned[task.name].add(member.name);
  }

  unlink(member, task) {
    memberAssigned[member.name].delete(task.name);
    taskAssigned[task.name].delete(member.name);
  }
}

class MemberCollection {
  constructor(members) {
    this.index = members.length;
    this.members = [];
    this.nameLookup = {};
    this.assigned = {};
    for (let i = 0; i < this.index; i++) {
      const member = members[i];
      this.members[i] = member;
      this.nameLookup[member.name] = i;
      this.assigned[member.name] = member.assigned || [];
    }
  }

  assign(member, task) {
    let memberRecord = this.members[this.nameLookup[member.name]];
    if (memberRecord === undefined) {
      console.log(`No member "${member.name}" in collection`);
      return;
    }
    const temp = new Set(this.assigned[member.name]);
    temp.add(task.name);
    const assigned = Array.from(temp);
    this.assigned[member.name] = assigned;
    memberRecord.assigned = assigned;
  }

  add(member) {
    let index = this.nameLookup[member.name];
    if (index === undefined) {
      index = this.index++;
    }
    this.nameLookup[member.name] = index;
    const assigned = Array.from(new Set(member.assigned));
    this.assigned[member.name] = assigned;
    this.members[index] = member;
    this.members[index].assigned = assigned;
    return this.members[index];
  }

  remove(member) {
    const { name } = member;
    const index = this.nameLookup[name];
    if (index !== undefined) {
      delete this.nameLookup[name];
      delete this.assigned[name]
      this.index--;
      return this.members.splice(index, 1);
    }
  }

  save(member) {
    // const existingMember = this.members[this.members.nameLookup[member.name]];
    const add = (member) => {this.add(member)};

    axios.post('/members', member)
      .then(res => {
        console.log('Added to DB:', res.data);
        add(res.data);
      })
      .catch(err => {
        console.log('Could not create/update member record', err);
      });
  }

  unsave(member) {
    const remove = (member) => {this.remove(member)};

    axios.delete('/members', member)
      .then(res => {
        console.log('Removed from DB:', res.data);
        remove(member);
      })
      .catch(err => {
        console.log('Could not remove member record', err);
      });
  }
}

class TaskCollection {
  constructor(tasks) {
    this.index = tasks.length;
    this.tasks = [];
    this.nameLookup = {};
    this.assigned = {};
    for (let i = 0; i < this.index; i++) {
      const task = tasks[i];
      this.tasks[i] = task;
      this.nameLookup[task.name] = i;
      this.assigned[task.name] = task.assigned || [];
    }
  }

  assign(member, task) {
    let taskRecord = this.tasks[this.nameLookup[task.name]];
    if (taskRecord === undefined) {
      console.log(`No task "${task.name}" in collection`);
      return;
    }
    const temp = new Set(this.assigned[task.name]);
    temp.add(member.name);
    const assigned = Array.from(temp);
    this.assigned[task.name] = assigned;
    taskRecord.assigned = assigned;
  }

  add(task) {
    let index = this.nameLookup[task.name];
    if (index === undefined) {
      index = this.index++;
    }
    this.nameLookup[task.name] = index;
    const assigned = Array.from(new Set(task.assigned));
    this.assigned[task.name] = assigned;
    this.tasks[index] = task;
    this.tasks[index].assigned = assigned;
    return this.tasks[index];
  }

  remove(task) {
    const index = this.nameLookup[task.name];
    if (index !== undefined) {
      delete this.nameLookup[task.name];
      delete this.idLookup[task.name];
      this.index--;
      this.remove(task);
      return this.tasks.splice(index, 1);
    }
  }

  save(task) {
    const add = task => this.add(task);

    axios.post('/tasks', task)
      .then(res => {
        console.log('Task added to DB:', res);
        add(res.data);
      })
      .catch(err => {
        console.log('Could not create/update task record', err);
      });
  }

  unsave(task) {
    const remove = task => this.remove(task);

    axios.delete('/tasks', task)
    .then(res => {
      console.log('Removed from DB:', res.data);
      remove(task);
    })
    .catch(err => {
      console.log('Could not remove task record', err);
    });
  }
}