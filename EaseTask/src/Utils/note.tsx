import Tag from "./tag";

// Note.tsx
interface Note {
    id: number;
    name: string;
    tags: Tag[];
    year: number;
    month: number;
    day: number;
    time: string;
    location: string;
    isChecked: boolean;
    text: string;
  }
  
  export default Note;
 