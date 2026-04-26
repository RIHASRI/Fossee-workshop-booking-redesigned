import React, { useState, useMemo } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import WorkshopCard from '../../components/WorkshopCard/WorkshopCard'
import { useWorkshops } from '../../context/WorkshopContext'
import { useDebounce } from '../../hooks/useDebounce'
import styles from './Workshops.module.css'

const CATEGORIES = ['All', 'Python', 'Scilab', 'Web Dev', 'CFD', 'Data Science', 'GIS']
const LEVELS     = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function Workshops() {
  const { workshops, loading, error } = useWorkshops()
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [level,    setLevel]    = useState('All')

  const debouncedSearch = useDebounce(search, 250)

  const filtered = useMemo(() => {
    return workshops.filter(w => {
      const matchSearch   = !debouncedSearch ||
        w.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        w.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchCategory = category === 'All' || w.category === category
      const matchLevel    = level === 'All'    || w.level === level
      return matchSearch && matchCategory && matchLevel
    })
  }, [workshops, debouncedSearch, category, level])

  const hasFilters = search || category !== 'All' || level !== 'All'

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setLevel('All')
  }

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <section className={styles.pageHeader} aria-labelledby="workshops-heading">
        <div className="container">
          <h1 id="workshops-heading" className={styles.pageTitle}>All Workshops</h1>
          <p className={styles.pageSubtitle}>
            Explore free workshops on open-source tools — find one that fits your level and interest.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Filters */}
        <section className={styles.filters} aria-label="Filter workshops">
          {/* Search */}
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search workshops…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Search workshops by name or description"
            />
          </div>

          {/* Category Tabs */}
          <div className={styles.filterRow}>
            <FiFilter aria-hidden="true" className={styles.filterIcon} />
            <div className={styles.tabs} role="group" aria-label="Filter by category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.tab} ${category === cat ? styles.tabActive : ''}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level Tabs */}
          <div className={styles.filterRow}>
            <div className={styles.tabs} role="group" aria-label="Filter by level" style={{ paddingLeft: '1.5rem' }}>
              {LEVELS.map(lvl => (
                <button
                  key={lvl}
                  className={`${styles.tab} ${styles.tabSmall} ${level === lvl ? styles.tabActive : ''}`}
                  onClick={() => setLevel(lvl)}
                  aria-pressed={level === lvl}
                >
                  {lvl}
                </button>
              ))}
            </div>
            {hasFilters && (
              <button className={styles.clearBtn} onClick={clearFilters} aria-label="Clear all filters">
                <FiX aria-hidden="true" /> Clear filters
              </button>
            )}
          </div>
        </section>

        {/* Results summary */}
        <p className={styles.resultCount} aria-live="polite" aria-atomic="true">
          {loading ? 'Loading…' : `${filtered.length} workshop${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {/* Grid */}
        {error ? (
          <p className={styles.errorMsg} role="alert">{error}</p>
        ) : loading ? (
          <div className="spinner" role="status" aria-label="Loading workshops…" />
        ) : filtered.length === 0 ? (
          <div className={styles.empty} role="status">
            <p>No workshops match your filters.</p>
            <button onClick={clearFilters} className={styles.clearBtn}>Clear filters</button>
          </div>
        ) : (
          <ul className={styles.grid} role="list">
            {filtered.map(w => (
              <li key={w.id}>
                <WorkshopCard workshop={w} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
