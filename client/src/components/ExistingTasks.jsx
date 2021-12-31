import React from 'react';

const ExistingTasks = (props) => {
  const {tasks, id} = props;
  let key = 0;

  return (
    <datalist id={id}>
      {tasks.map(task => (<option key={`${id} Task${key++}`} id={task}/>))}
    </datalist>
  );
}

export default ExistingTasks;
