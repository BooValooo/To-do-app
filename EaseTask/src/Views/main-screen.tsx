// main-screen.tsx
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Headbar from '../Components/Headbar';
import TaskBox from '../Components/TaskBox';
import NoteBox from '../Components/NoteBox';
import FloatingActionButton from '../Components/FloatingActionButton';
import ModalOptions from '../Components/ModalOptions';
import Task from '../Utils/task';
import Note from '../Utils/note';
import ChatModal from '../Components/ModalChat';

/**
 * Main screen component.
 */
const MainScreen = () => {
  /**
   * Handler for search icon press.
   */
  const handleIcon1Press = () => {
    console.log('Search icon pressed');
  };

  /**
   * Handler for options icon press.
   */
  const handleIcon2Press = () => {
    console.log('Options icon pressed');
  };

  /**
   * Text for the sub header bar.
   */
  const subHeadBarText = 'Upcoming events';

  /**
   * Text for the header bar.
   */
  const headBarText = 'Focus';

  /**
   * Handler for checkbox press.
   * @param task - The task object.
   */
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
      });
    }
  };

  /**
   * State for modal visibility.
   */
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Handler for more press.
   */
  const handleMorePress = () => {
    setModalVisible(true);
  };

  /**
   * Handler for closing the modal.
   */
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  /**
   * State for chat modal visibility.
   */
  const [chatModalVisible, setChatModalVisible] = useState(false);

  /**
   * Handler for opening the new modal.
   */
  const handleNewModalOpen = () => {
    setChatModalVisible(true)
    setModalVisible(false)
  }

  /**
   * Handler for sending a message.
   * @param message - The message to send.
   */
  const handleSendMessage = (message) => {
    console.log('Message to send:', message);
    //API for backend, TODO
  };

  /**
   * Handler for option press.
   * @param option - The selected option.
   */
  const handleOptionPress = (option) => {
    console.log(`Option selected: ${option}`);
    handleCloseModal();
  };

  /**
   * Handler for menu press.
   * @param taskId - The task ID.
   */
  const handleMenuPress = (taskId) => {
    console.log(`Task ${taskId} menu pressed`);
  };

  /**
   * State for tasks.
   */
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', priority: 'Priority 1', year: 2024, month: 2, day: 13, time: '08:30 PM', isChecked: true },
    { id: 2, name: 'Task 2', priority: 'Priority 1', year: 2024, month: 2, day: 17, time: '08:30 PM', isChecked: false },
    { id: 3, name: 'Task 3', priority: 'Priority 3', year: 2024, month: 2, day: 20, time: '06:30 AM', isChecked: false },
  ]);

  /**
   * State for notes.
   */
  const [Notes, setNote] = useState<Note[]>([
    { id: 1, name: 'Note 1', priority: ' 3', time: '08:30 PM', isChecked: false, location: 'Stockholm', year: 2024, month: 2, day: 13 },
  ]);

  return (
    <View style={styles.container}>
      <Headbar
        showIcons={true}
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
        onNewModalPress={handleNewModalOpen} // Pass the new handler
      />
      <ChatModal
        isVisible={chatModalVisible}
        onClose={() => setChatModalVisible(false)}
        onSendMessage={handleSendMessage}
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
