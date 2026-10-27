import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navBarLogo from '../assets/branding/logo 1.png'

export default function Navbar() {
  const { pathname } = useLocation()
  const navbarRef = useRef(null)

  useLayoutEffect(() => {
    const navbar = navbarRef.current
    const updateHeight = () => {
      document.documentElement.style.setProperty('--navbar-height', `${navbar.getBoundingClientRect().height}px`)
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(navbar)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--navbar-height')
    }
  }, [])

  useEffect(() => {
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const navigateToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <nav ref={navbarRef} className={`navbar${pathname === '/' ? ' navbar--transparent' : ''}`} aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link" aria-label="Dmr Sushi home" draggable={false}>
          <img src={navBarLogo} className="navbar-logo-image" alt="Dmr Sushi" width="82" height="82" draggable={false} />
        </Link>
        <div className="navbar-text-links">
          <Link to="/menu" onClick = {navigateToTop}>Menu</Link>
          <Link to="/fine-dining" onClick = {navigateToTop}>Fine Dining</Link>
          <Link to="/about-us" onClick = {navigateToTop} >About</Link>
          <Link to="/contacts" onClick = {navigateToTop}>Contact</Link>
        </div>
        <div className="reservation-btn-container">
          <Link to="/reservation" className="reservation-btn" onClick={navigateToTop}>RESERVATION ───</Link>
        </div>
      </div>
    </nav>
  )
}
