import Sidebar from './Sidebar'
import Topbar from './Topbar'
import './Layout.css'
import UpdateManager from './UpdateManager'

export default function Layout({ children }) {
  return (
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
  )
}
