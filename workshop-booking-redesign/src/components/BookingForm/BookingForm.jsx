import React, { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiBook, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import styles from './BookingForm.module.css'

const INITIAL_STATE = {
  name:         '',
  email:        '',
  phone:        '',
  organization: '',
  experience:   'beginner',
  message:      '',
}

const ERRORS_INITIAL = {}

export default function BookingForm({ workshopId, workshopTitle, onSuccess }) {
  const [form,     setForm]     = useState(INITIAL_STATE)
  const [errors,   setErrors]   = useState(ERRORS_INITIAL)
  const [status,   setStatus]   = useState('idle') // idle | loading | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim())               e.name  = 'Full name is required.'
    if (!form.email.trim())              e.email = 'Email address is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, '')))
                                         e.phone = 'Enter a valid 10-digit phone number.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first error field
      const firstKey = Object.keys(validationErrors)[0]
      document.getElementById(`field-${firstKey}`)?.focus()
      return
    }

    setStatus('loading')
    try {
      // Replace with actual API call
      await fakeApiCall({ ...form, workshopId })
      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successState} role="alert" aria-live="polite">
        <FiCheckCircle className={styles.successIcon} aria-hidden="true" />
        <h3>Booking Confirmed!</h3>
        <p>
          You're registered for <strong>{workshopTitle}</strong>. A confirmation
          has been sent to <strong>{form.email}</strong>.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => { setForm(INITIAL_STATE); setStatus('idle') }}
        >
          Book another workshop
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      aria-label={`Booking form for ${workshopTitle}`}
      noValidate
    >
      <h2 className={styles.formTitle}>Register for this Workshop</h2>

      {status === 'error' && (
        <div className={styles.globalError} role="alert" aria-live="assertive">
          <FiAlertCircle aria-hidden="true" />
          Something went wrong. Please try again.
        </div>
      )}

      {/* Name */}
      <FormField
        id="field-name"
        label="Full Name"
        required
        icon={<FiUser />}
        error={errors.name}
      >
        <input
          id="field-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Priya Sharma"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'error-name' : undefined}
          className={errors.name ? styles.inputError : ''}
        />
      </FormField>

      {/* Email */}
      <FormField
        id="field-email"
        label="Email Address"
        required
        icon={<FiMail />}
        error={errors.email}
        errorId="error-email"
      >
        <input
          id="field-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'error-email' : undefined}
          className={errors.email ? styles.inputError : ''}
        />
      </FormField>

      {/* Phone */}
      <FormField
        id="field-phone"
        label="Phone Number"
        icon={<FiPhone />}
        error={errors.phone}
        hint="Optional. 10-digit mobile number."
      >
        <input
          id="field-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="9876543210"
          autoComplete="tel"
          inputMode="numeric"
          aria-invalid={!!errors.phone}
        />
      </FormField>

      {/* Organization */}
      <FormField
        id="field-organization"
        label="College / Organization"
        icon={<FiBook />}
      >
        <input
          id="field-organization"
          name="organization"
          type="text"
          value={form.organization}
          onChange={handleChange}
          placeholder="e.g. IIT Bombay"
          autoComplete="organization"
        />
      </FormField>

      {/* Experience Level */}
      <div className={styles.fieldGroup}>
        <label htmlFor="field-experience" className={styles.label}>
          Experience Level
        </label>
        <select
          id="field-experience"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="beginner">Beginner – just starting out</option>
          <option value="intermediate">Intermediate – some experience</option>
          <option value="advanced">Advanced – comfortable with the basics</option>
        </select>
      </div>

      {/* Message */}
      <div className={styles.fieldGroup}>
        <label htmlFor="field-message" className={styles.label}>
          Anything you'd like us to know? <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Questions, accessibility needs, learning goals..."
          className={styles.textarea}
        />
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <span className={styles.btnSpinner} aria-hidden="true" />
            Submitting…
          </>
        ) : (
          'Confirm Registration'
        )}
      </button>
    </form>
  )
}

/* Sub-component: reusable form field wrapper */
function FormField({ id, label, required, icon, error, errorId, hint, children }) {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.inputIcon} aria-hidden="true">{icon}</span>}
        {children}
      </div>
      {hint  && <p className={styles.hint}>{hint}</p>}
      {error && <p id={errorId} className={styles.errorMsg} role="alert">{error}</p>}
    </div>
  )
}

/* Simulate API */
function fakeApiCall(data) {
  return new Promise((res, rej) =>
    setTimeout(() => Math.random() > 0.1 ? res(data) : rej(), 1200)
  )
}
