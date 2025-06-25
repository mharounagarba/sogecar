
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
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
import BeneficiairesPage from './features/beneficiaires/BeneficiairesPage.jsx'
import ClientsPage from './features/clients/ClientsPage.jsx'
import ClientAssuresPage from './features/clients/ClientAssuresPage.jsx'
import CentresPage from './features/centres/CentresPage.jsx'
import AssurancesPage from './features/assurances/AssurancesPage.jsx'

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <App />
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
            path="/beneficiaire"
            element={
              <PrivateRoute>
                <BeneficiairesPage />
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
          <Route path="/assurances" element={<AssurancesPage />} />
          <Route path="/centres" element={<CentresPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:id" element={<ClientAssuresPage />} />

          {/* <Route path="/fiche/:matricule" element={<FicheAssureWrapper />} /> */}
        </Routes>
      </HashRouter>
    </Provider>

)
