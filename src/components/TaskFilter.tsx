import { useCallback } from 'react';
import { useTasks } from './TaskContext';

const TaskFilter = () => {
  const { filter, setFilter } = useTasks();

  const handleFilter = useCallback(
    (message: 'all' | 'active' | 'completed') => () => {
      setFilter(message);
    },
    [setFilter],
  );

  return (
    <div className="task-filter">
      <button
        type="button"
        className="btn"
        onClick={handleFilter('all')}
        disabled={filter === 'all'}
      >
        All
      </button>
      <button
        type="button"
        className="btn"
        onClick={handleFilter('active')}
        disabled={filter === 'active'}
      >
        Active
      </button>
      <button
        type="button"
        className="btn"
        onClick={handleFilter('completed')}
        disabled={filter === 'completed'}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;
