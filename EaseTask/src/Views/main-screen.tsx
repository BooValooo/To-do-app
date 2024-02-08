// App.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import TaskBox from '../Components/TaskBox';
import NoteBox from '../Components/NoteBox';
import FloatingActionButton from '../Components/FloatingActionButton';
import ModalOptions from '../Components/ModalOptions';
import Task from '../Utils/task';
import Note from '../Utils/note';

const MainScreen = () => {
  const handleIcon1Press = () => {
    console.log('Search icon pressed');
  };

  const handleIcon2Press = () => {
    console.log('Options icon pressed');
  };
  const subHeadBarText = 'Upcoming events';
  const headBarText = 'Focus';

  const handleCheckPress = (task) => {
    console.log(`Task ${task.id} checkbox pressed`);
    if (task.location !== undefined) {
      setNote(prevTasks => {
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
      })
    } else {
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
    });}
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleMorePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOptionPress = (option) => {
    console.log(`Option selected: ${option}`);
    handleCloseModal();
  };
  const handleMenuPress = (taskId) => {
    console.log(`Task ${taskId} menu pressed`);
  };

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', priority: 'Priority 1', year: 2024, month: 2, day: 13, time: '08:30 PM', isChecked: true },
    { id: 2, name: 'Task 2', priority: 'Priority 1', year: 2024, month: 2, day: 17, time: '08:30 PM', isChecked: false },
    { id: 3, name: 'Task 3', priority: 'Priority 3', year: 2024, month: 2, day: 20, time: '06:30 AM', isChecked: false },
  ]);
  const [Notes, setNote] = useState<Note[]>([
    { id: 1, name: 'Note 1', priority: ' 3', time: '08:30 PM', isChecked: false, location: 'Stockholm', year: 2024, month: 2, day: 13 },
  ]);

  return (
    <View style={styles.container}>
      <Headbar
        showIcons={false}
        onFiltersPress={handleIcon1Press}
        onSearchPress={handleIcon2Press}
        onSettingsPress={handleIcon2Press}
        headBarText={headBarText}
        subHeadBarText={subHeadBarText}
        
      />
      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <TaskBox
            key={task.id}
            task={task}
            onCheckPress={() => handleCheckPress(task)}
            onMenuPress={() => handleMenuPress(task.id)}
          />
        ))}
        {Notes.map((Note) => (
          <NoteBox
            key={Note.id}
            taskName={Note.name}
            time={Note.time}
            isChecked={Note.isChecked}
            onCheckPress={() => handleCheckPress(Note)}
            onMenuPress={() => handleMenuPress(Note.id)}
            location={Note.location}
          />
        ))}
      </ScrollView>
      <FloatingActionButton onPress={handleMorePress} />
      <ModalOptions
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onOptionPress={handleOptionPress}
      />
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
