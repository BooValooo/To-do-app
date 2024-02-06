import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import CalendarMonth from '../Components/CalendarMonth';
import TaskBox from '../Components/TaskBox';
import Task from '../Utils/task';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasksForSelectedDay, setTasksForSelectedDay] = useState([]);

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
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;

  const showSearchIcon = true;
  const headbarText = "Calendar"

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

  const tasks = [task, task2]


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
  }, [selectedDay]); // Only re-run the effect when selectedDay changes
  



  return (
    <View style={styles.container}>
      <Headbar showSearchIcon={showSearchIcon} headbarText={headbarText} onSearchPress={handleIcon1Press} onOptionsPress={handleIcon2Press} />
      <CalendarMonth year={year} month={month} extended={false} tasks={tasks} selectedDay={selectedDay} handleSelectDay={handleSelectDay}/>
      {tasksForSelectedDay.map(task => (
        <TaskBox
          key={task.id}
          task={task}
          onCheckPress={() => null}
          onMenuPress={() => null}
        />
      ))}
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