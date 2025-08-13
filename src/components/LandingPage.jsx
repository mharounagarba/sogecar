import './LandingPage.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  return (
    <div className="landing">
      <header className="landing-header" data-aos="fade-down">
        <img src="assets/logo.svg" alt="eXgecar Logo" className="logo" />
        <h1>eXgecar</h1>
        <p>Expert en Courtage, Assurance & Réassurance</p>
        <button onClick={() => navigate('/login')}>🚀 Accéder à l'app</button>
      </header>

      <section className="features">
        <div data-aos="fade-up">
          <h2>📊 Dashboard Intuitif</h2>
          <p>Visualisez les actes, les PEC, et les alertes en temps réel.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <h2>🧍 Gestion complète</h2>
          <p>Assurés, bénéficiaires, centres, clients, et plus encore.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <h2>🧠 Synchronisation</h2>
          <p>Sauvegarde sécurisée et intégration future vers d'autres systèmes.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <h2>📦 Exports</h2>
          <p>Export PDF, Excel, impression directe, et statistiques avancées.</p>
        </div>
      </section>

      <footer className="landing-footer" data-aos="fade-up">
        <p>© {new Date().getFullYear()} eXgecar — Une solution 3S Consulting</p>
      </footer>
    </div>
  )
}
