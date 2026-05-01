import { useTasks } from './TaskContext';

const TaskStats = () => {
  const { tasks } = useTasks();
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="task-stats">
      <p>Всего задач: {tasks.length}</p>
      <p>Выполнено: {completedCount}</p>
      <p>Активных: {tasks.length - completedCount}</p>
    </div>
  );
};

export default TaskStats;
