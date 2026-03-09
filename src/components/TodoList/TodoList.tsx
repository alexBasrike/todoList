import {TaskType, TodoListsType} from "../../App.tsx";
import css from "./TodoList.module.css";
import {useState, KeyboardEvent} from "react";

type TodoListPropsType = {
    todoListID: TodoListsType['id']
    title: TodoListsType['title']
    tasks: TaskType[]
    addTask: (todoListID: TodoListsType['id'], taskTitle: TodoListsType['title']) => void
    deleteTask: (todoListID: TodoListsType['id'], taskID: TaskType['id']) => void
    changeTaskStatus: (todoListID: TodoListsType['id'], taskID: TaskType['id'], newTaskStatus: TaskType['isDone']) => void
    changeTasksStatus: (todoListID: TodoListsType['id'], newFilterValue: TodoListsType['filter']) => void
    filterValue: TodoListsType['filter']
}

const TodoList = (
    {todoListID, title, tasks, addTask, deleteTask, changeTaskStatus, changeTasksStatus, filterValue}: TodoListPropsType
) => {

    const [inputValue, setInputValue] = useState('');

    const addTaskHandler = () => {
        addTask(todoListID, inputValue);
        setInputValue('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const activeButtonHandlerAll = filterValue === 'all' ? css.activeButton : '';
    const activeButtonHandlerActive = filterValue === 'active' ? css.activeButton : '';
    const activeButtonHandlerCompleted = filterValue === 'completed' ? css.activeButton : '';

    const changeTasksStatusHandlerAll = () => changeTasksStatus(todoListID, 'all');
    const changeTasksStatusHandlerActive = () => changeTasksStatus(todoListID, 'active');
    const changeTasksStatusHandlerCompleted = () => changeTasksStatus(todoListID, 'completed');

    return (
        <div className={css.todoList}>
            <h2>{title}</h2>

            <div className={css.todoList__form}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>

            {
                tasks.length === 0
                    ? <p>List is empty.</p>
                    : <ul className={css.todoList__list}>
                        {tasks.map((task: TaskType) => (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={(e) => changeTaskStatus(todoListID, task.id, e.currentTarget.checked)}/>
                                <span>{task.title}</span>
                                <button onClick={() => deleteTask(todoListID, task.id)}>x</button>
                            </li>
                        ))}
                    </ul>
            }

            <div className={css.todoList__buttons}>

                <button
                    className={activeButtonHandlerAll}
                    onClick={changeTasksStatusHandlerAll}
                >All
                </button>

                <button
                    className={activeButtonHandlerActive}
                    onClick={changeTasksStatusHandlerActive}
                >Active
                </button>

                <button
                    className={activeButtonHandlerCompleted}
                    onClick={changeTasksStatusHandlerCompleted}
                >Completed
                </button>

            </div>

        </div>
    );
};

export default TodoList;