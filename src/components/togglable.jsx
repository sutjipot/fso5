import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from './small'
import PropTypes from 'prop-types'

export const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const buttonStyle = {
    cursor: 'pointer'
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => ({ toggleVisibility }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type='button' style={buttonStyle} onClick={toggleVisibility} text={props.buttonLabel}></Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type='button' style={buttonStyle} onClick={toggleVisibility} text="Close"></Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
