type ButtonProps = {
    text: string;
    callBack: () => void;
}

const Button = ({text, callBack}: ButtonProps) => {
    return (
        <button onClick={callBack}>{text}</button>
    )
}

export default Button;