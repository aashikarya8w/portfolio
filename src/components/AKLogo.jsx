import { useEffect, useRef } from 'react'

export default function AKLogo({ size = 300 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const S = size
    cv.width = S; cv.height = S
    const CX = S / 2, CY = S / 2

    // dust particles
    const dust = Array.from({ length: 80 }, () => {
      const a = Math.random() * Math.PI * 2
      const r = S * (0.05 + Math.random() * 0.45)
      return {
        x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r,
        r: 0.5 + Math.random() * 1.8,
        alpha: 0.1 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#a855f7' : '#06b6d4',
      }
    })

    function makeLetter(letter) {
      const fs = Math.round(S * 0.72)
      const w = S, h = S
      const oc = document.createElement('canvas')
      oc.width = w; oc.height = h
      const c = oc.getContext('2d')
      c.font = `700 ${fs}px 'Cinzel', 'Poppins', serif`
      c.textAlign = 'center'
      c.textBaseline = 'middle'

      // gradient fill — purple to cyan
      const g = c.createLinearGradient(0, h * 0.1, w, h * 0.9)
      g.addColorStop(0,    '#c084fc')
      g.addColorStop(0.35, '#a855f7')
      g.addColorStop(0.65, '#06b6d4')
      g.addColorStop(1,    '#22d3ee')
      c.fillStyle = g
      c.fillText(letter, w / 2, h / 2)

      // cyan outline glow
      c.strokeStyle = 'rgba(6,182,212,0.6)'
      c.lineWidth = Math.max(1, fs * 0.008)
      c.strokeText(letter, w / 2, h / 2)

      return oc
    }

    const ocA = makeLetter('A')
    const ocK = makeLetter('K')

    let animId, t = 0

    function draw() {
      ctx.clearRect(0, 0, S, S)

      // dark bg
      ctx.fillStyle = '#0d0d1a'
      ctx.fillRect(0, 0, S, S)

      // center glow
      const cg = ctx.createRadialGradient(CX, CY * 0.9, 0, CX, CY, S * 0.55)
      cg.addColorStop(0, 'rgba(124,58,237,0.18)')
      cg.addColorStop(0.5, 'rgba(6,182,212,0.07)')
      cg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = cg; ctx.fillRect(0, 0, S, S)

      // dust
      dust.forEach(d => {
        ctx.save()
        ctx.globalAlpha = d.alpha * (0.5 + 0.5 * Math.sin(t * 0.03 + d.r))
        ctx.fillStyle = d.color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // A — left side
      const offX = S * 0.04
      ctx.save()
      ctx.shadowColor = 'rgba(168,85,247,0.5)'
      ctx.shadowBlur = S * 0.04
      ctx.drawImage(ocA, -S * 0.28 + offX, -S * 0.08)
      ctx.restore()

      // K — right side
      ctx.save()
      ctx.shadowColor = 'rgba(6,182,212,0.5)'
      ctx.shadowBlur = S * 0.04
      ctx.drawImage(ocK, S * 0.18 + offX, -S * 0.08)
      ctx.restore()

      // swoosh line
      const sw = t / 60  // 0→1 over 60 frames
      const prog = Math.min(sw, 1)
      if (prog > 0) {
        const x0 = S * 0.02, y0 = S * 0.62
        const x3 = S * 0.98, y3 = S * 0.44
        const c1x = S * 0.38, c1y = S * 0.44
        const c2x = S * 0.58, c2y = S * 0.52

        const steps = Math.floor(80 * prog)
        ctx.save()
        ctx.lineCap = 'round'
        for (let i = 0; i < steps; i++) {
          const ta = i / 80, tb = (i + 1) / 80
          const pa = bezier(ta, x0,y0,c1x,c1y,c2x,c2y,x3,y3)
          const pb = bezier(tb, x0,y0,c1x,c1y,c2x,c2y,x3,y3)
          const f = i / steps
          ctx.strokeStyle = `rgba(${lerp(124,6,f)},${lerp(58,182,f)},${lerp(237,212,f)},${0.1 + f * 0.9})`
          ctx.lineWidth = S * 0.006 * (0.3 + f)
          ctx.shadowColor = f > 0.5 ? '#06b6d4' : '#a855f7'
          ctx.shadowBlur = S * 0.015
          ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke()
        }
        ctx.restore()
      }

      t++
      if (t > 120) t = 120 // hold final state
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [size])

  function bezier(t, x0,y0,x1,y1,x2,y2,x3,y3) {
    const m = 1-t
    return {
      x: m*m*m*x0 + 3*m*m*t*x1 + 3*m*t*t*x2 + t*t*t*x3,
      y: m*m*m*y0 + 3*m*m*t*y1 + 3*m*t*t*y2 + t*t*t*y3,
    }
  }

  function lerp(a, b, t) { return Math.round(a + (b - a) * t) }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, borderRadius: '50%', display: 'block' }}
    />
  )
}
