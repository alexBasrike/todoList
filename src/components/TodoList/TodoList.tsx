import {TaskType, TodoListsType} from "../../App.tsx";
import css from "./TodoList.module.css";
import AddItem from "../AddItem/AddItem.tsx";
import EditableText from "../EditableText/EditableText.tsx";

type TodoListPropsType = {
    todoListID: TodoListsType['id']
    title: TodoListsType['title']
    tasks: TaskType[]
    updateTodoListTitle: (todoListID: TodoListsType['id'], newTitle: TodoListsType['title']) => void
    deleteTodoList: (todolistID: TodoListsType['id']) => void
    addTask: (todoListID: TodoListsType['id'], taskTitle: TodoListsType['title']) => void
    updateTaskTitle: (todoListID: TodoListsType['id'], taskID: TaskType['id'], taskTitle: TaskType['title']) => void
    deleteTask: (todoListID: TodoListsType['id'], taskID: TaskType['id']) => void
    changeTaskStatus: (todoListID: TodoListsType['id'], taskID: TaskType['id'], newTaskStatus: TaskType['isDone']) => void
    changeTasksStatus: (todoListID: TodoListsType['id'], newFilterValue: TodoListsType['filter']) => void
    filterValue: TodoListsType['filter']
}

const TodoList = (
    {
        todoListID,
        title,
        tasks,
        updateTodoListTitle,
        deleteTodoList,
        addTask,
        updateTaskTitle,
        deleteTask,
        changeTaskStatus,
        changeTasksStatus,
        filterValue
    }: TodoListPropsType
) => {

    const addTaskHandler = (taskTitle: TaskType['title']) => {
        addTask(todoListID, taskTitle);
    }

    const updateTodoListTitleHandler = (updatedText: string) => updateTodoListTitle(todoListID, updatedText);
    const updateTaskTitleHandler = (updatedText: string, taskID: string) => updateTaskTitle(todoListID, taskID, updatedText);

    const activeButtonHandlerAll = filterValue === 'all' ? css.activeButton : '';
    const activeButtonHandlerActive = filterValue === 'active' ? css.activeButton : '';
    const activeButtonHandlerCompleted = filterValue === 'completed' ? css.activeButton : '';

    const changeTasksStatusHandlerAll = () => changeTasksStatus(todoListID, 'all');
    const changeTasksStatusHandlerActive = () => changeTasksStatus(todoListID, 'active');
    const changeTasksStatusHandlerCompleted = () => changeTasksStatus(todoListID, 'completed');

    return (
        <div className={css.todoList}>

            <div className={css.todoList__header}>
                <h2><EditableText text={title} callBack={updateTodoListTitleHandler}/></h2>
                <button onClick={() => deleteTodoList(todoListID)}>x</button>
            </div>

            <AddItem text={''} callBack={addTaskHandler}/>

            {
                tasks.length === 0
                    ? <p>List is empty.</p>
                    : <ul className={css.todoList__list}>
                        {tasks.map((task: TaskType) => (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={(e) => changeTaskStatus(todoListID, task.id, e.currentTarget.checked)}/>
                                <span><EditableText text={task.title} callBack={(updatedText: string) => updateTaskTitleHandler(updatedText, task.id)}/></span>
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