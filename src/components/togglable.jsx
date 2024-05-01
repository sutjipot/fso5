import { useState, useImperativeHandle, forwardRef } from "react"
import { Button } from "./small"

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
                <Button style={buttonStyle} onClick={toggleVisibility} text={props.buttonLabel}></Button>
            </div>
            <div style={showWhenVisible}> 
                {props.children}
                <Button style={buttonStyle} onClick={toggleVisibility} text="Close"></Button>
            </div>
        </div>
    )
})

export default Togglable
