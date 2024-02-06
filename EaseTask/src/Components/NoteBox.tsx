import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

const NoteBox = ({ taskName, priority, time, isChecked, onCheckPress, onMenuPress, location }) => {
  // Convert the priority number to text
  const priorityText = `Priority ${priority}`;

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={onCheckPress} style={styles.checkbox}>
        {isChecked ? (
          <AntDesign name="checkcircle" size={24} color="#00E676" />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="#BDBDBD" />
        )}
      </TouchableOpacity>
      <View style={styles.taskDetails}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskName}>{taskName}</Text>
        </View>
        <View style={styles.taskMeta}>
          <Text style={styles.priority}>{priorityText}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Entypo name="dots-three-vertical" size={24} color="#BDBDBD" />
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
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
  taskDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  taskHeader: {
    backgroundColor: '#C8E6C9', // Light green background for the header
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20', // Dark green text for the task name
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priority: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5252', // Red text for priority
    marginRight: 8,
  },
  time: {
    fontSize: 14,
    color: '#757575', // Grey for the time
  },
  menuButton: {
    paddingLeft: 12, // Ensuring touchable area is large enough
  },
});

export default NoteBox;
