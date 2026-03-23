export default function NavLogo({ size = 44 }) {
  return (
    <div style={{
      fontFamily: "'Cinzel', serif",
      fontWeight: '700',
      fontSize: size * 0.4,
      background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      cursor: 'pointer',
      letterSpacing: '2px',
    }}>
      AK
    </div>
  )
}
