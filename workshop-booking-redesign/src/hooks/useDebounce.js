import { useState, useEffect } from 'react'

/**
 * useDebounce
 * Delays updating a value until a specified delay has passed
 * Useful for search inputs to avoid firing on every keystroke
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

/**
 * useWindowSize
 * Returns current window dimensions, updates on resize
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width:  typeof window !== 'undefined' ? window.innerWidth  : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

/**
 * useLocalStorage
 * Persists state in localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const val = value instanceof Function ? value(storedValue) : value
      setStoredValue(val)
      localStorage.setItem(key, JSON.stringify(val))
    } catch (err) {
      console.warn(`useLocalStorage error for key "${key}":`, err)
    }
  }

  return [storedValue, setValue]
}
