import { useCallback, useState } from 'react';
import type { Task } from '../types';
import { useTasks } from './TaskContext';

export interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const startEdit = useCallback(() => {
    setDraft(task.title);
    setIsEditing(true);
  }, [task.title]);

  const saveEdit = useCallback(() => {
    editTask(task.id, draft);
    setIsEditing(false);
  }, [task.id, draft, editTask]);

  const cancelEdit = useCallback(() => {
    setDraft(task.title);
    setIsEditing(false);
  }, [task.title]);

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  return (
    <li className="task-item" onDoubleClick={startEdit}>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        onDoubleClick={(e) => e.stopPropagation()}
      />

      {isEditing ? (
        <input
          className="task-input task-input-inline"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          onDoubleClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </span>
      )}

      <button
        type="button"
        className="btn btn-danger"
        onClick={handleDelete}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
