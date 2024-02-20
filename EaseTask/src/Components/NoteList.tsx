import React from 'react';
import NoteBox from './NoteBox'; 

const NoteList = ({ notes, onCheckPress, onMenuPress, onDelete }) => {
  return (
    <>
      {notes.map(note => (
        <NoteBox 
          key={note.id}
          note={note}
          onCheckPress={() => onCheckPress(note)}
          onMenuPress={() => onMenuPress(note.id)}
          onDelete={() => console.log('Delete note')} 
        />
      ))}
    </>
  );
};

export default NoteList;
