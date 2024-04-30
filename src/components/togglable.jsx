import { useState, useImperativeHandle, forwardRef } from "react"
import { Button } from "./small"

export const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => ({ toggleVisibility }))

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility} text={props.buttonLabel}></Button>
            </div>
            <div style={showWhenVisible}> 
                {props.children}
                <Button onClick={toggleVisibility} text="Close"></Button>
            </div>
        </div>
    )
})

export default Togglable
