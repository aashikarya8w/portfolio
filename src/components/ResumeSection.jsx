import { motion } from 'framer-motion'
import { FaDownload, FaEye } from 'react-icons/fa'
import './ResumeSection.css'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export default function ResumeSection() {
  return (
    <section id="resume-section">
      <div className="container">
        <motion.div className="rs-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="section-title gradient-text">Resume</h2>
          <p className="rs-sub">Have a look at my resume or download it.</p>
        </motion.div>

        <motion.div className="rs-card glass" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="rs-actions">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="rs-btn">
              <FaEye /> View Resume
            </a>
            <a href="/resume.pdf" download className="rs-btn rs-btn-outline">
              <FaDownload /> Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
