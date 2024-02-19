import React from 'react';
import TaskBox from './TaskBox'; 

const TaskList = ({ tasks, onCheckPress, onMenuPress,onDelete }) => {
  return (
    <>
      {tasks.map(task => (
        <TaskBox 
          key={task.id}
          task={task}
          onCheckPress={() => onCheckPress(task)}
          onMenuPress={() => onMenuPress(task.id)}
          onDelete={() => console.log('Delete task')} 
        />
      ))}
    </>
  );
};

export default TaskList;
