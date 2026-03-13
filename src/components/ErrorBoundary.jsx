import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('App crash:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Что-то пошло не так</h2>
          <p style={{ color: '#8b949e', marginBottom: 24, fontSize: 14 }}>Произошла ошибка при отображении страницы</p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/home' }}
            style={{ background: '#58a6ff', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            Вернуться на главную
          </button>
          {import.meta.env.DEV && (
            <pre style={{ marginTop: 24, color: '#f87171', fontSize: 11, maxWidth: 600, overflow: 'auto', background: '#161b22', padding: 16, borderRadius: 10, border: '1px solid #21262d' }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
