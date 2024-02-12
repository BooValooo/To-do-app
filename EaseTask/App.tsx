import React from 'react'
import AppContainer from './src/Components/app-container'
import Navigator from './src'
import { deleteAllDataFromTable, databaseInit, createTask, printAllTasks} from './src/Utils/database_utils'


export default function App() {
databaseInit();
deleteAllDataFromTable("tasks");
createTask("Test 1","priority 1",2024,2,12,"8:30 PM");
createTask("Test 2","priority 3",2024,2,15,"5:30 AM");
createTask("Test 3","priority 2",2024,2,15,"6:15 PM");
printAllTasks();

  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  )
}
