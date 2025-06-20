import './Topbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const { user, role } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        Connecté : <strong>{user}</strong> ({role})
      </div>
      <div className="topbar-right">
        <button onClick={handleLogout}>🚪 Déconnexion</button>
      </div>
    </header>
  )
}
