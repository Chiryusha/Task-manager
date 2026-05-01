import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { FilterType, Task, TaskContextValue } from '../types';

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const defaultTasks: Task[] = [
  { id: 1, title: 'Изучить React', completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Изучить TypeScript', completed: true, createdAt: new Date().toISOString() },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem('tasks');
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Task[];
      setTasks(parsed);
    } catch {
      // ignore invalid localStorage payload
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now(),
      title: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const editTask = useCallback((id: number, title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return;
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, title: trimmed } : task)))
  }, 
  [setTasks]);

 const filteredTasks = useMemo(() => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);

    const matchesSearch =
      normalizedQuery === '' ||
      task.title.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesSearch;
  });
}, [tasks, filter, searchQuery]);



  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      filteredTasks,
      filter,
      addTask,
      toggleTask,
      deleteTask,
      setFilter,
      editTask,
      searchQuery,
      setSearchQuery,
    }),
    [tasks, filteredTasks, filter, addTask, toggleTask, deleteTask, editTask],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }
  return context;
};
