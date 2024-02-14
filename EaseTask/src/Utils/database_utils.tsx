import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite'; 


// Opens or creates the database
export const database = SQLite.openDatabase('EaseTask.db');

// Creates the table for tasks (if needed)
// We still have to decide on how to represent the data...
export const databaseInit = () =>
  database.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER);"
        );
  });

// Deletes all the tasks
export const deleteAllDataFromTable = (tablename) => {
  database.transaction(
    (tx) => {
      tx.executeSql('DELETE FROM ' + tablename, [], (_, result) => {
        console.log('All data deleted from the table');
      });
    },
    (error) => {
      console.error('Error deleting data:', error);
    }
  );
};
    
// Insert a new task into the table
export const createTask = (name, priority, year, month, day, time) => {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (name, priority, year, month, day, time, isChecked) VALUES (?,?,?,?,?,?,0);',
      [name, priority, year, month, day, time],
      (_, result) => {
        console.log('Task created successfully');
      },
      (_, error) => {
        console.error('Error creating task:', error);
        return true; // line to satisfy the required signature
      }
    );
  });
};

// Print all tasks in the console
export const printAllTasks = () => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, { rows }) => {
        console.log(rows._array);
      }
    );
  });
}

// Get all tasks (with a callback function)
export const getAllTasks = (callback) => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, { rows }) => {
        const tasks = rows._array.map(row => ({
          id: row.id,
          name: row.name,
          priority: row.priority,
          year: row.year,
          month: row.month,
          day: row.day,
          time: row.time,
          isChecked: row.isChecked === 1, // Convert SQLite INTEGER to boolean
        }));
        callback(tasks);
      }
    );
  });
}

// Switches a task to completed or uncompleted
export const toggleTaskChecked = (task) => {
  const newCheckedValue = task.isChecked ? 0 : 1; // Toggle isChecked value

  database.transaction(tx => {
    tx.executeSql(
      'UPDATE tasks SET isChecked = ? WHERE id = ?;',
      [newCheckedValue, task.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log(`Task ${task.id} isChecked updated to ${newCheckedValue}`);
        } else {
          console.log(`No task found with ID ${task.id}`);
        }
      }
    );
  });
}




    // // Query data from the table
    // database.transaction(tx => {
    //   tx.executeSql(
    //     'SELECT * FROM items;',
    //     [],
    //     (_, { rows }) => {
    //       console.log(rows._array);
    //     }
    //   );
    // });
