// TaskBox.tsx is a component that displays a task with its details and a checkbox to mark it as completed.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

const TaskBox = ({ task, onCheckPress, onMenuPress }) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={onCheckPress} style={styles.checkbox}>
        {/* Display a checked or unchecked icon based on the isChecked prop */}
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
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
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

export default TaskBox;
