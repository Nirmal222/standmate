interface CardData {
  id: string;
  title: string;
  content: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
}

interface ColumnData {
  id: string;
  title: string;
}

interface BoardData {
  columns: ColumnData[];
  cards: CardData[];
}

export const initialBoard: BoardData = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
    },
    {
      id: 'done',
      title: 'Done',
    },
  ],
  cards: [
    { id: 'task-1', title: 'Task 1', content: 'This is the first task', status: 'todo', priority: 'low' },
    { id: 'task-2', title: 'Task 2', content: 'This is the second task', status: 'todo', priority: 'medium' },
    { id: 'task-3', title: 'Task 3', content: 'This is the third task', status: 'in-progress', priority: 'high' },
    { id: 'task-4', title: 'Task 4', content: 'This is the fourth task', status: 'done', priority: 'low' },
  ],
};
