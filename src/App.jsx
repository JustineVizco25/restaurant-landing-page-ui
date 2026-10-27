import { useEffect } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Hero from './components/hero.jsx'
import Navbar from './components/navbar.jsx'
import Menu from './components/menu.jsx'
import FineDining from './components/finedining.jsx'
import AboutUs from './components/about.jsx'
import Contacts from './components/contacts.jsx'
import Reservation from './components/reservation.jsx'

function App() {
  const { pathname } = useLocation()
  const hideNavbar = ['/reservation', '/order'].includes(pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="main-container app-layout">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<main className="main-container landing-page"><Hero /></main>} />
        <Route path="/menu/:category?" element={<main className="main-container"><Menu /></main>} />
        <Route path="/fine-dining" element={<main className="main-container"><FineDining /></main>} />
        <Route path="/about-us" element={<main className="main-container"><AboutUs /></main>} />
        <Route path="/contacts" element={<main className="main-container"><Contacts /></main>} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/order" element={<Reservation />} />
        <Route path="/preview" element={<Navigate to="/reservation" replace />} />
        <Route path="*" element={
          <main className="not-found-page">
            <p>404</p>
            <h1>That page isn't on the menu.</h1>
            <p>Find your way back to Dmr Sushi.</p>
            <Link to="/" className="go-to-menu-btn">BACK TO RESTAURANT →</Link>
          </main>
        } />
      </Routes>
    </div>
  )
}

export default App
