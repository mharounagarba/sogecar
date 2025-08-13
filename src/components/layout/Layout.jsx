import Sidebar from '../sidebar/Sidebar'
import Topbar from '../Topbar'
import CustomTitlebar from '../CustomTitlebar'
import UpdateManager from '../UpdateManager'
import { useEffect, useState } from 'react'
import './grid.css'
import './Layout.css'

export default function Layout({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <CustomTitlebar onToggleTheme={() => setDark(prev => !prev)} />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <Topbar />
          <div className="content-body">
            {children}
          </div>
        </main>
        <UpdateManager />
      </div>
    </>
  )
}
