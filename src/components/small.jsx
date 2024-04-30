export const Button = (props) => {
    return (
    <p>
        <button type={props.type} onClick={props.onClick}>{props.text}</button>
    </p>)
}

export const Input = (props) => {
    return(
    <p>
        {props.text} {'   '}
        <input type={props.type} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.onChange} />
    </p>)
}

