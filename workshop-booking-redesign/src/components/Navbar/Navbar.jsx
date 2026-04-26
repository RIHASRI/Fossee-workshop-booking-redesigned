import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiCalendar, FiHome, FiBook } from 'react-icons/fi'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/',          label: 'Home',      icon: <FiHome /> },
  { to: '/workshops', label: 'Workshops', icon: <FiBook /> },
  { to: '/profile',   label: 'My Profile',icon: <FiUser /> },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const menuRef                   = useRef(null)
  const location                  = useLocation()

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Trap focus when menu open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else          document.body.style.overflow = ''
    return ()  => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={styles.nav} ref={menuRef} aria-label="Main navigation">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="FOSSEE Workshops – Home">
            <span className={styles.logoMark}>F</span>
            <span className={styles.logoText}>OSSEE <span>Workshops</span></span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.desktopLinks} role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  end={to === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link to="/workshops" className={styles.ctaBtn} aria-label="Book a workshop">
            <FiCalendar aria-hidden="true" />
            Book Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
          aria-hidden={!menuOpen}
        >
          <ul role="list">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.active : ''}`
                  }
                  end={to === '/'}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className={styles.mobileIcon} aria-hidden="true">{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/workshops"
            className={styles.mobileCta}
            tabIndex={menuOpen ? 0 : -1}
          >
            <FiCalendar aria-hidden="true" /> Book a Workshop
          </Link>
        </div>
      </nav>
    </header>
  )
}
