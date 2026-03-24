import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Achievements from './components/Achievements'
import ResumeSection from './components/ResumeSection'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BgCircles from './components/BgCircles'
import SocialSidebar from './components/SocialSidebar'
import './App.css'

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!showPortfolio && (
          <SplashScreen onDone={() => setShowPortfolio(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPortfolio && (
          <motion.div
            className="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <BgCircles />
            <Navbar />
            <SocialSidebar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Achievements />
              <ResumeSection />
              <Resume />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
