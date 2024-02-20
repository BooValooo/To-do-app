// TaskBox.tsx is a component that displays a task with its details and a checkbox to mark it as completed.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
// import TaskDetailsModal from './TaskDetailsModal';
import { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const TaskBox = ({ task, onCheckPress, onMenuPress, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeableRow, setSwipeableRow] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => {
          swipeableRow.close(); 
          onDelete(task.id); 
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
    if (onMenuPress) onMenuPress();
  }

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  // }

  return (
    <Swipeable
      ref={(ref) => setSwipeableRow(ref)}
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
      <View style={styles.taskContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onCheckPress} >
            {task.isChecked ? (
              <AntDesign name="checkcircle" size={24} color="green" />
            ) : (
              <AntDesign name="checkcircleo" size={24} color="grey" />
            )}
          </TouchableOpacity>
          <Text style={styles.taskName}>
            {task.name}
          </Text>
          <View style={styles.menuButton}>
          <TouchableOpacity onPress={toggleExpand} style={styles.menuButton}>
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          </View>
          <View style={styles.taskMeta}>
                <View style={styles.priorityContainer}>
                  <Icon name="flag" size={15} color="orange" />
                  <Text style={styles.priorityText}>{task.priority}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Icon name="access-time" size={15} color="red" />
                  <Text style={styles.timeText}>{task.time}</Text>
                </View>
              </View>
        </View>
        <View style={styles.taskDetails}>

          {isExpanded ? (
            <View style={styles.expandedDetails}>

              <Text style={styles.noteText}>gddahsljdhaljshdjlashdjlawhdjl</Text>
              <Text style={styles.modifiedDate}>Modified Sat, 27 Jan</Text>
            </View>
          ) : null}
        </View>

      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    
  },
  timeContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    marginLeft: 4,
    color: 'orange',
  },
  timeText: {
    marginLeft: 4,
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
  },
  expandedDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  noteText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 32,
  },
  modifiedDate: {
    fontSize: 14,
    color: '#666',
  },
  taskMeta: {
    position: 'absolute',
    flex: 1,
    right: 35,
  
    alignItems: 'flex-start',

  },
  // taskMetaExpanded: {
  //   position: 'absolute',
  //   flex: 1,
  //   right: 35,
  //   bottom: 91,
  //   alignItems: 'flex-start',
  // },
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
    backgroundColor: 'white',

    borderRadius: 8,
    // padding: 1,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    // borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 85,
    // maxWidth: 150
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
    marginBottom: 1,
    marginLeft: 12,

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
    position: 'absolute',
    right: 0,
    top: 0,},
});
// styles TaskBox;

export default TaskBox;
