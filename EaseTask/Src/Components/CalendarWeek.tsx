import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarDay from './CalendarDay';

const CalendarWeek = ({ weekDays }) => {
  return (
    <View style={styles.weekContainer}>
      {weekDays.map((day, index) => (
        <CalendarDay key={index} day={day} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default CalendarWeek;