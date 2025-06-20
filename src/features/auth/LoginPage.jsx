import './LoginPage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, loginFailure } from './authSlice'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(state => state.auth.error)

  const handleLogin = async (e) => {
    e.preventDefault()
    const result = await window.api.login(username, password)

    if (result.success) {
      dispatch(loginSuccess(result.user))
      navigate('/dashboard')
    } else {
      dispatch(loginFailure(result.error))
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion à SOGECAR</h2>

        <label>Nom d'utilisateur</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="admin"
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button type="submit">Se connecter</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
