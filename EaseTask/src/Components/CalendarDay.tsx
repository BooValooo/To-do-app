import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CalendarDay = ({ day, selectedDay, onSelectDay, extended, year, month, tasks, notes }) => {
  const styles = StyleSheet.create({
    container: {
      width: '12.7%',
      height: extended ? 105 : 70,
      backgroundColor: (day != 0 ) ? '#e0e0e0' : "#ffffff",
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 2,
      marginLeft:2,
      marginBottom:3,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black'
    },
    selectedDay: {
      borderWidth: 2,
    },
    dayText: {
      color: '#333',
      fontWeight: 'bold',
      position: "absolute",
      bottom: 0,
      fontSize: 10
    },
    icon: {
      position: 'absolute',
      alignItems: 'center',
      top: 3,
   },
})

  const tasksDueOnCurrentDay = tasks.filter(task => task.day === day && task.month === month && task.year === year); //Checks if a task of the given list is due on this day
  const notesDueOnCurrentDay = notes.filter(note => note.day === day && note.month === month && note.year === year); //Checks if a note of the given list is due on this day


  return (
    <TouchableOpacity onPress={() => onSelectDay(day)} style={[styles.container, selectedDay ? styles.selectedDay : null]}>
      <Text style={styles.dayText}>{day !== 0 ? day : null}</Text>
      {tasksDueOnCurrentDay.map((task, index) => (
        <View style={[styles.icon, { top: 3 + (index * 18) }]} key={index}>
          {task.isChecked ? (
            <AntDesign name="checkcircle" size={15} color="green" />
          ) : (
            <AntDesign name="checkcircleo" size={15} color="grey" />
          )}
        </View>
      ))}
      {notesDueOnCurrentDay.map((task, index) => (
        <View style={[styles.icon, { top: 3 + (index * 18) }]} key={index}>
          {task.isChecked ? (
            <AntDesign name="checkcircle" size={15} color="#00E676" />
          ) : (
            <AntDesign name="checkcircleo" size={15} color="grey" />
          )}
        </View>
      ))}
    </TouchableOpacity>
  );
};

;

export default CalendarDay;