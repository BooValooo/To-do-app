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
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, text TEXT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, year INTEGER, month INTEGER, day INTEGER, time TEXT, isChecked INTEGER, location TEXT, text TEXT);"
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
export async function createTask (name, year, month, day, time, text) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (name, year, month, day, time, text, isChecked) VALUES (?,?,?,?,?,?,0);',
      [name, year, month, day, time, text],
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

// Print all tasks in the console (for debugging)
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

// Get all tasks with their associated tags
export async function getAllTasks(callback) {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT t.id AS taskId, t.name AS taskName, t.year AS taskYear, t.month AS taskMonth, t.day AS taskDay, t.time AS taskTime, t.isChecked AS taskIsChecked, t.text AS taskText, ta.id AS tagId, ta.name AS tagName, ta.priority AS tagPriority, ta.color AS tagColor FROM tasks AS t LEFT JOIN taskTags ON taskTags.idTask = t.id LEFT JOIN tags AS ta ON taskTags.idTag = ta.id;',
      [],
      (_, { rows }) => {
        const tasks = {};
        rows._array.forEach(row => {
          const taskId = row.taskId;
          if (!tasks[taskId]) {
            tasks[taskId] = {
              id: taskId,
              name: row.taskName,
              year: row.taskYear,
              month: row.taskMonth,
              day: row.taskDay,
              time: row.taskTime,
              isChecked: row.taskIsChecked === 1, // Convert SQLite INTEGER to boolean
              text: row.taskText,
              tags: []
            };
          }
          if (row.tagId != null) {
            tasks[taskId].tags.push({
              id: row.tagId,
              name: row.tagName,
              priority: row.tagPriority,
              color: row.tagColor
            });
          }
        });
        callback(Object.values(tasks)); // Convert object to array before passing to the callback
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
export async function createNote(name, year, month, day, time, location, text) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO notes (name, year, month, day, time, location, text, isChecked) VALUES (?,?,?,?,?,?,?,0);',
      [name, year, month, day, time, location, text],
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

// Get all notes with their associated tags
export async function getAllNotes(callback) {
  database.transaction(tx => {
    tx.executeSql(
      'SELECT n.id AS noteId, n.name AS noteName, n.year AS noteYear, n.month AS noteMonth, n.day AS noteDay, n.time AS noteTime, n.isChecked AS noteIsChecked, n.text AS noteText, n.location AS noteLocation, ta.id AS tagId, ta.name AS tagName, ta.priority AS tagPriority, ta.color AS tagColor FROM notes AS n LEFT JOIN noteTags ON noteTags.idNote = n.id LEFT JOIN tags AS ta ON noteTags.idTag = ta.id;',
      [],
      (_, { rows }) => {
        const notes = {};
        rows._array.forEach(row => {
          const noteId = row.noteId;
          if (!notes[noteId]) {
            notes[noteId] = {
              id: noteId,
              name: row.noteName,
              year: row.noteYear,
              month: row.noteMonth,
              day: row.noteDay,
              time: row.noteTime,
              location: row.noteLocation,
              isChecked: row.noteIsChecked === 1, // Convert SQLite INTEGER to boolean
              text: row.noteText,
              tags: []
            };
          }
          if (row.tagId != null) {
            notes[noteId].tags.push({
              id: row.tagId,
              name: row.tagName,
              priority: row.tagPriority,
              color: row.tagColor
            });
          }
        });
        callback(Object.values(notes)); // Convert object to array before passing to the callback
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

// Allows the user to change the name of a tag
export async function changeNameTag (tag, newName) {
  database.transaction(tx => {
    tx.executeSql(
      'UPDATE tags SET name = ? WHERE id = ?;',
      [newName, tag.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log(`Tag ${tag.id} name updated to ${newName}`);
        } else {
          console.log(`No tag found with ID ${tag.id}`);
        }
      }
    );
  });
}

// Allows the user to change the name of a tag
export async function changePriorityTag (tag, newPrio) {
  database.transaction(tx => {
    tx.executeSql(
      'UPDATE tags SET priority = ? WHERE id = ?;',
      [newPrio, tag.id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log(`Tag ${tag.id} priority updated to ${newPrio}`);
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
export async function addTagTask (taskId, tagId) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO taskTags (idTask, idTag) VALUES (?,?);',
      [taskId, tagId],
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
export async function addTagNote (noteId, tagId) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO noteTags (idNote, idTag) VALUES (?,?);',
      [noteId, tagId],
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