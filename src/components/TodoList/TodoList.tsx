import css from "./TodoList.module.css";
import {TypeForFilters, TypeForTasks} from "../../App.tsx";
import FormAddTask from "../FormAddTask/FormAddTask.tsx";
import {ChangeEvent} from "react";

type TypeForTodoList = {
    title: string
    tasks: Array<TypeForTasks>
    addTask: (newTaskTitle: string) => void
    deleteTask: (taskId: TypeForTasks['id']) => void
    changeStatus: (taskId: TypeForTasks['id'], taskStatus: TypeForTasks['isDone']) => void
    filterType: TypeForFilters
    changeFilter: (filterName: TypeForFilters) => void
}

const TodoList = ({title, tasks, addTask, deleteTask, changeStatus, filterType, changeFilter}: TypeForTodoList) => {

    const tasksList = tasks.length === 0
        ? <p>Tasks list is empty.</p>
        : <ul>
            {tasks.map(task => {

                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(task.id, e.currentTarget.checked);
                }

                const deleteTaskHandler = () => deleteTask(task.id);

                return <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                    <span>{task.title}</span>
                    <button onClick={deleteTaskHandler}>X</button>
                </li>
            })}
        </ul>

    const activeButtonAll = filterType === 'all' ? 'btn-primary--active' : '';
    const activeButtonActive = filterType === 'active' ? 'btn-primary--active' : '';
    const activeButtonCompleted = filterType === 'completed' ? 'btn-primary--active' : '';

    const changeFilterHandlerAll = () => changeFilter('all');
    const changeFilterHandlerActive = () => changeFilter('active');
    const changeFilterHandlerCompleted = () => changeFilter('completed');

    return (
        <div className={css.todoList}>

            <h3>{title}</h3>

            <FormAddTask addTask={addTask}/>

            {tasksList}

            <div className={css.buttons}>
                <button className={activeButtonAll} onClick={changeFilterHandlerAll}>All</button>
                <button className={activeButtonActive} onClick={changeFilterHandlerActive}>Active</button>
                <button className={activeButtonCompleted} onClick={changeFilterHandlerCompleted}>Completed</button>
            </div>

        </div>
    );
};

export default TodoList;