import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { MOCK_WORKSHOPS } from '../utils/mockData'

const WorkshopContext = createContext(null)

export function WorkshopProvider({ children }) {
  const [workshops, setWorkshops]   = useState([])
  const [loading,   setLoading]     = useState(true)
  const [error,     setError]       = useState(null)

  const fetchWorkshops = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Replace with real API: const res = await fetch('/api/workshops')
      await delay(600)
      setWorkshops(MOCK_WORKSHOPS)
    } catch (err) {
      setError('Failed to load workshops. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchWorkshops() }, [fetchWorkshops])

  const getById = useCallback(
    (id) => workshops.find(w => w.id === id) ?? null,
    [workshops]
  )

  return (
    <WorkshopContext.Provider value={{ workshops, loading, error, refetch: fetchWorkshops, getById }}>
      {children}
    </WorkshopContext.Provider>
  )
}

export function useWorkshops() {
  const ctx = useContext(WorkshopContext)
  if (!ctx) throw new Error('useWorkshops must be used inside <WorkshopProvider>')
  return ctx
}

const delay = (ms) => new Promise(res => setTimeout(res, ms))
