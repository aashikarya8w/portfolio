import { motion } from 'framer-motion'
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaCode } from 'react-icons/fa'
import './Resume.css'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

const trainings = [
  {
    title: 'Summer Training – Data Structures & Algorithms',
    institute: 'Lovely Professional University (LPU)',
    location: 'Punjab, India',
    date: 'Summer 2024',
    topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & Graphs', 'Sorting & Searching', 'Dynamic Programming'],
    description: 'Completed intensive Data Structures and Algorithms training using C++. Focused on problem-solving techniques, algorithmic thinking, and competitive programming fundamentals.',
    icon: '🎓',
    certificate: 'https://drive.google.com/file/d/1lbLImJS7GBrHYr9RGRHRqLAeFE0HtI5V/view?usp=drive_link',
  },
]

export default function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <motion.div className="resume-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="section-title gradient-text">Training</h2>
          <p className="resume-sub">Hands-on training and skill development programs I have completed.</p>
        </motion.div>

        <div className="training-list">
          {trainings.map((t, i) => (
            <motion.div
              key={i}
              className="training-card glass"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="training-icon">{t.icon}</div>
              <div className="training-body">
                <h3 className="training-title">{t.title}</h3>
                <div className="training-meta">
                  <span><FaGraduationCap /> {t.institute}</span>
                  <span><FaMapMarkerAlt /> {t.location}</span>
                  <span><FaCalendarAlt /> {t.date}</span>
                </div>
                <p className="training-desc">{t.description}</p>
                <div className="training-topics">
                  <span className="topics-label"><FaCode /> Topics Covered:</span>
                  <div className="topics-tags">
                    {t.topics.map((topic, j) => (
                      <span key={j} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
                {t.certificate && (
                  <a href={t.certificate} target="_blank" rel="noreferrer" className="cert-btn">
                    🏆 View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
