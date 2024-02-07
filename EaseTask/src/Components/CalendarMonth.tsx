import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarWeek from './CalendarWeek';
import WeekDaysBar from './WeekDaysBar';
import getFirstDayOfMonth from '../Utils/getFirstDayOfMonth';
import getDaysInMonth from '../Utils/getDaysInMonth';
import MonthBar from './MonthBar';

const CalendarMonth = ({year, month, extended, tasks, handleSelectDay, selectedDay}) => {
    const FirstDayOfMonth = (getFirstDayOfMonth(year, month) != 0) ? getFirstDayOfMonth(year, month) : 7 ;
    const DaysInMonth = getDaysInMonth(year,month);


  
    return (
      <View style={styles.monthContainer}>
        <MonthBar year={year} month={month}/>
        <WeekDaysBar/>
        <CalendarWeek start={1} end={8-FirstDayOfMonth} selectedDay={selectedDay} onSelectDay={handleSelectDay} extended={extended} tasks={tasks}/>
        <CalendarWeek start={8-FirstDayOfMonth+1} end={8-FirstDayOfMonth+7} selectedDay={selectedDay} onSelectDay={handleSelectDay} extended={extended} tasks={tasks}/>
        <CalendarWeek start={8-FirstDayOfMonth+8} end={8-FirstDayOfMonth+14} selectedDay={selectedDay} onSelectDay={handleSelectDay} extended={extended} tasks={tasks}/>
        <CalendarWeek start={8-FirstDayOfMonth+15} end={8-FirstDayOfMonth+21} selectedDay={selectedDay} onSelectDay={handleSelectDay} extended={extended} tasks={tasks} />
        <CalendarWeek start={8-FirstDayOfMonth+22} end={DaysInMonth} selectedDay={selectedDay} onSelectDay={handleSelectDay} extended={extended} tasks={tasks}/>
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