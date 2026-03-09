import {ChangeEvent, KeyboardEvent, useState} from "react";
import css from './AddItem.module.css';

type AddItemPropsType = {
    text: string
    callBack: (inputValue: string) => void
}

const AddItem = ({text, callBack}: AddItemPropsType) => {

    const [inputValue, setInputValue] = useState(text);

    const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const addItemHandler = () => {
        callBack(inputValue);
        setInputValue('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div className={css.addItem}>
            <input
                value={inputValue}
                onChange={inputValueHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={addItemHandler}>+</button>
        </div>
    );
};

export default AddItem;