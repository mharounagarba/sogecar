
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


import BeneficiairesPage from './features/beneficiaires/BeneficiairesPage.jsx'
import ClientsPage from './features/clients/ClientsPage.jsx'
import ClientAssuresPage from './features/clients/ClientAssuresPage.jsx'
import CentresPage from './features/centres/CentresPage.jsx'

import AssurancesList from './pages/assurances/AssurancesList.jsx'
import AssuranceForm from './pages/assurances/AssuranceForm.jsx'
import ActesList from './pages/actes/ActesList.jsx'
import ActeForm from './pages/actes/ActeForm.jsx'
import AssuresList from './pages/assures/AssuresList.jsx'
import AssureForm from './pages/assures/AssureForm.jsx'
import BeneficiairesList from './pages/beneficiaires/BeneficiairesList.jsx'
import BeneficiaireForm from './pages/beneficiaires/beneficiaireForm.jsx'
import CentresList from './pages/centres/CentresList.jsx'
import CentreForm from './pages/centres/CentreForm.jsx'
import ClientsList from './pages/clients/ClientsList.jsx'
import ClientForm from './pages/clients/ClientForm.jsx'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <HashRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginPage />} />
        {/* Statistiques */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        {/* Assurances pages */}
        <Route path="/assurances" element={<AssurancesList />} />
        <Route path="/assurances/add" element={<AssuranceForm mode="add" />} />
        <Route path="/assurances/:id/update" element={<AssuranceForm mode="edit" />} />

        {/* Actes pages */}
        <Route path="/actes" element={<ActesList />} />
        <Route path="/actes/add" element={<ActeForm mode="add" />} />
        <Route path="/actes/:id/update" element={<ActeForm mode="edit" />} />

        {/* Actes assures */}
        <Route path="/assures" element={<AssuresList />} />
        <Route path="/assures/add" element={<AssureForm mode="add" />} />
        <Route path="/assures/:id/update" element={<AssureForm mode="edit" />} />

        {/* Actes beneficiaires */}
        <Route path="/beneficiaires" element={<BeneficiairesList />} />
        <Route path="/beneficiaires/add" element={<BeneficiaireForm mode="add" />} />
        <Route path="/beneficiaires/:id/update" element={<BeneficiaireForm mode="edit" />} />

        {/* Actes centres */}
        <Route path="/centres" element={<CentresList />} />
        <Route path="/centres/add" element={<CentreForm mode="add" />} />
        <Route path="/centres/:id/update" element={<CentreForm mode="edit" />} />

        {/* Actes clients */}
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/clients/add" element={<ClientForm mode="add" />} />
        <Route path="/clients/:id/update" element={<ClientForm mode="edit" />} />

        <Route
          path="/actesOld"
          element={
            <PrivateRoute>
              <ActesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/assuresOld"
          element={
            <PrivateRoute>
              <AssuresPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/beneficiairesOld"
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
        <Route path="/centresOld" element={<CentresPage />} />
        <Route path="/clientsOld" element={<ClientsPage />} />
        <Route path="/clientsOld/:id" element={<ClientAssuresPage />} />

        {/* Assurances pages */}
        {/* <Route path="/assurance" element={<AssurancesPage />} />
  <Route path="/assurance/add" element={<AssuranceFormPage mode="add" />} />
  <Route path="/assurance/:id/update" element={<AssuranceFormPage mode="edit" />} /> */}

        {/* <Route path="/fiche/:matricule" element={<FicheAssureWrapper />} /> */}
      </Routes>
    </HashRouter>
  </Provider>

)
