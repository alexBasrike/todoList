import css from './FormAddTask.module.css';
import {ChangeEvent, KeyboardEvent, useState} from "react";

type FormAddTaskType = {
    addTask: (newTaskTitle: string) => void
}

const FormAddTask = ({addTask}: FormAddTaskType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [validation, setValidation] = useState<boolean>(true);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitHandler();
        } else {
            setValidation(true);
        }
    }

    const submitHandler = () => {
        if (newTaskTitle.trim() === '') {
            setValidation(false);
        }
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    return (
        <div className={css.formAddTask}>
            <input
                type={'text'}
                value={newTaskTitle}
                className={!validation ? css.notValid : ''}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={submitHandler}>+</button>
            {!validation && <div className={css.errorMessage}>This field can't be empty</div>}
        </div>
    );
};

export default FormAddTask;