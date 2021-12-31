const { db, Household, Member, Task, Reward } = require('./index.js');

const addHousehold = (household, member) => {
  // householdData = { name, email, members: [], tasks: [], rewards: [] }
  return new Promise((resolve, reject) => {
    Household.insertOne(household)
      .then(({ insertId }) => {
        member.household = insertId;
        addMember(member).then(({ insertId }) => {
          Household.findOneAndUpdate(
            { _id: member.household },
            { $push: { members: insertId } }
          );
        });
      })
      .catch((err) => {
        console.log(`DB unable to create record for ${household.name}`);
        reject(err);
      });
  });
};

const updateHousehold = (household) => {
  return new Promise((resolve, reject) => {
    Household.findOneAndUpdate({ _id: household._id }, household)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(
          `DB unable to update ${household.name} household record:`,
          err
        );
        reject(err);
      });
  });
};

const deleteHousehold = (household) => {
  return new Promise((resolve, reject) => {
    Household.deleteOne({ _id: household._id })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(
          `DB unable to delete ${household.name} household record:`,
          err
        );
        reject(err);
      });
  });
};

const loadAll = async (email) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      Household.findOne({ email }),
      Household.find({ _id: { $in: household.members } }),
      Household.find({ _id: { $in: household.tasks } }),
      Household.find({ _id: { $in: household.rewards } }),
    ])
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.log(
          `DB unable to retrieve ${household.name} household data:`,
          err
        );
        reject(err);
      });
  });
};

const addTask = (task) => {
  return new Promise((resolve, reject) => {
    Task.insertOne(task)
      .then(({ insertId }) => {
        Household.update(
          { _id: task.household },
          { $push: { tasks: insertId } }
        );
        resolve(insertId);
      })
      .catch((err) => {
        console.log(`DB unable to add ${task.name} task:`, err);
        reject(err);
      });
  });
};

const loadMemberTasks = (member) => {
  return new Promise((resolve, reject) => {
    Task.find({ _id: { $in: member.availableTasks } })
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.log(`DB unable to retrieve ${member.name}'s tasks:`, err);
        reject(err);
      });
  });
};

const loadHouseholdTasks = (household) => {
  return new Promise((resolve, reject) => {
    Task.find({ _id: { $in: houshold.tasks } })
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.log(
          `DB unable to retrieve ${household.name} household tasks:`,
          err
        );
        reject(err);
      });
  });
};

const updateTask = (task) => {
  return new Promise((resolve, reject) => {
    Task.update({ _id: task._id }, task)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(`DB unable to update ${task.name} task:`, err);
        reject(err);
      });
  });
};

const deleteTask = (task) => {
  return new Promise((resolve, reject) => {
    Task.deleteOne({ _id: task._id })
      .then(() => {
        Household.findOneAndUpdate(
          { _id: task.household },
          { $pull: { tasks: task._id } }
        );
      })
      .catch((err) => {
        console.log(`DB unable to delete ${task.name}:`, err);
        reject(err);
      });
  });
};

const addMember = (member) => {
  return new Promise((resolve, reject) => {
    Member.insertOne(member).then(({ insertId }) => {
      Household.update(
        { _id: member.household },
        { $push: { members: insertId } }
      );
      resolve(insertId);
    });
  }).catch((err) => {
    console.log(`DB unable to add ${member.name}:`, err);
    reject(err);
  });
};

const readMember = (memberId) => {
  return new Promise((resolve, reject) => {
    Member.findOne({ _id: memberId })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(`DB unable to find record for member ${memberId}:`, err);
        reject(err);
      });
  });
};

const updateMember = (member) => {
  return new Promise((resolve, reject) => {
    Member.insertOne({ _id: member._id }, member, { upsert: true })
      .then((result) => {
        console.log(`DB unable to update ${member.name}'s record:'`, result);
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteMember = (member) => {
  return new Promise((resolve, reject) => {
    Member.deleteOne({ _id: member._id })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(`DB unable to delete ${member.name}'s record:`, err);
        reject(err);
      });
  });
};

const addReward = (reward) => {
  return new Promise((resolve, reject) => {
    Reward.insertOne(reward)
      .then(({ insertId }) => {
        Household.findOneAndUpdate(
          { _id: reward.household },
          { $push: { tasks: insertId } }
        );
        resolve(insertId);
      })
      .catch((err) => {
        console.log(`DB unable create record for ${reward.name} reward:`, err);
        reject(err);
      });
  });
};

const loadMemberRewards = (member) => {
  return new Promise((resolve, reject) => {
    Reward.find({ _id: { $in: member.availableRewards } })
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.log(`DB unable to retrieve ${member.name}'s rewards:`, err);
        reject(err);
      });
  });
};

const loadHouseholdRewards = (member) => {
  return new Promise((resolve, reject) => {
    Task.find({ _id: { $in: household.rewards } })
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.log(
          `DB unable to retrieve ${household.name} household rewards:`,
          err
        );
        reject(err);
      });
  });
};

const updateReward = (reward) => {
  return new Promise((resolve, reject) => {
    Reward.findOneAndUpdate({ _id: reward._id }, reward)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(
          `DB unable to update record for ${reward.name}'s tasks:`,
          err
        );
        reject(err);
      });
  });
};

const deleteReward = (reward) => {
  return new Promise((resolve, reject) => {
    Reward.deleteOne({ _id: reward._id })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(`DB unable to delete record for ${task.name} task:`, err);
        reject(err);
      });
  });
};

const save = () => {};

const readMembers = () => {
  return Member.find().catch((err) => {
    console.log('MongoDB:', err);
  });
};

const readTasks = () => {
  return Tasks.find().catch((err) => {
    console.log('MongoDB:', err);
  });
};

const dbMethodBoilerPlate = (obj) => {
  return new Promise((resolve, reject) => {
    dbTransaction()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(`DB unable to ...`, err);
        reject(err);
      });
  });
};

module.exports = {
  loadAll,
  addHousehold,
  updateHousehold,
  deleteHousehold,
  addMember,
  updateMember,
  deleteMember,
  addTask,
  loadHouseholdTasks,
  loadMemberTasks,
  updateTask,
  deleteTask,
  addReward,
  loadHouseholdRewards,
  loadMemberRewards,
  updateReward,
  deleteReward,
};
