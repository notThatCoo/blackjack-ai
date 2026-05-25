import { useState } from 'react'

const VALID_CARDS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

function tcColor(tc) {
  if (tc >= 3) return '#27ae60'
  if (tc >= 1) return '#f39c12'
  if (tc <= -1) return '#e74c3c'
  return '#7fb89a'
}

export default function CountTracker({ countStatus, onStatusChange }) {
  const [cardInput, setCardInput] = useState('')
  const [loading, setLoading] = useState(false)

  const addCard = async () => {
    if (!cardInput) return
    setLoading(true)
    try {
      const res = await fetch('/api/count/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: [cardInput.toUpperCase()] }),
      })
      const data = await res.json()
      onStatusChange(data.count_status)
      setCardInput('')
    } finally {
      setLoading(false)
    }
  }

  const reset = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/count/reset', { method: 'POST' })
      const data = await res.json()
      onStatusChange(data.count_status)
    } finally {
      setLoading(false)
    }
  }

  const tc = countStatus?.true_count ?? 0
  const rc = countStatus?.running_count ?? 0

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Count Tracker</h2>

      <div style={styles.stats}>
        <Stat label="True Count" value={tc >= 0 ? `+${tc}` : `${tc}`} color={tcColor(tc)} large />
        <Stat label="Running" value={rc >= 0 ? `+${rc}` : `${rc}`} />
        <Stat label="Decks Left" value={countStatus?.decks_remaining ?? '—'} />
        <Stat label="Cards Seen" value={countStatus?.cards_seen ?? 0} />
      </div>

      <div style={styles.betRow}>
        <span style={styles.label}>Recommended Bet</span>
        <span style={styles.bet}>${countStatus?.recommended_bet ?? 10}</span>
      </div>

      <div style={styles.inputRow}>
        <select
          value={cardInput}
          onChange={e => setCardInput(e.target.value)}
          style={styles.select}
        >
          <option value="">Add card…</option>
          {VALID_CARDS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={addCard} disabled={loading || !cardInput} style={styles.btn}>
          Count
        </button>
        <button onClick={reset} disabled={loading} style={styles.resetBtn}>
          New Shoe
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value, color, large }) {
  return (
    <div style={styles.stat}>
      <span style={styles.statLabel}>{label}</span>
      <span style={{ ...styles.statValue, color: color || '#f0ead6', fontSize: large ? 32 : 22 }}>
        {value}
      </span>
    </div>
  )
}

const styles = {
  card: {
    background: '#0f2d1c',
    border: '1px solid #2d6a4a',
    borderRadius: 12,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  heading: { fontSize: 20, letterSpacing: 1, color: '#c9a84c' },
  stats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  stat: {
    background: '#1a3d2b',
    borderRadius: 8,
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  statLabel: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#7fb89a' },
  statValue: { fontWeight: 'bold', fontFamily: 'monospace' },
  betRow: {
    background: '#1a3d2b',
    borderRadius: 8,
    padding: '10px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#7fb89a' },
  bet: { fontSize: 22, fontWeight: 'bold', color: '#c9a84c', fontFamily: 'monospace' },
  inputRow: { display: 'flex', gap: 8, alignItems: 'center' },
  select: {
    flex: 1,
    background: '#1a3d2b',
    color: '#f0ead6',
    border: '1px solid #2d6a4a',
    borderRadius: 6,
    padding: '8px 10px',
    fontSize: 15,
    cursor: 'pointer',
  },
  btn: {
    background: '#2d6a4a',
    color: '#f0ead6',
    border: 'none',
    borderRadius: 6,
    padding: '8px 16px',
    fontSize: 14,
    cursor: 'pointer',
  },
  resetBtn: {
    background: 'transparent',
    color: '#c0392b',
    border: '1px solid #c0392b',
    borderRadius: 6,
    padding: '8px 14px',
    fontSize: 13,
    cursor: 'pointer',
  },
}
