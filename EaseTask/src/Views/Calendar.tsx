import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Headbar from '../Components/Headbar';
import CalendarMonth from '../Components/CalendarMonth';
import TaskBox from '../Components/TaskBox';
import Task from '../Utils/task';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasksForSelectedDay, setTasksForSelectedDay] = useState([]);
  const [isExtended, setIsExtended] = useState(false);

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
    if (task.location !== undefined) {
      setNote(prevTasks => {
        const updatedTasks = prevTasks.map(prevTask => {
          if (prevTask.id === task.id) {
            return {
              ...prevTask,
              isChecked: !prevTask.isChecked
            };
          }
          return prevTask;
        });
        return updatedTasks;
      })
    } else {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(prevTask => {
        if (prevTask.id === task.id) {
          return {
            ...prevTask,
            isChecked: !prevTask.isChecked
          };
        }
        return prevTask;
      });
      return updatedTasks;
    });}
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;

  const showSearchIcon = true;
  const headbarText = "Calendar"
  const subHeadbarText = "Events and Tasks"

  const task: Task = {
    id: 1,
    name: 'Example Task',
    priority: "priority 3",
    year: 2024,
    month: 2,
    day: 13,
    time: "08:30 PM",
    isChecked: false,
  };

  const task2: Task = {
    id: 2,
    name: 'Example Task',
    priority: "priority 3",
    year: 2024,
    month: 2,
    day: 15,
    time: "08:30 PM",
    isChecked: true,
  };

  const task3: Task = {
    id: 3,
    name: 'Example Task',
    priority: "priority 3",
    year: 2024,
    month: 2,
    day: 15,
    time: "08:30 PM",
    isChecked: false,
  };

  const [tasks, setTasks] = useState([task, task2, task3]);
  const [Notes, setNote] = useState([
    { id: 1, name: 'Note 1', priority: ' 3', time: '08:30 PM', isChecked: false, location: 'Stockholm' },
  ]);


  useEffect(() => {
    console.log('Selected day:', selectedDay);
    const filteredTasks = tasks.filter(task => {
      return (
        selectedDay &&
        task.day === selectedDay
      );
    });
    console.log('Filtered tasks:', filteredTasks);
    setTasksForSelectedDay(filteredTasks);
  }, [selectedDay, tasks]); // Only re-run the effect when selectedDay changes
  



  return (
    <View style={styles.container}>
        <Headbar headBarText={headbarText} subHeadBarText={subHeadbarText}onSearchPress={handleIcon1Press} onFiltersPress={handleIcon2Press} onSettingsPress={handleIcon1Press} />
        <ScrollView
        style={styles.scrollView}
        contentContainerStyle={isExtended ? styles.scrollViewContentExtended : styles.scrollViewContent}
      >
        <CalendarMonth year={year} month={month} extended={isExtended} tasks={tasks} selectedDay={selectedDay} handleSelectDay={handleSelectDay}/>
        {tasksForSelectedDay.map(task => (
          <TaskBox
            key={task.id}
            task={task}
            onCheckPress={() => handleCheckPress(task)}
            onMenuPress={() => handleMenuPress(task.id)}
          />
        ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  scrollViewContentExtended: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 100, // Adjust as needed for your extended view
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Calendar;