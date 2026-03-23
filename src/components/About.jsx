import { motion } from 'framer-motion'
import { FaUser, FaGraduationCap, FaCode, FaMapMarkerAlt } from 'react-icons/fa'
import { personal } from '../data'
import './About.css'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <motion.h2
          className="section-title gradient-text"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="about-grid">
          {/* Left - Bio */}
          <motion.div
            className="about-bio"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass about-bio-card">
              <h3>Who am I?</h3>
              <p>{personal.bio}</p>
              <p style={{ marginTop: '16px' }}>{personal.bio2}</p>
              <div className="about-info">
                <div className="info-row"><FaUser className="info-icon" /><span>Name: <strong>{personal.name}</strong></span></div>
                <div className="info-row"><FaGraduationCap className="info-icon" /><span>College: <strong>{personal.college}</strong></span></div>
                <div className="info-row"><FaCode className="info-icon" /><span>CGPA: <strong>{personal.cgpa}</strong></span></div>
                <div className="info-row"><FaMapMarkerAlt className="info-icon" /><span>Email: <strong>{personal.email}</strong></span></div>
              </div>
            </div>
          </motion.div>

          {/* Right - Cards */}
          <motion.div
            className="about-cards"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: <FaCode size={28} />, title: 'Full Stack Dev', desc: 'Building end-to-end web applications with modern frameworks.' },
              { icon: '☁️', title: 'Cloud Computing', desc: 'Building and deploying scalable cloud solutions using AWS and modern cloud technologies.' },
              { icon: '🧩', title: 'Problem Solver', desc: '100+ LeetCode problems solved with optimized solutions.' },
              { icon: '🚀', title: 'Fast Learner', desc: 'Always exploring new technologies and best practices.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="glass about-card"
                whileHover={{ y: -6, borderColor: 'rgba(255,107,107,0.4)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="about-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
