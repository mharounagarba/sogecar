import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store.js'
import LoginPage from './features/auth/LoginPage.jsx'
import App from './App.jsx'
import ActesPage from './features/actes/ActesPage.jsx'
import AssuresPage from './features/assures/AssuresPage.jsx'
import CreateUser from './features/auth/CreateUser.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
// import FicheAssureWrapper from './components/FicheAssureWrapper.jsx'


import './assets/styles/reset.css';
import './assets/styles/variables.css';
import './assets/styles/layout.css';
import './assets/styles/components/button.css';
import './assets/styles/components/card.css';
import './assets/styles/components/form.css';
import './assets/styles/components/dashboard.css';

createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <App/>
              </PrivateRoute>
            }
          />
          <Route
            path="/actes"
            element={
              <PrivateRoute>
                <ActesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/assures"
            element={
              <PrivateRoute>
                <AssuresPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/utilisateurs"
            element={
              <PrivateRoute>
                <CreateUser />
              </PrivateRoute>
            }
          />
        {/* <Route path="/fiche/:matricule" element={<FicheAssureWrapper/>} /> */}
        </Routes>

      </BrowserRouter>
    </Provider>
 
)
