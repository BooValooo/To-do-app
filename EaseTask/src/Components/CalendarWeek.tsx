import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarDay from './CalendarDay';

const CalendarWeek = ({ start, end, selectedDay, onSelectDay, extended, year, month, tasks, notes }) => {
  var weekDays = [];
  for (var i = start; i <= end; i++) {
    weekDays.push(i);
  };
  if (start == 1) {
    while (weekDays.length<7) {
      weekDays.unshift(0)
    }
  }
  while (weekDays.length<7) {
    weekDays.push(0)
  }

  return (
    <View style={styles.weekContainer}>
      {weekDays.map((day, index) => (
        <CalendarDay key={index} day={day} selectedDay={selectedDay === day} onSelectDay={onSelectDay} extended={extended} year={year} month={month} tasks={tasks} notes={notes}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginStart: 5,
    marginEnd: 5,
    width: '97.5%',
  },
});

export default CalendarWeek;