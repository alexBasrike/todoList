import {TasksType} from "../../App.tsx";
import Button from "../Button/Button.tsx";

type PropsType = {
    title: string;
    tasks: TasksType[];
}

const TodoList = (props: PropsType) => {

    const tasksList = props.tasks.map((task: TasksType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            </li>
        )
    });

    const taskListContent = tasksList.length === 0
        ? <p>Your tasks list is empty</p>
        : <ul>{tasksList}</ul>

    return (
        <div className={"todoList"}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {taskListContent}
            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </div>
        </div>
    );
};

export default TodoList;