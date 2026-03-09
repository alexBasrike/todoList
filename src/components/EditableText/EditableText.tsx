import {ChangeEvent, KeyboardEvent, useState} from "react";
import css from './EditableText.module.css';

type Props = {
    text: string
    callBack: (updatedText: string) => void
}

const EditableText = ({text, callBack}: Props) => {

    const [editableMode, setEditableMode] = useState<boolean>(false);
    const [newText, setNewText] = useState<string>(text);

    const editModeOn = () => setEditableMode(true);
    const editModeOff = () => setEditableMode(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewText(e.target.value);

    const callBackHandler = () => {
        callBack(newText);
        editModeOff();
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callBackHandler();
        }
    }

    return (
        editableMode
            ? <input
                type={'text'}
                value={newText}
                className={css.editableText}
                autoFocus={true}
                onChange={onChangeHandler}
                onBlur={callBackHandler}
                onKeyDown={onKeyDownHandler}
            />
            : <span className={css.editableText} onDoubleClick={editModeOn}>{text}</span>
    );
};

export default EditableText;