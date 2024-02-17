// main-screen.tsx
import React, { useState, useEffect } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { View, ScrollView, StyleSheet, Modal, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Headbar from '../Components/Headbar';
import TaskBox from '../Components/TaskBox';
import NoteBox from '../Components/NoteBox';
import FloatingActionButton from '../Components/FloatingActionButton';
import ModalOptions from '../Components/ModalOptions';
import Task from '../Utils/task';
import Note from '../Utils/note';
import ChatModal from '../Components/ModalChat';
import NewTaskModal from '../Components/NewTaskModal';
import Filter from './Filter';
import { getAllTasks, toggleTaskChecked, toggleNoteChecked, getAllNotes } from '../Utils/database_utils';

/**
 * Main screen component.
 */
const MainScreen = () => {
  // To force UI updates
  const [update, setUpdate] = useState(0);

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
   * State for filter visibility
   */
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilter = () => {
    setFilterVisible(true)
  }


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
     * State for new task modal visibility.
     */
  const [newTaskVisible, setNewTaskVisible] = useState(false);

  /**
   * Handler for opening the new task modal.
   */
  const handleNewTaskOpen = () => {
    setNewTaskVisible(true)
    console.log("new task pressed")
    setModalVisible(false)
  }
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
  const [tasks, setTasks] = useState<Task[]>([]);

    /**
   * State for notes.
   */
  const [Notes, setNotes] = useState<Note[]>([]);

  // When a task is marked as (un)completed
  const handleCheckPressTask = (task) => {
    console.log(`Task ${task.id} checkbox pressed`);
    toggleTaskChecked(task);
    setUpdate(update + 1);
  };

  // When a note is marked as (un)completed
  const handleCheckPressNote = (note) => {
    console.log(`Note ${note.id} checkbox pressed`);
    toggleNoteChecked(note);
    setUpdate(update + 1);
  };

  // Allows to update the UI when a task or note is ticked, edited or created
  useEffect(() => {
    getAllTasks(setTasks);
    getAllNotes(setNotes)
  }, [update]);

  // Allows to update the UI when a task or note is edited or ticked from the calendar
  useFocusEffect(
    React.useCallback(() => {
      getAllTasks(setTasks);
      getAllNotes(setNotes);
    }, [])
  );

  // Called when a new task is created
  const onCloseNewTaskModal = () => {
    setNewTaskVisible(false);
    setUpdate(update+1);
  }



  return (
    <View style={styles.container}>
      <Headbar
        showIcons={true}
        onFiltersPress={handleFilter}
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
            onCheckPress={() => handleCheckPressTask(task)}
            onMenuPress={() => handleMenuPress(task.id)}
          />
        ))}
        {Notes.map((Note) => (
          <NoteBox
            key={Note.id}
            taskName={Note.name}
            time={Note.time}
            isChecked={Note.isChecked}
            onCheckPress={() => handleCheckPressNote(Note)}
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
        onNewModalPress={handleNewModalOpen}
        onNewTaskPress={handleNewTaskOpen}
      />
      <ChatModal
        isVisible={chatModalVisible}
        onClose={() => setChatModalVisible(false)}
      />
      <NewTaskModal
        isVisible={newTaskVisible}
        onClose={onCloseNewTaskModal}
      />
      <Filter
        isVisible={filterVisible}
        onClose={() => setFilterVisible(false)}
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
