import css from "./TodoList.module.css";
import {TypeForTasks} from "../../App.tsx";
import FormAddTask from "../FormAddTask/FormAddTask.tsx";

type TypeForTodoList = {
    title: string
    tasks: Array<TypeForTasks>
}

const TodoList = ({title, tasks}: TypeForTodoList) => {

    const tasksList = tasks.length === 0
        ? <p>Tasks list is empty.</p>
        : <ul>
            {tasks.map(task => {
                return <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button>X</button>
                </li>
            })}
        </ul>

    return (
        <div className={css.todoList}>

            <h3>{title}</h3>

            <FormAddTask />

            {tasksList}

            <div className={css.buttons}>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;