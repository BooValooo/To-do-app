import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const NoteBox = ({ taskName, time, isChecked, onCheckPress, onMenuPress, location }) => {
  return (
    <View style={styles.noteContainer}>
      {/* Title bar */}
      <View style={styles.titleBar}>
        <Text style={styles.noteTitle}>{taskName}</Text>
      </View>

      {/* Note content */}
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={onCheckPress} style={styles.checkbox}>
          <AntDesign name={isChecked ? "checkcircle" : "checkcircleo"} size={24} color={isChecked ? "#00E676" : "#BDBDBD"} />
        </TouchableOpacity>
        <View style={styles.noteDetails}>
          <View style={styles.noteMeta}>
            <MaterialIcons name="location-on" size={16} color="#757575" />
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
