// types/index.ts
// Здесь будут все общие типы нашего приложения

export interface Task{
    id: number,
    title: string,
    completed: boolean,
    createdAt: string,
};

export type FilterType = "all" | 'active' | 'completed'

export interface TaskContextValue {
    tasks: Task[];
    filteredTasks: Task[];
    filter: FilterType;
    addTask: (title: string) => void;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
    setFilter: (filter: FilterType) => void;
    editTask: (id: number, title: string) => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}
