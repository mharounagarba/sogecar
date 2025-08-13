import './LoginPage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, loginFailure } from './authSlice'
import logo from '../../assets/logex.png'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

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
        <img src={logo} alt="Logo eXgecar" className="login-logo" />
        <h2>Connexion</h2>

        <div className={`form-group ${username && 'filled'}`}>
          <label>Nom d'utilisateur</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={`form-group ${password && 'filled'}`}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login">🔐 Se connecter</button>
         <button onClick={() => window.api.close()} className="exit-btn">
  Fermer
</button>
{error && (
  <p className={`error ${error ? 'shake' : ''}`}>
    <HiOutlineExclamationCircle style={{ marginRight: '6px', verticalAlign: 'middle' }} />
    {error}
  </p>
)}

      </form>
    </div>
  )
}
