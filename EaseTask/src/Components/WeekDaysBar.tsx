import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeekDaysBar = () => {
  const days = [' Mon', ' Tue ', ' Wed  ', 'Thu    ', 'Fri   ', 'Sat  ', 'Sun  '];

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <Text key={index} style={styles.dayText}>
          {day}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 1,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeekDaysBar;