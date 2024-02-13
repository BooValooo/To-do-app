import React from 'react';
import TaskBox from './TaskBox'; 

const TaskList = ({ tasks, onCheckPress, onMenuPress }) => {
  return (
    <>
      {tasks.map(task => (
        <TaskBox 
          key={task.id}
          task={task}
          onCheckPress={() => onCheckPress(task)}
          onMenuPress={() => onMenuPress(task.id)}
        />
      ))}
    </>
  );
};

export default TaskList;
