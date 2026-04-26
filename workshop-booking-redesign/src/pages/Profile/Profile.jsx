import React from 'react'
import { FiUser, FiMail, FiCalendar, FiBook, FiLogIn } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import styles from './Profile.module.css'

const MOCK_BOOKINGS = [
  { id: 'b1', title: 'Python for Scientific Computing', date: '2025-08-15', status: 'confirmed' },
  { id: 'b2', title: 'Introduction to Scilab',          date: '2025-09-02', status: 'pending'   },
]

export default function Profile() {
  const { user, login, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className={styles.guestState}>
        <div className={styles.guestCard}>
          <FiUser className={styles.guestIcon} aria-hidden="true" />
          <h1 className={styles.guestTitle}>Sign in to view your profile</h1>
          <p className={styles.guestSub}>
            Log in to track your workshop registrations and manage your bookings.
          </p>
          <button
            className={styles.loginBtn}
            onClick={() => login({ name: 'Demo User', email: 'demo@fossee.in' })}
          >
            <FiLogIn aria-hidden="true" /> Sign In (Demo)
          </button>
          <p className={styles.guestHint}>
            This is a demo — clicking "Sign In" simulates a logged-in user.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>My Profile</h1>

        <div className={styles.layout}>
          {/* Profile Card */}
          <aside className={styles.profileCard} aria-label="User information">
            <div className={styles.avatar} aria-hidden="true">
              {user.name.charAt(0)}
            </div>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>
              <FiMail aria-hidden="true" /> {user.email}
            </p>
            <button className={styles.logoutBtn} onClick={logout}>
              Sign Out
            </button>
          </aside>

          {/* Bookings */}
          <main>
            <h2 className={styles.sectionTitle}>
              <FiBook aria-hidden="true" /> My Registrations
            </h2>

            {MOCK_BOOKINGS.length === 0 ? (
              <p className={styles.empty}>You haven't registered for any workshops yet.</p>
            ) : (
              <ul className={styles.bookingsList} role="list">
                {MOCK_BOOKINGS.map(b => (
                  <li key={b.id} className={styles.bookingItem}>
                    <div className={styles.bookingInfo}>
                      <p className={styles.bookingTitle}>{b.title}</p>
                      <p className={styles.bookingDate}>
                        <FiCalendar aria-hidden="true" />
                        <time dateTime={b.date}>
                          {new Date(b.date).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </time>
                      </p>
                    </div>
                    <span
                      className={`${styles.statusBadge} ${styles[b.status]}`}
                      aria-label={`Status: ${b.status}`}
                    >
                      {b.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
