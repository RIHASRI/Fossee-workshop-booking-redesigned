import React from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiGithub, FiExternalLink } from 'react-icons/fi'
import styles from './Footer.module.css'

const LINKS = {
  platform: [
    { label: 'Browse Workshops', to: '/workshops' },
    { label: 'My Profile',       to: '/profile' },
    { label: 'About FOSSEE',     href: 'https://fossee.in', external: true },
  ],
  resources: [
    { label: 'Source Code',   href: 'https://github.com/FOSSEE/workshop_booking', external: true },
    { label: 'Report an Issue', href: 'https://github.com/FOSSEE/workshop_booking/issues', external: true },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand column */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label="FOSSEE Workshops – Home">
            <span className={styles.logoMark}>F</span>
            <span>OSSEE Workshops</span>
          </Link>
          <p className={styles.tagline}>
            Free and Open Source Software for Education — empowering learners across India.
          </p>
          <a
            href="mailto:pythonsupport@fossee.in"
            className={styles.mailLink}
            aria-label="Email FOSSEE Python support"
          >
            <FiMail aria-hidden="true" />
            pythonsupport@fossee.in
          </a>
        </div>

        {/* Nav columns */}
        <nav className={styles.linkColumns} aria-label="Footer navigation">
          <div className={styles.linkGroup}>
            <h3 className={styles.linkHeading}>Platform</h3>
            <ul role="list">
              {LINKS.platform.map(l => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                      {l.label}
                      <FiExternalLink aria-label="(opens in new tab)" size={12} />
                    </a>
                  ) : (
                    <Link to={l.to} className={styles.link}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h3 className={styles.linkHeading}>Resources</h3>
            <ul role="list">
              {LINKS.resources.map(l => (
                <li key={l.label}>
                  <a href={l.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {l.label}
                    <FiExternalLink aria-label="(opens in new tab)" size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {year} FOSSEE, IIT Bombay. UI redesign for the FOSSEE Python Screening Task.
        </p>
        <a
          href="https://github.com/FOSSEE/workshop_booking"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub (opens in new tab)"
        >
          <FiGithub aria-hidden="true" />
          View Source
        </a>
      </div>
    </footer>
  )
}
