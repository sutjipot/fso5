import PropTypes from 'prop-types'

export const Button = (props) => {
  return (
    <button
      className={props.className}
      id={props.id}
      type={props.type}
      style={props.style}
      onClick={props.onClick}>
      {props.text}
    </button>

  )
}

export const Input = (props) => {
  return(
    <p>
      {props.text} {'   '}
      <input type={props.type} id={props.id} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.onChange} />
    </p>)
}


Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
