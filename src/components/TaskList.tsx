import TaskItem from './TaskItem';
import { useTasks } from './TaskContext';

const TaskList = () => {
  const { filteredTasks } = useTasks();

  if (filteredTasks.length === 0) {
    return <p className="empty-state">Задач по текущему фильтру нет.</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
