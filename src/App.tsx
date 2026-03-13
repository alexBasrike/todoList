import './index.css'
import './App.css'
import TodoList from "./components/TodoList/TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";
import AddItem from "./components/AddItem/AddItem.tsx";

export type TodoListsFilterType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: TodoListsFilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type InitialTasksType = {
    [key: TodoListsType['id']]: TaskType[]
}

function App() {

    const todoListOne: TodoListsType['id'] = v1();
    const todoListTwo: TodoListsType['id'] = v1();

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListOne, title: 'What to learn', filter: 'all'},
        {id: todoListTwo, title: 'What to buy', filter: 'all'},
    ]);

    const [initialTasks, setInitialTasks] = useState<InitialTasksType>({
        [todoListOne]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListTwo]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Sugar', isDone: false},
            {id: v1(), title: 'Banana', isDone: true},
        ],
    });

    const updateTodoListTitle = (todoListID: TodoListsType['id'], newTitle: TodoListsType['title']) => {
        setTodoLists(prevState => prevState.map(todoList => todoList.id === todoListID ? {...todoList, title: newTitle} : todoList));
    }

    const addTodoList = (todoListTitle: TodoListsType['title']) => {
        const newTodoList: TodoListsType = {id: v1(), title: todoListTitle, filter: 'all'};
        setTodoLists([newTodoList, ...todoLists]);
        setInitialTasks({...initialTasks, [newTodoList.id]: []});
    }

    const deleteTodoList = (todolistID: TodoListsType['id']) => {
        setTodoLists(prevState => prevState.filter(todoList => todoList.id !== todolistID));
        delete initialTasks[todolistID];
    }

    const addTask = (todoListID: TodoListsType['id'], taskTitle: TaskType['title']) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        setInitialTasks({...initialTasks, [todoListID]: [newTask, ...initialTasks[todoListID]]});
    }

    const updateTaskTitle = (todoListID: TodoListsType['id'], taskID: TaskType['id'], newTaskTitle: TaskType['title']) => {
        setInitialTasks(prevState => ({...prevState, [todoListID]: prevState[todoListID].map(task => task.id === taskID ? {...task, title: newTaskTitle} : task)}));
    }

    const deleteTask = (todoListID: TodoListsType['id'], taskID: TaskType['id']) => {
        setInitialTasks({...initialTasks, [todoListID]: initialTasks[todoListID].filter(task => task.id !== taskID)});
    }

    const changeTaskStatus = (todoListID: TodoListsType['id'], taskID: TaskType['id'], newTaskStatus: TaskType['isDone']) => {
        setInitialTasks({
            ...initialTasks,
            [todoListID]: initialTasks[todoListID].map(task => task.id === taskID ? {
                ...task,
                isDone: newTaskStatus
            } : task)
        });
    }

    const changeTasksStatus = (todoListID: TodoListsType['id'], newFilterValue: TodoListsType['filter']) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todoListID ? {
            ...todoList,
            filter: newFilterValue
        } : todoList));
    }

    return (
        <div className="app">

            <div className={'addTodoList'}>
                <h2>Add new TodoList</h2>
                <AddItem text={''} callBack={addTodoList}/>
            </div>

            <div className="todoLists">
                {todoLists.map(todoItem => {

                    let tasks: TaskType[] = initialTasks[todoItem.id];
                    if (todoItem.filter === 'active') {
                        tasks = initialTasks[todoItem.id].filter(task => !task.isDone);
                    }
                    if (todoItem.filter === 'completed') {
                        tasks = initialTasks[todoItem.id].filter(task => task.isDone);
                    }

                    return (
                        <TodoList
                            key={todoItem.id}
                            todoListID={todoItem.id}
                            title={todoItem.title}
                            updateTodoListTitle={updateTodoListTitle}
                            deleteTodoList={deleteTodoList}
                            tasks={tasks}
                            addTask={addTask}
                            updateTaskTitle={updateTaskTitle}
                            deleteTask={deleteTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTasksStatus={changeTasksStatus}
                            filterValue={todoItem.filter}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default App
