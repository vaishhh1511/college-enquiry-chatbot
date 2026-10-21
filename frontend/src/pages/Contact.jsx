import React, { useState, useEffect } from 'react';
import { getCollegeInfo } from '../services/api';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Bot, Globe, ShieldCheck } from 'lucide-react';

const Contact = ({ setActiveTab }) => {
  const [college, setCollege] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', query: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getCollegeInfo()
      .then((data) => setCollege(data))
      .catch((err) => console.error('Error fetching contact info:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.query) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', query: '' });
    }, 4000);
  };

  return (
    <div className="contact-page-container">
      {/* Header */}
      <div className="contact-header-section">
        <div className="header-badge">
          <Phone size={14} />
          <span>Connect With Us</span>
        </div>
        <h1 className="contact-title">Contact & Campus Admissions Help Desk</h1>
        <p className="contact-subtitle">
          We welcome prospective scholars, parents, recruiters, and alumni. Reach out through any
          of our communication channels or ask our 24/7 AI chatbot.
        </p>
      </div>

      <div className="contact-layout-grid">
        {/* Contact Information Cards */}
        <div className="contact-cards-col">
          <div className="contact-card">
            <div className="contact-card-icon phone-icon">
              <Phone size={22} />
            </div>
            <div className="contact-card-text">
              <h4>Admissions & General Helplines</h4>
              <p className="primary-text">{college?.phone || '+91 44 4392 3041 / +91 44 4392 3042'}</p>
              <p className="sub-text">Campus Admissions Desk: +91 44 4392 3041</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon mail-icon">
              <Mail size={22} />
            </div>
            <div className="contact-card-text">
              <h4>Email Communications</h4>
              <p className="primary-text">{college?.email || 'admissions@eec.srmrmp.edu.in'}</p>
              <p className="sub-text">General enquiries: info@eec.srmrmp.edu.in</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon map-icon">
              <MapPin size={22} />
            </div>
            <div className="contact-card-text">
              <h4>Campus Location</h4>
              <p className="primary-text">
                {college?.address || 'Bharathi Salai, Ramapuram, Chennai - 600089, Tamil Nadu'}
              </p>
              <p className="sub-text">Location: Ramapuram campus, Chennai</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon clock-icon">
              <Clock size={22} />
            </div>
            <div className="contact-card-text">
              <h4>Administrative Office Timings</h4>
              <p className="primary-text">
                {college?.campusTimings || 'Monday to Saturday: 9:00 AM - 5:00 PM'}
              </p>
              <p className="sub-text">Campus remains closed on Sundays & National Gazetted Holidays</p>
            </div>
          </div>

          {/* Quick Chatbot Banner */}
          <div className="contact-bot-card">
            <Bot size={28} className="text-blue-400" />
            <div>
              <h4>Need an instant answer?</h4>
              <p>Skip the email wait. Our AI Chatbot is available 24/7 with immediate answers.</p>
            </div>
            <button
              onClick={() => { setActiveTab('chatbot'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="contact-bot-btn"
            >
              Ask Bot
            </button>
          </div>
        </div>

        {/* Query Submission Form */}
        <div className="contact-form-card">
          <h3 className="form-card-title">Send Us an Enquiry Message</h3>
          <p className="form-card-desc">
            Fill in your details and our admission counselling team will respond within 24 business hours.
          </p>

          {submitted ? (
            <div className="form-success-box">
              <CheckCircle size={36} className="text-emerald-500" />
              <h4>Message Dispatched Successfully!</h4>
              <p>Thank you for reaching out. Our admissions counselor will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="enquiry-form">
              <div className="form-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Enquiry Question / Comments *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please specify your query regarding admissions, course eligibility, hostel, etc."
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                />
              </div>

              <button type="submit" className="form-submit-btn">
                <span>Submit Enquiry</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
