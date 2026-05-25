const ACTION_COLORS = {
  H: '#e67e22',
  S: '#27ae60',
  D: '#2980b9',
  Ds: '#2980b9',
  P: '#8e44ad',
  R: '#c0392b',
}

export default function SessionLog({ entries }) {
  if (!entries.length) {
    return (
      <div style={styles.card}>
        <h2 style={styles.heading}>Session Log</h2>
        <p style={styles.empty}>No hands played yet.</p>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Session Log</h2>
      <div style={styles.list}>
        {[...entries].reverse().map((e, i) => (
          <div key={i} style={styles.entry}>
            <span style={{ ...styles.badge, background: ACTION_COLORS[e.action] || '#555' }}>
              {e.action}
            </span>
            <span style={styles.hand}>
              [{e.cards.join(', ')}] vs {e.dealer}
            </span>
            <span style={styles.tc}>TC {e.tc >= 0 ? '+' : ''}{e.tc}</span>
          </div>
        ))}
      </div>
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
  empty: { color: '#7fb89a', fontSize: 14 },
  list: { display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 260, overflowY: 'auto' },
  entry: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#1a3d2b',
    borderRadius: 8,
    padding: '8px 12px',
  },
  badge: {
    width: 36,
    height: 28,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 0,
  },
  hand: { flex: 1, fontSize: 14, fontFamily: 'monospace' },
  tc: { fontSize: 12, color: '#7fb89a', fontFamily: 'monospace', whiteSpace: 'nowrap' },
}
