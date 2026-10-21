import React, { useState, useEffect } from 'react';
import { getCollegeInfo, getFacilities } from '../services/api';
import { Building2, Award, Calendar, CheckCircle2, ShieldCheck, MapPin, Sparkles, Bot } from 'lucide-react';

const About = ({ setActiveTab }) => {
  const [college, setCollege] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const [collegeData, facilitiesData] = await Promise.all([
          getCollegeInfo().catch(() => null),
          getFacilities().catch(() => []),
        ]);
        if (collegeData) setCollege(collegeData);
        if (facilitiesData) setFacilities(facilitiesData);
      } catch (err) {
        console.error('Error loading about data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAboutData();
  }, []);

  return (
    <div className="about-page-container">
      {/* Hero / Overview */}
      <section className="about-hero">
        <div className="header-badge">
          <Building2 size={14} />
          <span>Institutional Profile</span>
        </div>
        <h1 className="about-main-title">
          {college?.collegeName || 'Easwari Engineering College'}
        </h1>
        <p className="about-lead">
          {college?.description ||
            'Easwari Engineering College is a prominent autonomous institution affiliated to Anna University, Chennai and approved by AICTE, committed to quality technical education, academic excellence, and student development.'}
        </p>

        <div className="about-highlights-ribbon">
          <div className="ribbon-item">
            <Calendar size={18} />
            <span>Established <strong>{college?.establishedYear || 1996}</strong></span>
          </div>
          <div className="ribbon-item">
            <ShieldCheck size={18} />
            <span><strong>Autonomous</strong> Institution</span>
          </div>
          <div className="ribbon-item">
            <Award size={18} />
            <span><strong>Anna University</strong> Affiliated</span>
          </div>
          <div className="ribbon-item">
            <MapPin size={18} />
            <span>Ramapuram, Chennai</span>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission-grid">
        <div className="vm-card">
          <div className="vm-badge">Our Vision</div>
          <h3>Excellence in Technical & Management Education</h3>
          <p>
            To achieve high standards in technical and management education through continuous learning,
            practical research, ethical values, and holistic student-centric development.
          </p>
        </div>
        <div className="vm-card">
          <div className="vm-badge">Our Mission</div>
          <h3>Academic Quality & Professional Skills</h3>
          <ul className="vm-list">
            <li>
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Provide robust academic curriculum supported by experienced faculty and modern laboratories.</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Encourage innovation, project-based learning, and industry-oriented technical skills.</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Foster ethical leadership, discipline, teamwork, and responsible engineering solutions.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Campus Facilities Section */}
      <section className="facilities-section">
        <div className="section-header">
          <span className="section-pill">Campus Life</span>
          <h2 className="section-heading">Campus Infrastructure & Facilities</h2>
          <p className="section-subtext">Providing a supportive environment for learning, innovation, and student life.</p>
        </div>

        <div className="facilities-grid">
          {facilities.map((fac, idx) => (
            <div key={idx} className="facility-card">
              <div className="fac-category-tag">{fac.category || 'Facility'}</div>
              <h3 className="fac-name">{fac.facilityName}</h3>
              <p className="fac-desc">{fac.description}</p>
              <div className="fac-timing-pill">
                <span>⏱️ {fac.availability}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Chatbot Banner */}
      <section className="about-cta-banner">
        <div className="cta-banner-content">
          <Sparkles size={32} className="cta-sparkle" />
          <h2>Have more questions about Easwari Engineering College?</h2>
          <p>Our AI College Enquiry Assistant can answer your specific questions in seconds.</p>
          <button
            className="cta-banner-btn"
            onClick={() => { setActiveTab('chatbot'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <Bot size={18} />
            <span>Ask Chatbot Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
