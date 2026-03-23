import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SplashScreen.css'

export default function SplashScreen({ onDone }) {
  const canvasRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')

    function resize() { cvs.width = innerWidth; cvs.height = innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const rnd = (a, b) => a + Math.random() * (b - a)
    const CX = () => cvs.width / 2
    const CY = () => cvs.height / 2

    const COLORS = [
      () => `hsla(${rnd(270,290)},80%,${rnd(60,75)}%,1)`,
      () => `hsla(${rnd(185,200)},90%,${rnd(55,70)}%,1)`,
      () => `rgba(${rnd(160,200)},${rnd(80,120)},255,1)`,
    ]

    class Particle {
      constructor(init) { this.init = init; this.reset() }
      reset() {
        const a = rnd(0, Math.PI*2)
        const r = this.init ? rnd(0, 300) : rnd(5, 50)
        this.x = CX() + Math.cos(a)*r
        this.y = CY() + Math.sin(a)*r
        this.vx = rnd(-.3, .3)
        this.vy = rnd(-1.0, -.2)
        this.sz = rnd(.5, 2.2)
        this.life = 0
        this.max = rnd(100, 230)
        this.colorFn = COLORS[Math.floor(Math.random()*COLORS.length)]
        this.init = false
      }
      tick() { this.x+=this.vx; this.y+=this.vy; this.life++; if(this.life>this.max) this.reset() }
      draw() {
        const t = this.life/this.max
        const a = t<.2 ? t/.2 : t>.75 ? (1-t)/.25 : 1
        ctx.globalAlpha = a*.85
        ctx.fillStyle = this.colorFn()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI*2)
        ctx.fill()
      }
    }

    class Smoke {
      constructor(init) { this.init = init; this.reset() }
      reset() {
        const a = rnd(0, Math.PI*2)
        const r = this.init ? rnd(0, 200) : rnd(0, 80)
        this.x = CX() + Math.cos(a)*r
        this.y = CY() + Math.sin(a)*r
        this.vx = rnd(-.1,.1)
        this.vy = rnd(-.4,-.07)
        this.r = rnd(30, 75)
        this.life = 0
        this.max = rnd(140, 290)
        this.init = false
      }
      tick() { this.x+=this.vx; this.y+=this.vy; this.r+=.18; this.life++; if(this.life>this.max) this.reset() }
      draw() {
        const t = this.life/this.max
        const a = (t<.3 ? t/.3 : 1-(t-.3)/.7) * .05
        const g = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r)
        g.addColorStop(0,  `rgba(168,85,247,${a})`)
        g.addColorStop(.5, `rgba(13,13,26,${a*.6})`)
        g.addColorStop(1,  'rgba(0,0,0,0)')
        ctx.globalAlpha=1; ctx.fillStyle=g
        ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill()
      }
    }

    const parts  = Array.from({length:160}, (_,i) => new Particle(i<90))
    const smokes = Array.from({length:20},  (_,i) => new Smoke(i<10))

    let gp = 0
    function ambientGlow() {
      gp += .015
      const pulse = .5 + .5*Math.sin(gp)
      const r = 240 + pulse*60
      const g = ctx.createRadialGradient(CX(),CY(),0,CX(),CY(),r)
      g.addColorStop(0,   `rgba(168,85,247,${.08+pulse*.06})`)
      g.addColorStop(.35, `rgba(6,182,212,${.04+pulse*.03})`)
      g.addColorStop(.7,  `rgba(13,13,26,.06)`)
      g.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.globalAlpha=1; ctx.fillStyle=g
      ctx.beginPath(); ctx.arc(CX(),CY(),r,0,Math.PI*2); ctx.fill()
    }

    let animId
    function loop() {
      ctx.clearRect(0,0,cvs.width,cvs.height)
      ambientGlow()
      smokes.forEach(s => { s.tick(); s.draw() })
      parts.forEach(p  => { p.tick(); p.draw() })
      ctx.globalAlpha=1
      animId = requestAnimationFrame(loop)
    }
    loop()

    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone(), 1400)
    }, 6000)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <canvas ref={canvasRef} className="splash-canvas" />
          <div id="logo-wrap">
            <div id="monogram-wrap">
              <svg id="mono-svg" viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="accentFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#c084fc"/>
                    <stop offset="35%"  stopColor="#a855f7"/>
                    <stop offset="65%"  stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#22d3ee"/>
                  </linearGradient>
                  <linearGradient id="accentStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                  <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="transparent"/>
                    <stop offset="45%"  stopColor="#fff" stopOpacity="0"/>
                    <stop offset="55%"  stopColor="#fff" stopOpacity=".85"/>
                    <stop offset="100%" stopColor="transparent"/>
                    <animateTransform attributeName="gradientTransform" type="translate" values="-2 0;2 0;-2 0" dur="2.5s" repeatCount="indefinite"/>
                  </linearGradient>
                  <linearGradient id="swooshG" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#a855f7" stopOpacity="0"/>
                    <stop offset="35%"  stopColor="#a855f7"/>
                    <stop offset="70%"  stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
                  </linearGradient>
                  <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="4" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="softglow" x="-15%" y="-15%" width="130%" height="130%">
                    <feGaussianBlur stdDeviation="2.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <text x="10" y="185" fontFamily="'Cinzel','Poppins',sans-serif" fontSize="190" fontWeight="700" className="ltr-outline" filter="url(#glow)">A</text>
                <text x="108" y="185" fontFamily="'Cinzel','Poppins',sans-serif" fontSize="190" fontWeight="700" className="ltr-outline" filter="url(#glow)">K</text>
                <text x="10" y="185" fontFamily="'Cinzel','Poppins',sans-serif" fontSize="190" fontWeight="700" className="ltr-fill" filter="url(#softglow)">A</text>
                <text x="108" y="185" fontFamily="'Cinzel','Poppins',sans-serif" fontSize="190" fontWeight="700" className="ltr-fill" filter="url(#softglow)">K</text>
                <text x="10" y="185" fontFamily="'Cinzel','Poppins',sans-serif" fontSize="190" fontWeight="700" className="ltr-shimmer">A</text>
                <text x="108" y="185" fontFamily="'Cinzel','Poppins',sans-serif" fontSize="190" fontWeight="700" className="ltr-shimmer">K</text>
                <path id="swoosh-path" d="M 5 158 C 50 100 100 135 130 115 C 160 95 200 60 255 72"/>
              </svg>
              <div className="flare" id="fl1"></div>
              <div className="flare" id="fl2"></div>
              <div className="flare" id="fl3"></div>
            </div>
            <div id="tagline-wrap">
              <div id="divider"></div>
              <div id="fullname">Aashik Kumar</div>
              <div id="subtitle">Full Stack Developer</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
