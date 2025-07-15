import './CustomTitlebar.css'
import { FaWindowMinimize, FaWindowMaximize, FaWindowRestore, FaTimes, FaMoon, FaSun, FaUserCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import logo from "../assets/logex.png";

export default function CustomTitlebar({ onToggleTheme }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    window.api?.onWindowMaximized?.(() => setIsMaximized(true))
    window.api?.onWindowRestored?.(() => setIsMaximized(false))
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  }

  return (
    <div className="custom-titlebar">
      <div className="title-left">
        <img src={logo} alt="Logo eXgecar" className="title-logo" />
        {/* <div className="title">🚀 eXgecar</div> */}
      </div>

      <div className="title-right">
        <button onClick={onToggleTheme} className="icon-button" title="Changer de thème">
          {document.body.classList.contains('dark') ? <FaSun /> : <FaMoon />}
        </button>

        <div className="user-dropdown">
          <button className="icon-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaUserCircle /> <h5>{user || 'Inconnu'} </h5>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/profil">👤 Mon profil</a>
              <button onClick={handleLogout}>🚪 Déconnexion</button>
            </div>
          )}
        </div>

        <button onClick={() => window.api?.minimize()} className="icon-button" title="Réduire">
          <FaWindowMinimize />
        </button>
        <button
          onClick={() => (isMaximized ? window.api?.restore() : window.api?.maximize())}
          className="icon-button"
          title={isMaximized ? 'Restaurer' : 'Maximiser'}>
          {isMaximized ? <FaWindowRestore /> : <FaWindowMaximize />}
        </button>
        <button onClick={() => window.api?.close()} className="icon-button close">
          <FaTimes />
        </button>
      </div>
    </div>
  )
}
