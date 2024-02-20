// TaskBox.tsx is a component that displays a task with its details and a checkbox to mark it as completed.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AntDesign, Entypo,FontAwesome } from '@expo/vector-icons';
import TaskDetailsModal from './TaskDetailsModal';
import { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

const TaskBox = ({ task, onCheckPress,onMenuPress,onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeableRow, setSwipeableRow] = useState(null);

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => {
          swipeableRow.close(); // Close the swipeable component
          onDelete(task.id); // Call the onDelete function passed from the parent
        }}
        style={styles.deleteButton}>
        <Animated.Text style={[styles.deleteButtonText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };


  const handleMenuPressInternal = () => {
    setModalVisible(true);
    if(onMenuPress) onMenuPress();
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  return (
    <Swipeable
      ref={(ref) => setSwipeableRow(ref)}
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={onCheckPress} style={styles.checkbox}>
        {task.isChecked ? (
          <AntDesign name="checkcircle" size={24} color="green" />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="grey" />
        )}
      </TouchableOpacity>
      <View style={styles.taskDetails}>
        <Text style={styles.taskName}>{task.name}</Text>
        <View style={styles.taskMeta}>
          <Text style={styles.priority}>{task.priority}</Text>
          <Text style={styles.time}>{task.day+'/'+task.month+'  '+task.time}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleMenuPressInternal} style={styles.menuButton}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>
      <TaskDetailsModal task={task} isVisible={modalVisible} onClose={handleCloseModal} />
    </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.22, 
    shadowRadius: 2.22, 
  },
  checkbox: {
    // style for the checkbox container, TODO: add styles if needed
  },
  taskDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priority: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff5252',
    marginRight: 8,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  menuButton: {
    // Style if needed
  },
});
// styles TaskBox;

export default TaskBox;
