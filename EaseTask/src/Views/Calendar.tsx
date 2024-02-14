import React, {useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';
import Headbar from '../Components/Headbar';
import CalendarMonth from '../Components/CalendarMonth';
import TaskBox from '../Components/TaskBox';
import TaskList from '../Components/TaskList';
import DV from '../Components/defaultValues';
import { getAllTasks, toggleTaskChecked } from '../Utils/database_utils';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isExtended, setIsExtended] = useState(false);
  const [update, setUpdate] = useState(1); //To force a re-render
  const tabBarHeight = useBottomTabBarHeight();
  const handleToggleExtended = () => { //extended view of the calendar (swipe down)
    setIsExtended(!isExtended);
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const handleIcon1Press = () => {
    // Handle the press event for the first icon
    console.log('Icon 1 pressed');
  };

  const handleIcon2Press = () => {
    // Handle the press event for the second icon
    console.log('Icon 2 pressed');
  };

  const handleMenuPress = (taskId) => {
    console.log(`Task ${taskId} menu pressed`);
  };

  const handleCheckPress = (task) => {
    console.log(`Task ${task.id} checkbox pressed`);
    // Update database
    toggleTaskChecked(task);
    // Force a re-rendering
    setUpdate(update+1);
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;

  const showSearchIcon = true;
  const headbarText = "Calendar"
  const subHeadbarText = "Events and Tasks"



  const [tasks, setTasks] = useState([]);
  getAllTasks(setTasks);

  return (
    <View style={[DV.globalStyles.calendarContainer,{paddingBottom: 50}]}>
        <Headbar showIcons ={true} headBarText={headbarText} subHeadBarText={subHeadbarText}onSearchPress={handleIcon1Press} onFiltersPress={handleIcon2Press} onSettingsPress={handleIcon1Press} />
        <ScrollView
        style={DV.globalStyles.calendarScrollView}
        contentContainerStyle={isExtended ? DV.globalStyles.calendarScrollViewContentExtended : DV.globalStyles.calendarScrollViewContent}
      >
        <CalendarMonth year={year} month={month} extended={isExtended} tasks={tasks} selectedDay={selectedDay} handleSelectDay={handleSelectDay}/>
        <TaskList 
        tasks={tasks.filter(task => {
          return (
            selectedDay &&
            task.day === selectedDay
          );
        })}
        onCheckPress={handleCheckPress}
        onMenuPress={handleMenuPress}
      />
        </ScrollView>
    </View>
  );
};

export default Calendar;