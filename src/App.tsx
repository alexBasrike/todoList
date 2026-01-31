import './App.css'
import TodoList from "./components/TodoList/TodoList.tsx";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

const tasks_1: TasksType[] = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false}
];

const tasks_2: TasksType[] = [
    {id: 4, title: "Milk", isDone: true},
    {id: 5, title: "Coffee", isDone: true},
    {id: 6, title: "Pizzza", isDone: false}
];

function App() {
    return (
        <div className="app">
            <TodoList title={"What to learn"} tasks={tasks_1} />
            <TodoList title={"What to buy"} tasks={tasks_2} />
        </div>
    )
}

export default App
