import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite'; 


// Opens or creates the database
export const database = SQLite.openDatabase('EaseTask.db');

// Creates the table for tasks and notes (if needed)
// We still have to decide on how to represent the data...
export const databaseInit = () =>
  database.transaction(tx => {
    tx.executeSql("DROP TABLE tasks;");
    tx.executeSql("DROP TABLE notes;");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, text TEXT);"
        );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, location TEXT, text TEXT);"
    );
  });

// Deletes all the tasks/notes
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


/* Tasks */


// Insert a new task into the table
export const createTask = (name, priority, year, month, day, time, text) => {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (name, priority, year, month, day, time, isChecked, text) VALUES (?,?,?,?,?,?,?,0);',
      [name, priority, year, month, day, time, text],
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
          text: row.text,
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

// Delete a specific task from the table
export const deleteTask = (task) => {
  database.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM tasks WHERE id = ?',
        [task.id],
        (_, result) => {
          console.log('Task deleted successfully');
        }
      );
    },
    (error) => {
      console.error('Error deleting task:', error);
    }
  );
};

/* Notes */


// Insert a new note into the table
export const createNote = (name, priority, year, month, day, time, location, text) => {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO notes (name, priority, year, month, day, time, location, text, isChecked) VALUES (?,?,?,?,?,?,?,?,0);',
      [name, priority, year, month, day, time, location, text],
      (_, result) => {
        console.log('Note created successfully');
      },
      (_, error) => {
        console.error('Error creating note:', error);
        return true; // line to satisfy the required signature
      }
    );
  });
};

// Print all notes in the console
export const printAllNotes = () => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notes;',
      [],
      (_, { rows }) => {
        console.log(rows._array);
      }
    );
  });
}

// Get all notes (with a callback function)
export const getAllNotes = (callback) => {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notes;',
      [],
      (_, { rows }) => {
        const notes = rows._array.map(row => ({
          id: row.id,
          name: row.name,
          priority: row.priority,
          year: row.year,
          month: row.month,
          day: row.day,
          time: row.time,
          text: row.text,
          location: row.location,
          isChecked: row.isChecked === 1, // Convert SQLite INTEGER to boolean
        }));
        callback(notes);
      }
    );
  });
}

// Switches a note to completed or uncompleted
export const toggleNoteChecked = (note) => {
  const newCheckedValue = note.isChecked ? 0 : 1; // Toggle isChecked value

  database.transaction(tx => {
    tx.executeSql(
      'UPDATE notes SET isChecked = ? WHERE id = ?;',
      [newCheckedValue, note.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log(`Note ${note.id} isChecked updated to ${newCheckedValue}`);
        } else {
          console.log(`No note found with ID ${note.id}`);
        }
      }
    );
  });
}

// Delete a specific note from the table
export const deleteNote = (note) => {
  database.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM notes WHERE id = ?',
        [note.id],
        (_, result) => {
          console.log('Note deleted successfully');
        }
      );
    },
    (error) => {
      console.error('Error deleting note:', error);
    }
  );
};