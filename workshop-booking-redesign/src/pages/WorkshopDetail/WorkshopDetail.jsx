import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiMapPin, FiUsers, FiClock, FiTag } from 'react-icons/fi'
import BookingForm from '../../components/BookingForm/BookingForm'
import { useWorkshops } from '../../context/WorkshopContext'
import { formatDate } from '../../utils/mockData'
import styles from './WorkshopDetail.module.css'

export default function WorkshopDetail() {
  const { id }                = useParams()
  const { getById, loading }  = useWorkshops()
  const workshop              = getById(id)

  if (loading) return <div className="spinner" role="status" aria-label="Loading workshop…" style={{ marginTop: '4rem' }} />

  if (!workshop) {
    return (
      <div className={styles.notFound}>
        <h2>Workshop not found</h2>
        <p>This workshop may have ended or the link is incorrect.</p>
        <Link to="/workshops" className={styles.backLink}>
          <FiArrowLeft aria-hidden="true" /> Back to Workshops
        </Link>
      </div>
    )
  }

  const { title, category, description, date, duration, location, seats, instructor, level, tags } = workshop
  const isFull     = seats?.available === 0
  const isLowStock = seats?.available > 0 && seats?.available <= 5

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <ol>
            <li><Link to="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/workshops">Workshops</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>

        <div className={styles.layout}>
          {/* Main content */}
          <main className={styles.main}>
            <span className={styles.category}>{category}</span>
            <h1 className={styles.title}>{title}</h1>

            {/* Meta grid */}
            <ul className={styles.metaGrid} aria-label="Workshop details">
              <li className={styles.metaItem}>
                <FiCalendar aria-hidden="true" />
                <div>
                  <span className={styles.metaLabel}>Date</span>
                  <time dateTime={date} className={styles.metaValue}>{formatDate(date)}</time>
                </div>
              </li>
              <li className={styles.metaItem}>
                <FiClock aria-hidden="true" />
                <div>
                  <span className={styles.metaLabel}>Duration</span>
                  <span className={styles.metaValue}>{duration}</span>
                </div>
              </li>
              <li className={styles.metaItem}>
                <FiMapPin aria-hidden="true" />
                <div>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>{location}</span>
                </div>
              </li>
              <li className={styles.metaItem}>
                <FiUsers aria-hidden="true" />
                <div>
                  <span className={styles.metaLabel}>Seats</span>
                  <span className={`${styles.metaValue} ${isFull ? styles.textError : isLowStock ? styles.textWarning : ''}`}>
                    {isFull ? 'No seats available' : `${seats.available} / ${seats.total} remaining`}
                  </span>
                </div>
              </li>
            </ul>

            {/* Description */}
            <section aria-labelledby="about-heading" className={styles.section}>
              <h2 id="about-heading" className={styles.sectionTitle}>About This Workshop</h2>
              <p className={styles.description}>{description}</p>
            </section>

            {/* Instructor */}
            <section aria-labelledby="instructor-heading" className={styles.section}>
              <h2 id="instructor-heading" className={styles.sectionTitle}>Instructor</h2>
              <div className={styles.instructor}>
                <div className={styles.instructorAvatar} aria-hidden="true">
                  {instructor?.charAt(0) ?? 'I'}
                </div>
                <div>
                  <p className={styles.instructorName}>{instructor}</p>
                  <p className={styles.instructorRole}>FOSSEE Faculty</p>
                </div>
              </div>
            </section>

            {/* Tags */}
            {tags && (
              <div className={styles.tags} aria-label="Workshop topics">
                <FiTag aria-hidden="true" />
                {tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className={styles.sidebar} aria-label="Booking sidebar">
            <div className={styles.levelBadge} data-level={level?.toLowerCase()}>
              {level} Level
            </div>
            <BookingForm workshopId={id} workshopTitle={title} />
          </aside>
        </div>
      </div>
    </div>
  )
}
