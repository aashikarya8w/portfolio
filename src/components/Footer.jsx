import { personal } from '../data'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>Designed & Built by <span className="gradient-text">{personal.name}</span></p>
      <p className="footer-sub">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  )
}
