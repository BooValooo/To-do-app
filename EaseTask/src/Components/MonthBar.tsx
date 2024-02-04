import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MonthBar = ({year,month}) => {
    const MonthsDictionary = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      };

  return (
    <View style={styles.container}>
        <Text style={styles.dayText}>
          {MonthsDictionary[month] + ' '+year}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 1,
  },
  dayText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default MonthBar;