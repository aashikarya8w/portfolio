import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { personal } from '../data'
import './Contact.css'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', category: 'General Inquiry', priority: 'Medium Priority', message: '', newsletter: false })

  const handle = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = e => {
    e.preventDefault()
    window.open(`https://mail.google.com/mail/?view=cm&to=${personal.email}&su=${form.category}&body=${encodeURIComponent(`Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPriority: ${form.priority}\n\n${form.message}`)}`, '_blank')
  }

  return (
    <section id="contact">
      <div className="container">
        <motion.div className="contact-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="section-title gradient-text">Contact</h2>
          <h3 className="contact-big-title">Let's Create Something <span className="gradient-text">Amazing</span></h3>
          <p className="contact-sub">Have a project in mind? Let's discuss how we can bring your ideas to life. I'm always excited to work on new challenges and collaborate with amazing people.</p>
        </motion.div>

        <div className="contact-layout">
          {/* LEFT */}
          <motion.div className="contact-left" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3>Get In Touch</h3>
            <p className="contact-left-sub">Whether you have a <span className="hl-cyan">project idea</span>, want to collaborate, or just want to say hello, I'd love to hear from you. Let's build something <span className="hl-cyan">extraordinary</span> together!</p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="ci-icon"><FaMapMarkerAlt /></span>
                <div>
                  <p className="ci-label">Location</p>
                  <p className="ci-value hl-cyan">Punjab, India</p>
                  <p className="ci-desc">Lovely Professional University, Phagwara</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="ci-icon"><FaEnvelope /></span>
                <div>
                  <p className="ci-label">Email</p>
                  <a href={`mailto:${personal.email}`} className="ci-value hl-cyan">{personal.email}</a>
                  <p className="ci-desc">Feel free to drop me a line</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="ci-icon ci-yellow"><FaClock /></span>
                <div>
                  <p className="ci-label">Availability</p>
                  <p className="ci-value hl-cyan">24/7 Response</p>
                  <p className="ci-desc">Quick turnaround guaranteed</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="ci-icon ci-green"><FaPhone /></span>
                <div>
                  <p className="ci-label">Call Me</p>
                  <a href={`tel:${personal.mobile}`} className="ci-value hl-cyan">{personal.mobile}</a>
                  <p className="ci-desc">Available for calls</p>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <p className="cs-label">Connect With Me</p>
              <div className="cs-icons">
                <a href={personal.linkedin} target="_blank" rel="noreferrer" className="cs-btn" style={{ background: '#0a66c2' }}><FaLinkedin /></a>
                <a href={personal.github}   target="_blank" rel="noreferrer" className="cs-btn" style={{ background: '#fff', color: '#000' }}><FaGithub /></a>
                <a href="https://x.com/AashikArya5" target="_blank" rel="noreferrer" className="cs-btn" style={{ background: '#000' }}><FaXTwitter /></a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div className="contact-right glass" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3>Send Me a Message</h3>
            <p className="contact-form-sub">Let's discuss your project and turn your ideas into reality.</p>

            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name <span className="req">*</span></label>
                  <div className="input-wrap">
                    <span className="input-icon"><FaEnvelope size={12} /></span>
                    <input name="firstName" value={form.firstName} onChange={handle} placeholder="Your first name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name <span className="req">*</span></label>
                  <div className="input-wrap">
                    <span className="input-icon"><FaEnvelope size={12} /></span>
                    <input name="lastName" value={form.lastName} onChange={handle} placeholder="Your last name" required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Email Address <span className="req">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon"><FaEnvelope size={12} /></span>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="your.email@example.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handle}>
                    <option>General Inquiry</option>
                    <option>Project Collaboration</option>
                    <option>Job Opportunity</option>
                    <option>Freelance Work</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={form.priority} onChange={handle}>
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                    <option>High Priority</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Your Message <span className="req">*</span></label>
                <div className="input-wrap textarea-wrap">
                  <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Tell me about your project, ideas, or anything you'd like to discuss..." required />
                </div>
              </div>

              <label className="newsletter-check">
                <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handle} />
                <span>Subscribe to my newsletter for updates on new projects and insights</span>
              </label>

              <motion.button type="submit" className="btn-send" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <FaPaperPlane /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
