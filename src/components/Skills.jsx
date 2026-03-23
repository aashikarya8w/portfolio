import { motion } from 'framer-motion'
import { skills } from '../data'
import './Skills.css'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <motion.h2
          className="section-title gradient-text"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <div className="skills-grid">
          {skills.technical.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="glass skill-card"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="skill-header">
                <img src={skill.icon} alt={skill.name} className="skill-icon" onError={e => e.target.style.display='none'} />
                <span className="skill-name">{skill.name}</span>
                <span className="skill-pct">{skill.level}%</span>
              </div>
              <div className="skill-bar-bg">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="soft-skills"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="soft-title">Soft Skills</h3>
          <div className="soft-tags">
            {skills.soft.map(s => (
              <motion.span key={s} className="soft-tag" whileHover={{ scale: 1.08 }}>{s}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
