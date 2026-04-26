import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight, FiClock } from 'react-icons/fi'
import styles from './WorkshopCard.module.css'

/**
 * WorkshopCard
 * Props:
 *  - workshop: { id, title, category, description, date, location, seats, duration, image }
 *  - featured: boolean (larger card variant)
 */
export default function WorkshopCard({ workshop, featured = false }) {
  const {
    id,
    title,
    category,
    description,
    date,
    location,
    seats,
    duration,
    image,
  } = workshop

  const spotsLeft  = seats?.available ?? 0
  const isLowStock = spotsLeft > 0 && spotsLeft <= 5
  const isFull     = spotsLeft === 0

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      aria-label={`Workshop: ${title}`}
    >
      {/* Image */}
      <div className={styles.imageWrapper}>
        {image ? (
          <img
            src={image}
            alt={`${title} workshop`}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span>{category?.charAt(0) ?? 'W'}</span>
          </div>
        )}
        <span className={styles.category}>{category}</span>
        {isFull && (
          <span className={`${styles.badge} ${styles.badgeFull}`} aria-label="Workshop is full">
            Full
          </span>
        )}
        {isLowStock && (
          <span className={`${styles.badge} ${styles.badgeLow}`} aria-label={`Only ${spotsLeft} spots left`}>
            {spotsLeft} left
          </span>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {featured && (
          <p className={styles.description}>{description}</p>
        )}

        <ul className={styles.meta} aria-label="Workshop details">
          <li className={styles.metaItem}>
            <FiCalendar aria-hidden="true" className={styles.metaIcon} />
            <time dateTime={date}>{formatDate(date)}</time>
          </li>
          <li className={styles.metaItem}>
            <FiClock aria-hidden="true" className={styles.metaIcon} />
            <span>{duration}</span>
          </li>
          <li className={styles.metaItem}>
            <FiMapPin aria-hidden="true" className={styles.metaIcon} />
            <span>{location}</span>
          </li>
          <li className={styles.metaItem}>
            <FiUsers aria-hidden="true" className={styles.metaIcon} />
            <span>{isFull ? 'No seats available' : `${spotsLeft} seats left`}</span>
          </li>
        </ul>

        <Link
          to={`/workshops/${id}`}
          className={`${styles.cta} ${isFull ? styles.ctaDisabled : ''}`}
          aria-disabled={isFull}
          tabIndex={isFull ? -1 : 0}
          aria-label={isFull ? `${title} – Workshop full` : `View details for ${title}`}
        >
          {isFull ? 'Workshop Full' : 'View Details'}
          {!isFull && <FiArrowRight aria-hidden="true" className={styles.ctaIcon} />}
        </Link>
      </div>
    </article>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return 'TBA'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
