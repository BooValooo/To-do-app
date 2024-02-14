import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const MonthYearPicker = ({year, month, onYearChange, onMonthChange}) => {
  const years = Array.from(new Array(30), (val, index) => (new Date().getFullYear() - 15) + index);
  const months = Array.from(new Array(12), (val, index) => index + 1);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
      <Picker
        selectedValue={year}
        style={{ width: 100 }}
        onValueChange={(itemValue, itemIndex) => onYearChange(itemValue)}
      >
        {years.map((year, index) => (
          <Picker.Item key={index} label={year.toString()} value={year} />
        ))}
      </Picker>
      <Picker
        selectedValue={month}
        style={{ width: 100 }}
        onValueChange={(itemValue, itemIndex) => onMonthChange(itemValue)}
      >
        {months.map((month, index) => (
          <Picker.Item key={index} label={month.toString().padStart(2, '0')} value={month} />
        ))}
      </Picker>
    </View>
  );
};

export default MonthYearPicker;
