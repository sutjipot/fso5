import { useState } from 'react'
import { Button, Input } from './small'

export const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // handle credential change
    const handleUsernameChange = (event) => setUsername(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)

    // the login function
    const loginUser = (event) => {
        event.preventDefault()

        handleLogin({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2> Log in </h2>
            <form onSubmit={loginUser}>
                <Input text="Username" type="text" placeholder="Username" value={username} name="username" onChange={handleUsernameChange} />
                <Input text="Password" type="password" placeholder="Password" value={password} name="password" onChange={handlePasswordChange} />
                <br />
                <Button type="submit" text="Login" />
            </form>
        </div>  
    )
}

export default LoginForm
