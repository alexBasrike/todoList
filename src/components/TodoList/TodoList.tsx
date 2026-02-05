import {FilterNameType, TasksType} from "../../App.tsx";
import Button from "../Button/Button.tsx";
import css from "./TodoList.module.css";

type PropsType = {
    title: string;
    tasks: TasksType[];
    deleteTask: (id: number) => void;
    filterTasks: (filterName: FilterNameType) => void;
}

const TodoList = ({title, tasks, deleteTask, filterTasks}: PropsType) => {

    const tasksList = tasks.map((task: TasksType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>X</button>
            </li>
        )
    });

    const taskListContent = tasksList.length === 0
        ? <p>Your tasks list is empty</p>
        : <ul className={css.todoList}>{tasksList}</ul>

    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {taskListContent}
            <div>
                <button onClick={() => filterTasks("All")}>All</button>
                <button onClick={() => filterTasks("Active")}>Active</button>
                <button onClick={() => filterTasks("Completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;