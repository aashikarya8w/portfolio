import { motion } from 'framer-motion'
import './BgCircles.css'

// Fixed random positions so dots don't re-randomize on re-render
const DOTS = Array.from({ length: 40 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top:  `${(i * 53 + 7)  % 100}%`,
  duration: 2 + (i % 5),
  delay: (i * 0.3) % 3,
}))

export default function BgCircles() {
  return (
    <div className="bg-circles">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`circle circle-${i + 1}`}
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}

      {/* Floating dots — visible on all pages */}
      {DOTS.map((d, i) => (
        <motion.span
          key={`dot-${i}`}
          className="bg-dot"
          style={{ left: d.left, top: d.top }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.5, 1] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
