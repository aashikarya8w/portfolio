import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDownload, FaArrowDown, FaGithub, FaLinkedin, FaInstagram, FaArrowRight, FaUser, FaBriefcase, FaRocket, FaMobileAlt, FaCode } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { personal } from '../data'
import profileImg from '../assets/profile.png'
import './Hero.css'

const socials = [
  { icon: <FaLinkedin />,  href: personal.linkedin,                        bg: '#0a66c2',                                                        color: '#fff' },
  { icon: <FaGithub />,    href: personal.github,                          bg: '#fff',                                                           color: '#000' },
  { icon: <FaXTwitter />,  href: 'https://x.com/AashikArya5',             bg: '#000',                                                           color: '#fff' },
  { icon: <FaInstagram />, href: 'https://instagram.com/aashik2.8',  bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff' },
]

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTitleIdx(i => (i + 1) % personal.titles.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="hero-section">

      <div className="container hero-container">
        {/* ── LEFT ── */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">
            <span className="name-highlight">{personal.name}</span>
          </h1>

          <div className="hero-title-wrap">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIdx}
                className="hero-title"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                {personal.titles[titleIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="hero-bio">{personal.bio}</p>

          {/* Buttons */}
          <div className="hero-btns">
            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Hire Me
            </motion.a>
            <motion.a
              href="#about"
              className="btn-ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <FaUser size={12} /> About me <FaArrowRight size={11} />
            </motion.a>
            <motion.a
              href="#projects"
              className="btn-ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <FaBriefcase size={12} /> Previous Work <FaArrowRight size={11} />
            </motion.a>
          </div>

          {/* Profile card */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="profile-card-avatar">
              <span>{personal.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div className="profile-card-info">
              <p className="profile-card-name">{personal.name.split(' ')[0]}</p>
              <p className="profile-card-role">Developer</p>
              <a href="/resume.pdf" download className="btn-download">
                Download CV <FaDownload size={13} />
              </a>
            </div>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={`social-icon-btn ${i === 0 ? 'social-linkedin' : ''}`}
                style={{ background: s.bg, color: s.color }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Profile photo in glowing ring ── */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="photo-ring-outer">
            <div className="photo-ring-inner">
              <img src={profileImg} alt="Aashik Kumar" className="profile-photo" />
            </div>
            <div className="orbit-icon orbit-top-right"><FaRocket /></div>
            <div className="orbit-icon orbit-bottom-left"><FaCode /></div>
            <div className="orbit-icon orbit-bottom-right"><FaMobileAlt /></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-hint"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <FaArrowDown />
      </motion.div>
    </section>
  )
}
