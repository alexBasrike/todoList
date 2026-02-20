import './App.css'
import TodoList from "./components/TodoList/TodoList.tsx";
import {v1} from "uuid";
import {useState} from "react";

export type TypeForTasks = {
    id: string
    title: string
    isDone: boolean
}

export type TypeForFilters = 'all' | 'active' | 'completed';

function App() {

    const [initialState, setInitialState] = useState<Array<TypeForTasks>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'WP', isDone: false}
    ]);

    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false};
        setInitialState([newTask, ...initialState]);
    }

    const deleteTask = (taskId: TypeForTasks['id']) => {
        setInitialState(initialState.filter(task => task.id !== taskId));
    }

    const changeStatus = (taskId: TypeForTasks['id'], taskStatus: TypeForTasks['isDone']) => {
        setInitialState(initialState.map(task => task.id !== taskId ? task : {...task, isDone: taskStatus}));
    }

    const [filterType, setFilterType] = useState<TypeForFilters>('all');

    const changeFilter = (filterName: TypeForFilters) => {
        setFilterType(filterName);
    }

    let tasks = initialState;
    if (filterType === 'active') {
        tasks = tasks.filter(task => !task.isDone);
    }
    if (filterType === 'completed') {
        tasks = tasks.filter(task => task.isDone);
    }

    return (
        <div className="app">
            <TodoList
                title={'What to learn'}
                tasks={tasks}
                addTask={addTask}
                deleteTask={deleteTask}
                changeStatus={changeStatus}
                filterType={filterType}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
