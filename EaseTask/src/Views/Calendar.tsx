import React, {useState, useEffect} from 'react';
import { ScrollView, View, Modal,Button, TouchableOpacity,Text,StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import CalendarMonth from '../Components/CalendarMonth';
import TaskList from '../Components/TaskList';
import DV from '../Components/defaultValues';
import { getAllNotes, getAllTasks, toggleTaskChecked, toggleNoteChecked } from '../Utils/database_utils';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MonthYearPicker from '../Components/MonthYearPicker';
import { BlurView } from 'expo-blur';
import NoteList from '../Components/NoteList';
const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasksForSelectedDay, setTasksForSelectedDay] = useState([]);
  const [notesForDelectedDay, setNotesForSelectedDay] = useState([]);
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

  const handleDeleteTask = (taskId) => {
    console.log(`Delete task with id: ${taskId}`);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleDeleteNote = (noteId) => {
    console.log(`Delete task with id: ${noteId}`);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  const handleMenuPress = (taskId) => {
    console.log(`Task ${taskId} menu pressed`);
  };

  const handleCheckPressTask = (task) => {
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

  const handleCheckPressNote = (note) => {
    console.log('Note ${note.id} checkbox pressed');
    toggleNoteChecked(note)
    setUpdate(update+1);
  }

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
  const [notes, setNotes] = useState([]);
  getAllNotes(setNotes);

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

    const filteredNotes = notes.filter(note => {
      
      console.log('Note:', note);
      return ( 
        (note.year == year) &&
        (note.month == month) &&
        (note.day == selectedDay)&&selectedDay

      );
    });

    console.log('Filtered tasks:', filteredTasks);
    setTasksForSelectedDay(filteredTasks);

    console.log('Filtered notes:', filteredNotes);
    setNotesForSelectedDay(filteredNotes);   
  }, [selectedDay, year, month, update]);// Only re-run the effect when selectedDay or update changes
  

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  return (
    <View style={[DV.styles.calendarContainer]}>
        <Headbar showIcons ={true} headBarText={headbarText} subHeadBarText={subHeadbarText}onSearchPress={handleIcon1Press} onFiltersPress={handleIcon2Press} onSettingsPress={handleIcon1Press} />
        <ScrollView
        style={[DV.styles.calendarScrollView, {marginBottom: tabBarHeight}]}
        
        contentContainerStyle={isExtended ? DV.styles.calendarScrollViewContentExtended : DV.styles.calendarScrollViewContent}
      >
        <TouchableOpacity onPress={togglePicker} >
        <CalendarMonth year={year} month={month} extended={isExtended} tasks={tasks} notes={notes} selectedDay={selectedDay} handleSelectDay={handleSelectDay}/>
        </TouchableOpacity>
        {/* <ScrollView > */}
          <View style={{width: 320,
          height: 100,}}>
        <TaskList tasks={tasks.filter(task => {
          return (
            selectedDay &&
            task.day === selectedDay &&
            task.month === month &&
            task.year === year
          );
        })} onCheckPress={handleCheckPressTask} onMenuPress={handleMenuPress} onDelete={handleDeleteTask} />
        <NoteList notes={notes.filter(note => {
          return (
            selectedDay &&
            note.day === selectedDay &&
            note.month === month &&
            note.year === year
          );
        })} onCheckPress={handleCheckPressNote} onMenuPress={handleMenuPress} onDelete={handleDeleteNote} />
        </View>
        {/* </ScrollView> */}
        {/* <TaskList 
        tasks={tasks.filter(task => {
          return (
            selectedDay &&
            task.day === selectedDay &&
            task.month === month &&
            task.year === year
          );
        })}
        onCheckPress={handleCheckPress}
        onMenuPress={handleMenuPress}
        onDelete={handleDeleteTask}
      
      /> */}
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