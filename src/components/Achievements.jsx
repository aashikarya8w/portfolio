import { motion } from 'framer-motion'
import { FaTrophy, FaExternalLinkAlt } from 'react-icons/fa'
import { achievements } from '../data'
import './Achievements.css'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <motion.h2
          className="section-title gradient-text"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          Achievements
        </motion.h2>

        <div className="ach-grid">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              className="glass ach-card"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, borderColor: 'rgba(255,107,107,0.4)' }}
            >
              <div className="ach-icon-wrap"><FaTrophy /></div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
              {a.link && (
                <a href={a.link} target="_blank" rel="noreferrer" className="ach-link">
                  View <FaExternalLinkAlt size={10} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
