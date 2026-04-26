import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { WorkshopProvider } from './context/WorkshopContext'
import { AuthProvider } from './context/AuthContext'

// Route-level code splitting
const Home           = lazy(() => import('./pages/Home/Home'))
const Workshops      = lazy(() => import('./pages/Workshops/Workshops'))
const WorkshopDetail = lazy(() => import('./pages/WorkshopDetail/WorkshopDetail'))
const Profile        = lazy(() => import('./pages/Profile/Profile'))

function LoadingFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" role="status" aria-label="Loading page..." />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <WorkshopProvider>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/"                  element={<Home />} />
              <Route path="/workshops"         element={<Workshops />} />
              <Route path="/workshops/:id"     element={<WorkshopDetail />} />
              <Route path="/profile"           element={<Profile />} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </WorkshopProvider>
    </AuthProvider>
  )
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-primary)' }}>
        404
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>
        This page doesn't exist. <a href="/">Go home →</a>
      </p>
    </div>
  )
}
