import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { projects } from '../data'
import './Projects.css'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <motion.h2
          className="section-title gradient-text"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="glass project-card"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, borderColor: 'rgba(255,107,107,0.4)' }}
            >
              {p.image && (
                <div className="project-img-wrap">
                  <img src={p.image} alt={p.title} className="project-img" />
                </div>
              )}
              <div className="project-top">
                <h3 className="project-title">{p.title}</h3>
                <div className="project-links">
                  <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
                  {p.live && p.live !== '#' && (
                    <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live"><FaExternalLinkAlt /></a>
                  )}
                </div>
              </div>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
