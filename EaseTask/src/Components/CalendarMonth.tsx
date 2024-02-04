import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarWeek from './CalendarWeek';
import WeekDaysBar from './WeekDaysBar';
import getFirstDayOfMonth from '../Utils/getFirstDayOfMonth';
import getDaysInMonth from '../Utils/getDaysInMonth';
import MonthBar from './MonthBar';

const CalendarMonth = ({year, month}) => {
    const FirstDayOfMonth = (getFirstDayOfMonth(year, month) != 0) ? getFirstDayOfMonth(year, month) : 7 ;
    const DaysInMonth = getDaysInMonth(year,month);
    const [selectedDay, setSelectedDay] = useState(null);

    const handleSelectDay = (day) => {
      setSelectedDay(day);
      // Add additional logic or dispatch an event if needed
    };
  
    return (
      <View style={styles.monthContainer}>
        <MonthBar year={year} month={month}/>
        <WeekDaysBar/>
        <CalendarWeek start={1} end={8-FirstDayOfMonth} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
        <CalendarWeek start={8-FirstDayOfMonth+1} end={8-FirstDayOfMonth+7} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
        <CalendarWeek start={8-FirstDayOfMonth+8} end={8-FirstDayOfMonth+14} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
        <CalendarWeek start={8-FirstDayOfMonth+15} end={8-FirstDayOfMonth+21} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
        <CalendarWeek start={8-FirstDayOfMonth+22} end={DaysInMonth} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
      </View>
    );
  };

const styles = StyleSheet.create({
  monthContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
});

export default CalendarMonth;