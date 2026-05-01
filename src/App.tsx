import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskStats from './components/TaskStats';
import Card from './components/Card';
import './App.css';
import SearchItem from './components/SearchItem';

function App() {
  return (
    <div className="app-shell">
      <h1 className="app-title">To Do List</h1>

      <Card title="Управление">
        <TaskForm />
        <SearchItem />
        <TaskFilter />
      </Card>

      <Card title="Список задач">
        <TaskList />
      </Card>

      <TaskStats />
    </div>
  );
}

export default App;
