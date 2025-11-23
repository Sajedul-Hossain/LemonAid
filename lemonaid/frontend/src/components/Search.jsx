import React, { useState, useEffect, useRef } from 'react'
import styles from './Search.module.css'

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [source, setSource] = useState('both')
  const debounced = useDebounce(query, 300)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const controllerRef = useRef(null)

  useEffect(() => {
    if (!debounced || debounced.trim().length < 1) {
      setResults([])
      setError(null)
      return
    }

    async function run() {
      if (controllerRef.current) controllerRef.current.abort()
      controllerRef.current = new AbortController()
      setLoading(true)
      setError(null)

      try {
        const qs = new URLSearchParams({ q: debounced, source })
        const res = await fetch(`/api/search?${qs.toString()}`, {
          signal: controllerRef.current.signal
        })
        if (!res.ok) throw new Error(`Search failed (${res.status})`)
        const json = await res.json()
        setResults(json.results || [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [debounced, source])

  return (
    <section className={styles.container} aria-labelledby="search-heading">
      <h2 id="search-heading">Search items</h2>

      <div className={styles.controls}>
        <input
          aria-label="Search by item number or name"
          className={styles.input}
          placeholder="Type item number or name…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <select
          aria-label="Search source"
          value={source}
          onChange={e => setSource(e.target.value)}
        >
          <option value="both">Local + Marketplace</option>
          <option value="local">Local only</option>
          <option value="marketplace">Marketplace only</option>
        </select>
      </div>

      <div role="status" aria-live="polite">
        {loading && <div className={styles.loading}>Searching…</div>}
        {error && <div className={styles.error}>Error: {error}</div>}
      </div>

      <ul className={styles.results}>
        {results.map((r) => (
          <li key={r.id || r.listingId} className={styles.card}>
            <div className={styles.cardHeader}>
              <strong>{r.title || r.name}</strong>
              <span className={styles.meta}>{r.source}</span>
            </div>
            {r.description && <p className={styles.cardBody}>{r.description}</p>}
            {r.price && <div className={styles.price}>${r.price}</div>}
            {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer">View listing</a>}
          </li>
        ))}
      </ul>

      {!loading && !results.length && debounced && <div className={styles.noResults}>No results</div>}
    </section>
  )
}
