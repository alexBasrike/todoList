import css from './FormAddTask.module.css';

const FormAddTask = () => {
    return (
        <form className={css.formAddTask}>
            <input type={'text'}/>
            <button>+</button>
        </form>
    );
};

export default FormAddTask;