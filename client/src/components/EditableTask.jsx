import React from 'react';

const EditableTask = (props) => (
  <div>
    <a>{props.task}</a>
    <a>edit</a>
    <a>delete</a>
  </div>
)

export default EditableTask;