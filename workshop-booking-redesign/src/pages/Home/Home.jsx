import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiUsers, FiBook, FiAward, FiCalendar } from 'react-icons/fi'
import WorkshopCard from '../../components/WorkshopCard/WorkshopCard'
import { useWorkshops } from '../../context/WorkshopContext'
import styles from './Home.module.css'

const STATS = [
  { icon: <FiBook />,   value: '50+',    label: 'Workshops Hosted' },
  { icon: <FiUsers />,  value: '10,000+',label: 'Students Trained' },
  { icon: <FiAward />,  value: '25+',    label: 'Expert Instructors' },
  { icon: <FiCalendar />,value: 'Free',  label: 'Always Free' },
]

export default function Home() {
  const { workshops, loading } = useWorkshops()
  const featured = workshops.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>FOSSEE, IIT Bombay</span>
            <h1 id="hero-heading" className={styles.heroTitle}>
              Learn. Build. <br />
              <span className={styles.heroAccent}>Grow with FOSS.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Free hands-on workshops on Python, Scilab, Django, CFD, and more —
              taught by experts from IITs and NITs, open to all students across India.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/workshops" className={styles.ctaPrimary}>
                Browse Workshops <FiArrowRight aria-hidden="true" />
              </Link>
              <a
                href="https://fossee.in"
                className={styles.ctaSecondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                About FOSSEE
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <span className={styles.heroCardDot} style={{ background: '#ff5f57' }} />
                <span className={styles.heroCardDot} style={{ background: '#febc2e' }} />
                <span className={styles.heroCardDot} style={{ background: '#28c840' }} />
              </div>
              <pre className={styles.heroCode}>{`# FOSSEE Workshop
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title('Hello, FOSSEE!')
plt.show()`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats} aria-label="Platform statistics">
        <div className="container">
          <ul className={styles.statsGrid} role="list">
            {STATS.map(s => (
              <li key={s.label} className={styles.statItem}>
                <span className={styles.statIcon} aria-hidden="true">{s.icon}</span>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Workshops */}
      <section className={styles.featured} aria-labelledby="featured-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="featured-heading" className={styles.sectionTitle}>Upcoming Workshops</h2>
            <Link to="/workshops" className={styles.viewAll}>
              View all <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          {loading ? (
            <div className="spinner" role="status" aria-label="Loading workshops…" />
          ) : (
            <div className={styles.workshopGrid}>
              {featured.map(w => (
                <WorkshopCard key={w.id} workshop={w} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner} aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading" className={styles.ctaBannerTitle}>
            Ready to start learning?
          </h2>
          <p className={styles.ctaBannerSub}>
            All workshops are completely free. Just show up ready to learn.
          </p>
          <Link to="/workshops" className={styles.ctaBannerBtn}>
            Find Your Workshop <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
