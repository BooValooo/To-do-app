import React from 'react';
import { View, StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import CalendarMonth from '../Components/CalendarMonth';

const Calendar = () => {
  const handleIcon1Press = () => {
    // Handle the press event for the first icon
    console.log('Icon 1 pressed');
  };

  const handleIcon2Press = () => {
    // Handle the press event for the second icon
    console.log('Icon 2 pressed');
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;

  const showSearchIcon = true;
  const headbarText = "Calendar"

  return (
    <View style={styles.container}>
      <Headbar showSearchIcon={showSearchIcon} headbarText={headbarText} onSearchPress={handleIcon1Press} onOptionsPress={handleIcon2Press} />
      <CalendarMonth year={year} month={month}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Calendar;