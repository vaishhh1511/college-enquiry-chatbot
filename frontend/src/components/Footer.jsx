import React from 'react';
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <GraduationCap className="footer-brand-icon" size={26} />
              <div>
                <span className="footer-brand-title">Easwari Engineering College</span>
                <p className="footer-brand-tagline">Autonomous Institution • Approved by AICTE • Affiliated to Anna University</p>
              </div>
            </div>
            <p className="footer-desc">
              Empowering students, parents, and visitors with instant AI-driven answers to all admissions, academic,
              placement, and campus enquiries.
            </p>
            <div className="footer-accreditations">
              <span className="badge"><ShieldCheck size={14} /> Autonomous</span>
              <span className="badge"><ShieldCheck size={14} /> AICTE Approved</span>
              <span className="badge"><ShieldCheck size={14} /> Anna University</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Campus Home
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('chatbot'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  AI Enquiry Chatbot
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Academic Programs
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  About College
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Campus Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Enquiries & Support */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">Help Desk & Enquiries</h4>
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>+91 44 4392 3041 / 4392 3042</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>admissions@eec.srmrmp.edu.in</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Bharathi Salai, Ramapuram, Chennai - 600089, Tamil Nadu</span>
            </div>
            <p className="footer-timings">
              ⏰ Office Hours: Mon - Sat: 9:00 AM - 5:00 PM
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Easwari Engineering College AI Enquiry Portal. Built with MERN Stack.</p>
          <p className="footer-tech-tag">React.js • Express.js • Node.js • MongoDB • Mongoose</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
