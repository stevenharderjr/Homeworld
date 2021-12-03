// require('./dataStructures.jsx');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/homeworld', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('MongoDB connected');
});

const rewardSchema = new mongoose.Schema({
  household: { type: mongoose.Schema.Types.ObjectId, ref: 'Household', index: true },
  mame: String,
  description: String,
  unit: String, // e.g., payment, priviledge
  quantity: Number, // e.g., amount, duration
  requirements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});
const Reward = db.model('Reward', rewardSchema);

const taskSchema = new mongoose.Schema({
  household: { type: mongoose.Schema.Types.ObjectId, ref: 'Household', index: true },
  name: String,
  instructions: Array,
  duration: Number,
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }] // rewardId
  // history: Array
});
const Task = db.model('Task', taskSchema);

const memberSchema = new mongoose.Schema({
  household: { type: mongoose.Schema.Types.ObjectId, ref: 'Household', index: true },
  name: String,
  username: String,
  email: String,
  phone: String,
  DOB: Date,
  salt: String,
  hash: String,
  availableTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  availableRewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }],
  earnedRewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }]
  // birthdate: Date,
  // SSN: String,
  // insuranceID: String,
  // prescriptions: Array,
  // vaccines: Array
});
const Member = db.model('Member', memberSchema);

const householdSchema = new mongoose.Schema({
  name: String,
  email: {type: String, index: true },
  salt: String,
  hash: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }]
});

const Household = db.model('Household', householdSchema);

module.exports = {
  db,
  Household,
  Member,
  Task,
  Reward
};

// window.taskIds = new Set();

// window.generateUniqueId = () => {
//   const currentSize = window.taskIds.size;
//   do {
//     let id = '';
//     while (id.length < 9) {
//       id += String(~~(Math.random() * 10));
//     }
//     window.taskIds.add(id);
//   } while (window.taskIds.size === currentSize);
//   return id;
// }

// let members = [];

// const names = [];//['Emery', 'Calvin', 'Charlie', 'George', 'Lincoln'];

// const tasks = [];//['The quick brown fox jumps over a lazy dog', 'Longer description two', 'Longer description three'];

// names.forEach(name => {
//   members.push(new HouseholdMember({
//     name: name,
//     // role: 'admin',
//     tasks: [],
//   }));
// });

// const household = new Household({
//   surname: 'Harder',
//   members: members
// });