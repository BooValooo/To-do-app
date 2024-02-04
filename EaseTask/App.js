// App.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Headbar from './src/Components/Headbar';
import TaskBox from './src/Components/TaskBox'; 

const App = () => {
  const handleIcon1Press = () => {
    console.log('Search icon pressed');
  };

  const handleIcon2Press = () => {
    console.log('Options icon pressed');
  };

  const handleCheckPress = (taskId) => {
    console.log(`Task ${taskId} checkbox pressed`);
  };

  const handleMenuPress = (taskId) => {
    console.log(`Task ${taskId} menu pressed`);
  };

  const tasks = [
    { id: 1, name: 'Task 1', priority: 'Priority 1', time: '08:30 PM', isChecked: false },
    { id: 2, name: 'Task 2', priority: 'Priority 1', time: '08:30 PM', isChecked: false },
    { id: 3, name: 'Task 3', priority: 'Priority 3', time: '08:30 PM', isChecked: true },
  ];

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
            onCheckPress={() => handleCheckPress(task.id)}
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
    marginTop: 20, // 为任务列表提供一些顶部空间
  },
});

export default App;
