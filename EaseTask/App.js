import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarWeek from './Src/Components/CalendarWeek';

const App = () => {
  const weekDays = ['1', '2', '3', '4', '5', '6', '7']; // Example days for the week

  return (
    <View style={styles.container}>
      <CalendarWeek weekDays={weekDays} />
      {/* Add more CalendarWeek components or customize as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});

export default App;