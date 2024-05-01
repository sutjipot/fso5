export const Button = (props) => {
    return (
        <button className={props.className} type={props.type} style={props.style} onClick={props.onClick}>{props.text}</button>
        
)
}

export const Input = (props) => {
    return(
    <p>
        {props.text} {'   '}
        <input type={props.type} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.onChange} />
    </p>)
}

