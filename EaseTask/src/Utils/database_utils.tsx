import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite'; 


// Opens or creates the database
export const database = SQLite.openDatabase('EaseTask.db');

// Creates the table for tasks and notes (if needed)
// We still have to decide on how to represent the data...
export const databaseInit = () =>
  database.transaction(tx => {
    tx.executeSql("DROP TABLE IF EXISTS tasks;");
    tx.executeSql("DROP TABLE IF EXISTS notes;");
    tx.executeSql("DROP TABLE IF EXISTS tags;");
    tx.executeSql("DROP TABLE IF EXISTS taskTags;");
    tx.executeSql("DROP TABLE IF EXISTS noteTags;");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, text TEXT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, location TEXT, text TEXT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority INTEGER, color TEXT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS taskTags (id INTEGER PRIMARY KEY AUTOINCREMENT, idTask INTEGER, idTag INTEGER);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS noteTags (id INTEGER PRIMARY KEY AUTOINCREMENT, idNote INTEGER, idTag INTEGER);"
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
export async function createTask (name, priority, year, month, day, time, text) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (name, priority, year, month, day, time, text, isChecked) VALUES (?,?,?,?,?,?,?,0);',
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
export async function getAllTasks(callback) {
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
export async function toggleTaskChecked(task) {
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
      tx.executeSql(
        'DELETE FROM taskTags WHERE idTask = ?',
        [task.id],
        (_, result) => {
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
export async function createNote(name, priority, year, month, day, time, location, text) {
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
export async function getAllNotes(callback) {
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
export async function toggleNoteChecked (note) {
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
      tx.executeSql(
        'DELETE FROM noteTags WHERE idNote = ?',
        [note.id],
        (_, result) => {
        }
      );
    },
    (error) => {
      console.error('Error deleting note:', error);
    }
  );
};

/* Tags */

// Insert a new tag in the database
export async function createTagDB (id, name, priority, color) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tags (id, name, priority, color) VALUES (?,?,?,?);',
      [id, name, priority, color],
      (_, result) => {
        console.log('Tag created successfully');
      },
      (_, error) => {
        console.error('Error creating tag:', error);
        return true; // line to satisfy the required signature
      }
    );
  });
};

// Get all tags (with a callback function)
export async function getAllTags(callback) {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tags;',
      [],
      (_, { rows }) => {
        const tags = rows._array.map(tag => ({
          id: tag.id,
          name: tag.name,
          priority: tag.priority,
          color: tag.color,
        }));
        callback(tags);
      }
    );
  });
}

// Allows the user to change the color of a tag
export async function changeColorTag (tag, newColor) {
  database.transaction(tx => {
    tx.executeSql(
      'UPDATE tags SET color = ? WHERE id = ?;',
      [newColor, tag.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log(`Tag ${tag.id} color updated to ${newColor}`);
        } else {
          console.log(`No tag found with ID ${tag.id}`);
        }
      }
    );
  });
}

// Delete a specific tag from the table
export const deleteTagDB = (tagId) => {
  database.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM tags WHERE id = ?',
        [tagId],
        (_, result) => {
          console.log('Tag deleted successfully');
        }
      );
      tx.executeSql(
        'DELETE FROM taskTags WHERE idTag = ?',
        [tagId],
        (_, result) => {
        }
      );
      tx.executeSql(
        'DELETE FROM noteTags WHERE idTag = ?',
        [tagId],
        (_, result) => {
        }
      )
    },
    (error) => {
      console.error('Error deleting tag:', error);
    }
  );
};

// Add a tag to a task
export async function addTagTask (task, tag) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO taskTags (idTask, idTag) VALUES (?,?);',
      [task.id, tag.id],
      (_, result) => {
        console.log('Link created successfully');
      },
      (_, error) => {
        console.error('Error creating link:', error);
        return true; // line to satisfy the required signature
      }
    );
  });
};

// Add a tag to a note
export async function addTagNote (note, tag) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO noteTags (idNote, idTag) VALUES (?,?);',
      [note.id, tag.id],
      (_, result) => {
        console.log('Link created successfully');
      },
      (_, error) => {
        console.error('Error creating link:', error);
        return true; // line to satisfy the required signature
      }
    );
  });
};

// Delete a specific link a task and a tag
export const deleteTagTask = (task, tag) => {
  database.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM taskTags WHERE (idTask = ? AND idTag = ?);',
        [task.id, tag.id],
        (_, result) => {
          console.log('Link deleted successfully');
        }
      );
    },
    (error) => {
      console.error('Error deleting link:', error);
    }
  );
};