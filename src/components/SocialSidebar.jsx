import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { personal } from '../data'
import './SocialSidebar.css'

const socials = [
  { icon: <FaGithub />,   href: personal.github,              bg: '#fff',    color: '#000' },
  { icon: <FaLinkedin />, href: personal.linkedin,            bg: '#0a66c2', color: '#fff' },
  { icon: <FaEnvelope />, href: `mailto:${personal.email}`,  bg: '#ea4335', color: '#fff' },
]

export default function SocialSidebar() {
  return (
    <motion.div
      className="social-sidebar"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {socials.map((s, i) => (
        <motion.a
          key={i}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="social-link"
          style={{ background: s.bg, color: s.color }}
          whileHover={{ scale: 1.15, x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          {s.icon}
        </motion.a>
      ))}
      <div className="sidebar-line" />
    </motion.div>
  )
}
