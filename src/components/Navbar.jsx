import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AKLogo from './AKLogo'
import {
  FaHome, FaUser, FaCode, FaFolderOpen,
  FaGraduationCap, FaTrophy, FaFileAlt, FaEnvelope, FaMoon, FaSun
} from 'react-icons/fa'
import './Navbar.css'

// Apply theme to root
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

const links = [
  { label: 'Home',         id: 'home',         icon: <FaHome />,         num: '01' },
  { label: 'About',        id: 'about',        icon: <FaUser />,         num: '02' },
  { label: 'Skills',       id: 'skills',       icon: <FaCode />,         num: '03' },
  { label: 'Projects',     id: 'projects',     icon: <FaFolderOpen />,   num: '04' },
  { label: 'Education',    id: 'education',    icon: <FaGraduationCap />,num: '05' },
  { label: 'Achievements', id: 'achievements', icon: <FaTrophy />,       num: '06' },
  { label: 'Resume',       id: 'resume-section', icon: <FaFileAlt />,    num: '07' },
  { label: 'Training',     id: 'resume',        icon: <FaFileAlt />,      num: '08' },
  { label: 'Contact',      id: 'contact',       icon: <FaEnvelope />,     num: '09' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active, setActive]       = useState('home')
  const [dark, setDark]           = useState(true)

  useEffect(() => { applyTheme(dark) }, [dark])

  const toggleTheme = () => setDark(d => !d)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // update active section
      const sections = links.map(l => document.getElementById(l.id))
      sections.forEach(sec => {
        if (!sec) return
        const rect = sec.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) setActive(sec.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-brand" onClick={() => scrollTo('home')}>
        <AKLogo size={44} />
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(link => (
          <li key={link.id}>
            <button
              className={active === link.id ? 'nav-btn active' : 'nav-btn'}
              onClick={() => scrollTo(link.id)}
            >
              <span className="nav-icon">{link.icon}</span>
              <sup className="nav-num">{link.num}</sup>
              <span className="nav-label">{link.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <motion.button
          className="theme-toggle"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          title={dark ? 'Switch to Light' : 'Switch to Dark'}
        >
          <motion.span
            key={dark ? 'moon' : 'sun'}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {dark ? <FaMoon /> : <FaSun />}
          </motion.span>
        </motion.button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </motion.nav>
  )
}
