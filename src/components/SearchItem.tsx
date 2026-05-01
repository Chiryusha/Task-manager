import { useTasks } from './TaskContext';


const SearchItem = () => {
    const { searchQuery, setSearchQuery } = useTasks();
    return (
        <div className="search-wrap">
            <input 
            className = "task-input search-input"
            placeholder='Введите название задачи'
            value = {searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
            />
        </div>
    )
}

export default SearchItem;