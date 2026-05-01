import { useState, type FormEvent } from 'react';
import { useTasks } from './TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Новая задача"
        className="task-input"
      />
      <button type="submit" className="btn btn-primary">Добавить</button>
    </form>
  );
};

export default TaskForm;
