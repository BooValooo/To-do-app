import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

const NoteBox = ({ note, onCheckPress, onMenuPress,onDelete}) => {

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
          onDelete(note.id); // Call the onDelete function passed from the parent
        }}
        style={styles.deleteButton}>
        <Animated.Text style={[styles.deleteButtonText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={(ref) => setSwipeableRow(ref)}
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
    <View style={styles.noteContainer}>
      {/* Title bar */}
      <View style={styles.titleBar}>
        <Text style={styles.noteTitle}>{note.name}</Text>
      </View>

      {/* Note content */}
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={onCheckPress} style={styles.checkbox}>
          <AntDesign name={note.isChecked ? "checkcircle" : "checkcircleo"} size={24} color={note.isChecked ? "#00E676" : "#BDBDBD"} />
        </TouchableOpacity>
        <View style={styles.noteDetails}>
          <View style={styles.noteMeta}>
            <MaterialIcons name="location-on" size={16} color="#757575" />
            <Text style={styles.location}>{note.location}</Text>
            <Text style={styles.time}>{note.day+'/'+note.month+'  '+note.time}</Text>          
          </View>
        </View>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
  noteContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
  },
  titleBar: {
    backgroundColor: '#C7EE2B',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  checkbox: {
  },
  noteDetails: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  noteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#757575',
    marginRight: 8,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  menuButton: {
  },
});

export default NoteBox;
