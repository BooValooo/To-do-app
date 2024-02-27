import Tag from "./tag";

// Task.tsx
interface Task {
    id: number;
    name: string;
    tags: Tag[];
    year: number;
    month: number;
    day: number;
    time: string;
    isChecked: boolean;
  }
  
  export default Task;