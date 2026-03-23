import { motion } from 'framer-motion'
import { FaGraduationCap, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'
import { education, certifications } from '../data'
import './Education.css'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <motion.h2
          className="section-title gradient-text"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>

        {/* Timeline */}
        <div className="timeline">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="timeline-dot"><FaGraduationCap /></div>
              <div className="glass timeline-card">
                <div className="timeline-header">
                  <h3>{edu.degree}</h3>
                  <span className="timeline-year">{edu.year}</span>
                </div>
                <p className="timeline-inst">{edu.institution}</p>
                <p className="timeline-cgpa">CGPA / Score: <strong>{edu.cgpa}</strong></p>
                <p className="timeline-desc">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.h3
          className="cert-heading"
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          Certifications
        </motion.h3>
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="glass cert-card"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {cert.image && (
                <div className="cert-img-wrap">
                  <img src={cert.image} alt={cert.title} className="cert-img" />
                </div>
              )}
              <div className="cert-body">
                <div className="cert-icon"><FaCertificate /></div>
                <h4>{cert.title}</h4>
                <p>{cert.issuer}</p>
                <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
                  View <FaExternalLinkAlt size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
