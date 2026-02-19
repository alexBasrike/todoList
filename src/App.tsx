import './App.css'
import TodoList from "./components/TodoList/TodoList.tsx";
import {v1} from "uuid";
import {useState} from "react";

export type TypeForTasks = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const [initialState, setInitialState] = useState<Array<TypeForTasks>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'WP', isDone: false}
    ]);

    let tasks: Array<TypeForTasks> = initialState;

    return (
        <div className="app">
            <TodoList title={'What to learn'} tasks={tasks} />
        </div>
    )
}

export default App
