import React, {useState, useEffect} from 'react';
import { ScrollView, View, Modal,Button, TouchableOpacity,Text,StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import CalendarMonth from '../Components/CalendarMonth';
import TaskBox from '../Components/TaskBox';
import TaskList from '../Components/TaskList';
import DV from '../Components/defaultValues';
import { getAllTasks, toggleTaskChecked } from '../Utils/database_utils';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MonthYearPicker from '../Components/MonthYearPicker';
import { BlurView } from 'expo-blur';
const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasksForSelectedDay, setTasksForSelectedDay] = useState([]);
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
    // Update local state of tasks
    // setTasks(prevTasks => {
    //   return prevTasks.map(prevTask => {
    //     if (prevTask.id === task.id) {
    //       return {
    //         ...prevTask,
    //         isChecked: !prevTask.isChecked // Toggle isChecked locally
    //       };
    //     }
    //     return prevTask;
    //   });
    // });
    // Update database
    toggleTaskChecked(task);
    // Force a re-rendering
    setUpdate(update +1);
  };
  const [isPickerVisible, setPickerVisible] = useState(false); 

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleConfirm = () => {
    togglePicker();
  };
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear()); 
  const [month, setMonth] = useState(currentDate.getMonth() +1); 

  const showSearchIcon = true;
  const headbarText = "Calendar"
  const subHeadbarText = "Events and Tasks"



  const [tasks, setTasks] = useState([]);
  getAllTasks(setTasks);

  useEffect(() => {
    console.log('Selected day:', selectedDay, 'Month:', month, 'Year:', year);
    const filteredTasks = tasks.filter(task => {
      
      console.log('Task:', task);
      return ( 
        (task.year == year) &&
        (task.month == month) &&
        (task.day == selectedDay)&&selectedDay

      );
    });

    console.log('Filtered tasks:', filteredTasks);
    setTasksForSelectedDay(filteredTasks);
  }, [selectedDay, year, month, update]);// Only re-run the effect when selectedDay or update changes
  

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  return (
    <View style={[DV.styles.calendarContainer,{paddingBottom: 50}]}>
        <Headbar showIcons ={true} headBarText={headbarText} subHeadBarText={subHeadbarText}onSearchPress={handleIcon1Press} onFiltersPress={handleIcon2Press} onSettingsPress={handleIcon1Press} />
        <ScrollView
        style={DV.styles.calendarScrollView}
        contentContainerStyle={isExtended ? DV.styles.calendarScrollViewContentExtended : DV.styles.calendarScrollViewContent}
      >
        <TouchableOpacity onPress={togglePicker} >
        <CalendarMonth year={year} month={month} extended={isExtended} tasks={tasks} selectedDay={selectedDay} handleSelectDay={handleSelectDay}/>
        </TouchableOpacity>
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
        <Modal
        visible={isPickerVisible}
        animationType="slide"
        transparent={true}
      >
        <BlurView
        intensity={15}
        style={StyleSheet.absoluteFillObject} 
      ></BlurView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MonthYearPicker year={year} month={month} onYearChange={setYear} onMonthChange={setMonth} />
            <Button title="Confirm" onPress={handleConfirm} />
            <Button title="Cancel" onPress={togglePicker} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: 300, 
    height: 350, 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.65,
    elevation: 5
  },
});

export default Calendar;