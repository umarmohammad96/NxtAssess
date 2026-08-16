import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const onSubmitSuccess = jwtToken => {
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      navigate('/', {replace: true})
    }

    const onSubmitFailure = errorMsg => {
      setShowSubmitError(true)
      setErrorMsg(errorMsg)
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) onSubmitSuccess(data.jwt_token)
    else onSubmitFailure(data.error_msg)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="background">
      <div className="login-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-login-logo-img.png"
          alt="login website logo"
          className="login-logo"
        />
        <form onSubmit={submitForm}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={event => setShowPassword(event.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button type="submit" className="button">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
