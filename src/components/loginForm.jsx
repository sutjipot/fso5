const LoginForm = ({handleLogin, username, password, setPassword, setUsername}) => {
    return <form onSubmit={handleLogin}>
        <div>
            username:
            <input type="text" value={username} placeholder="Username" name="username" onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
            password:
            <input type="password" value={password} placeholder="Password" name="password" onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
  }

export default LoginForm
