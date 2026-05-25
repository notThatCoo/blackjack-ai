import { useState } from 'react'

const ACTION_COLORS = {
  H: '#e67e22',
  S: '#27ae60',
  D: '#2980b9',
  Ds: '#2980b9',
  P: '#8e44ad',
  R: '#c0392b',
}

const VALID_CARDS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

export default function StrategyCoach({ onAdvice }) {
  const [playerCards, setPlayerCards] = useState(['', ''])
  const [dealerUpcard, setDealerUpcard] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const addCard = () => setPlayerCards(prev => [...prev, ''])
  const removeCard = (i) => setPlayerCards(prev => prev.filter((_, idx) => idx !== i))
  const setCard = (i, val) => setPlayerCards(prev => prev.map((c, idx) => idx === i ? val.toUpperCase() : c))

  const submit = async () => {
    const cards = playerCards.filter(c => c.trim())
    if (cards.length < 2) return setError('Enter at least 2 player cards.')
    if (!dealerUpcard.trim()) return setError('Enter dealer upcard.')
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_cards: cards, dealer_upcard: dealerUpcard.toUpperCase() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || 'Request failed')
      }
      const data = await res.json()
      setResult(data)
      onAdvice(data, cards, dealerUpcard.toUpperCase())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const color = result ? (ACTION_COLORS[result.action] || '#f0ead6') : null

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Strategy Coach</h2>

      <div style={styles.section}>
        <label style={styles.label}>Your Cards</label>
        <div style={styles.cardRow}>
          {playerCards.map((c, i) => (
            <div key={i} style={styles.cardInputWrap}>
              <select
                value={c}
                onChange={e => setCard(i, e.target.value)}
                style={styles.select}
              >
                <option value="">—</option>
                {VALID_CARDS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              {playerCards.length > 2 && (
                <button onClick={() => removeCard(i)} style={styles.removeBtn}>✕</button>
              )}
            </div>
          ))}
          {playerCards.length < 6 && (
            <button onClick={addCard} style={styles.addBtn}>+ Card</button>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Dealer Upcard</label>
        <select
          value={dealerUpcard}
          onChange={e => setDealerUpcard(e.target.value)}
          style={{ ...styles.select, width: 90 }}
        >
          <option value="">—</option>
          {VALID_CARDS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <button onClick={submit} disabled={loading} style={styles.submitBtn}>
        {loading ? 'Thinking...' : 'Get Advice'}
      </button>

      {result && (
        <div style={{ ...styles.result, borderColor: color }}>
          <div style={{ ...styles.actionBadge, background: color }}>{result.action}</div>
          <p style={styles.description}>{result.description}</p>
        </div>
      )}
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
    gap: 20,
  },
  heading: { fontSize: 20, letterSpacing: 1, color: '#c9a84c' },
  section: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#7fb89a' },
  cardRow: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  cardInputWrap: { display: 'flex', alignItems: 'center', gap: 4 },
  select: {
    background: '#1a3d2b',
    color: '#f0ead6',
    border: '1px solid #2d6a4a',
    borderRadius: 6,
    padding: '6px 10px',
    fontSize: 16,
    cursor: 'pointer',
  },
  removeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#c0392b',
    cursor: 'pointer',
    fontSize: 14,
    padding: '2px 4px',
  },
  addBtn: {
    background: 'transparent',
    border: '1px dashed #2d6a4a',
    color: '#7fb89a',
    borderRadius: 6,
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: 13,
  },
  submitBtn: {
    background: '#c9a84c',
    color: '#0f2d1c',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    letterSpacing: 1,
  },
  result: {
    border: '2px solid',
    borderRadius: 10,
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  actionBadge: {
    width: 56,
    height: 56,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 0,
  },
  description: { fontSize: 16, lineHeight: 1.4 },
  error: { color: '#e74c3c', fontSize: 13 },
}
