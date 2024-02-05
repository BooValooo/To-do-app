// App.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import TaskBox from '../Components/TaskBox';

const MainScreen = () => {
  const handleIcon1Press = () => {
    console.log('Search icon pressed');
  };

  const handleIcon2Press = () => {
    console.log('Options icon pressed');
  };

  const handleCheckPress = (task) => {
    console.log(`Task ${task.id} checkbox pressed`);
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(prevTask => {
        if (prevTask.id === task.id) {
          return {
            ...prevTask,
            isChecked: !prevTask.isChecked
          };
        }
        return prevTask;
      });
      return updatedTasks;
    });
  };

  const handleMenuPress = (taskId) => {
    console.log(`Task ${taskId} menu pressed`);
  };

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', priority: 'Priority 1', time: '08:30 PM', isChecked: true },
    { id: 2, name: 'Task 2', priority: 'Priority 1', time: '08:30 PM', isChecked: false },
    { id: 3, name: 'Task 3', priority: 'Priority 3', time: '08:30 PM', isChecked: false },
  ]);

  return (
    <View style={styles.container}>
      <Headbar
        showSearchIcon={true}
        headbarText="New Task"
        onSearchPress={handleIcon1Press}
        onOptionsPress={handleIcon2Press}
      />
      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <TaskBox
            key={task.id}
            taskName={task.name}
            priority={task.priority}
            time={task.time}
            isChecked={task.isChecked}
            onCheckPress={() => handleCheckPress(task)}
            onMenuPress={() => handleMenuPress(task.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  taskList: {
    flex: 1,
    marginTop: 20, // reserve space for the tasklist 
  },
});

export default MainScreen;
