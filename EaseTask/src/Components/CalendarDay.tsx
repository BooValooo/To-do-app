import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CalendarDay = ({ day, selectedDay, onSelectDay }) => {
  const styles = StyleSheet.create({
    container: {
      width: '12.7%',
      height: 70,
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
  })
  return (
    <TouchableOpacity onPress={() => onSelectDay(day)} style={[styles.container, selectedDay ? styles.selectedDay : null]}>
      <Text style={styles.dayText}>{(day != 0) ? day : null}</Text>
    </TouchableOpacity>
  );
};

;

export default CalendarDay;