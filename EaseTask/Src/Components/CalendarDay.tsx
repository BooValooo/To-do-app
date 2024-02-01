import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalendarDay = ({ day }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>{day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  dayText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default CalendarDay;