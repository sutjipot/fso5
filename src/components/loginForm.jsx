import { useState } from 'react'
import { Button, Input } from './small'
import PropTypes from 'prop-types'

export const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // handle credential change
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  // button style
  const buttonStyle = {
    cursor: 'pointer'
  }

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
        <Button style={buttonStyle} type="submit" text="Login" />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
