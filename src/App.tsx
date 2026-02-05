import './App.css'
import TodoList from "./components/TodoList/TodoList.tsx";
import {useState} from "react";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type FilterNameType = "All" | "Active" | "Completed";

function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "React", isDone: false},
        {id: 5, title: "Redux", isDone: false},
        {id: 6, title: "PHP", isDone: false}
    ]);

    const [filterType, setFilterType] = useState<FilterNameType>("All");

    let filteredTasks: TasksType[] = tasks;

    if (filterType === "Active") {
        filteredTasks = tasks.filter(task => !task.isDone);
    }

    if (filterType === "Completed") {
        filteredTasks = tasks.filter(task => task.isDone);
    }

    const filterTasks = (filterName: FilterNameType) => {
        setFilterType(filterName);
    }



    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className="app">
            <TodoList
                title={"What to learn"}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
            />
        </div>
    )
}

export default App
