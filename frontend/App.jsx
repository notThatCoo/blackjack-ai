import { useState, useEffect } from 'react'
import StrategyCoach from './components/StrategyCoach.jsx'
import CountTracker from './components/CountTracker.jsx'
import SessionLog from './components/SessionLog.jsx'

export default function App() {
  const [countStatus, setCountStatus] = useState(null)
  const [log, setLog] = useState([])

  useEffect(() => {
    fetch('/api/count/status')
      .then(r => r.json())
      .then(d => setCountStatus(d.count_status))
      .catch(() => {})
  }, [])

  const handleAdvice = (data, cards, dealer) => {
    setCountStatus(data.count_status)
    setLog(prev => [...prev, {
      action: data.action,
      cards,
      dealer,
      tc: data.count_status.true_count,
    }])
  }

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <span style={styles.logo}>♠ Blackjack AI</span>
        <span style={styles.sub}>6-deck · H17 · Basic Strategy + Hi-Lo</span>
      </header>

      <main style={styles.main}>
        <div style={styles.left}>
          <StrategyCoach onAdvice={handleAdvice} />
        </div>
        <div style={styles.right}>
          <CountTracker countStatus={countStatus} onStatusChange={setCountStatus} />
          <SessionLog entries={log} />
        </div>
      </main>
    </div>
  )
}

const styles = {
  root: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  header: {
    padding: '16px 32px',
    borderBottom: '1px solid #2d6a4a',
    display: 'flex',
    alignItems: 'baseline',
    gap: 16,
    background: '#0a1f13',
  },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#c9a84c', letterSpacing: 2 },
  sub: { fontSize: 13, color: '#7fb89a' },
  main: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: 24,
    padding: 32,
    alignItems: 'start',
  },
  left: {},
  right: { display: 'flex', flexDirection: 'column', gap: 24 },
}
