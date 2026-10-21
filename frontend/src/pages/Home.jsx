import React from 'react';
import {
  Bot,
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  DollarSign,
  Briefcase,
  Building,
  Home as HomeIcon,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Database,
  Server,
  Cpu,
} from 'lucide-react';

const Home = ({ setActiveTab, onPreloadQuery }) => {
  const handleQuickPrompt = (question) => {
    if (onPreloadQuery) {
      onPreloadQuery(question);
    }
    setActiveTab('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickTopics = [
    {
      title: 'Admissions & Eligibility',
      desc: 'Check cutoff criteria, JEE/CET quotas, reservation policies, and online application guidelines.',
      query: 'How can I apply for admission and what are the eligibility requirements?',
      icon: GraduationCap,
      color: '#3b82f6',
    },
    {
      title: 'Academic Programs',
      desc: 'Browse B.Tech (AI&DS, CSE, ECE, Mech), M.Tech, and MBA programs with duration and intake seats.',
      query: 'What courses and academic programs are available?',
      icon: BookOpen,
      color: '#8b5cf6',
    },
    {
      title: 'Fee Structure & Waivers',
      desc: 'Transparent annual tuition fees, installment plans, and merit scholarships up to 50%.',
      query: 'What is the fee structure and what scholarships are available?',
      icon: DollarSign,
      color: '#10b981',
    },
    {
      title: 'Placements & Careers',
      desc: '95%+ placement rate, ₹44.5 LPA highest package, 120+ top recruitment partners.',
      query: 'What are the placement statistics and top recruiting companies?',
      icon: Briefcase,
      color: '#f59e0b',
    },
    {
      title: 'Hostels & Residential Life',
      desc: 'Separate AC/Non-AC hostels for boys and girls with high-speed Wi-Fi and 24/7 security.',
      query: 'Is hostel available and what are the hostel fees and facilities?',
      icon: HomeIcon,
      color: '#ec4899',
    },
    {
      title: 'Laboratories & Facilities',
      desc: 'NVIDIA AI Supercomputing Lab, Central Digital Library with IEEE access, and Olympic Sports Arena.',
      query: 'What campus facilities, laboratories, and library resources are available?',
      icon: Building,
      color: '#06b6d4',
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Next-Generation College Guidance Platform</span>
        </div>
        <h1 className="hero-title">
          Smart Answers for Your <br />
          <span className="hero-highlight">College Journey</span>
        </h1>
        <p className="hero-subtitle">
          Welcome to Easwari Engineering College's official AI Enquiry Assistant.
          Get instant information about admissions, courses, fees, scholarships, hostel facilities,
          placements, departments and other college enquiries.
        </p>

        <div className="hero-cta-group">
          <button
            className="hero-btn-primary"
            onClick={() => { setActiveTab('chatbot'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <Bot size={20} />
            <span>Launch AI Chatbot</span>
            <ArrowRight size={18} />
          </button>
          <button
            className="hero-btn-secondary"
            onClick={() => { setActiveTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <BookOpen size={18} />
            <span>Explore Programs</span>
          </button>
        </div>

        {/* Neutral Feature Cards (Describing the Application) */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">AI Enquiry Assistant</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Multiple</span>
            <span className="stat-label">Courses & Departments</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Instant</span>
            <span className="stat-label">Enquiry Responses</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Easy</span>
            <span className="stat-label">Student Access</span>
          </div>
        </div>
      </section>

      {/* Quick Enquiries Interactive Grid */}
      <section className="home-section">
        <div className="section-header">
          <span className="section-pill">Interactive Exploration</span>
          <h2 className="section-heading">What would you like to enquire about?</h2>
          <p className="section-subtext">Click on any topic to automatically ask the AI chatbot and receive instant answers.</p>
        </div>

        <div className="topics-grid">
          {quickTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                key={index}
                className="topic-card"
                onClick={() => handleQuickPrompt(topic.query)}
              >
                <div className="topic-card-icon" style={{ backgroundColor: `${topic.color}15`, color: topic.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="topic-card-title">{topic.title}</h3>
                <p className="topic-card-desc">{topic.desc}</p>
                <div className="topic-card-action">
                  <span>Ask Chatbot</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MERN Architecture Overview (Ideal for Student Demo/Presentation) */}
      <section className="home-section mern-showcase-section">
        <div className="section-header">
          <span className="section-pill">System Architecture</span>
          <h2 className="section-heading">How This MERN Chatbot Works</h2>
          <p className="section-subtext">A truly decoupled, modern full-stack web application designed for academic excellence.</p>
        </div>

        <div className="architecture-grid">
          <div className="arch-step">
            <div className="arch-icon-box">
              <Cpu size={24} />
            </div>
            <h4>1. React Frontend</h4>
            <p>Captures student questions via a responsive, student-friendly conversational UI with React Hooks.</p>
          </div>
          <div className="arch-step">
            <div className="arch-icon-box">
              <Server size={24} />
            </div>
            <h4>2. Axios to Express API</h4>
            <p>Sends normalized HTTP POST requests to Express.js REST endpoints with CORS and JSON middleware.</p>
          </div>
          <div className="arch-step">
            <div className="arch-icon-box">
              <Sparkles size={24} />
            </div>
            <h4>3. AI Intent Processing</h4>
            <p>Backend parses keywords and maps queries into categories (Courses, Fees, Admissions, Hostels).</p>
          </div>
          <div className="arch-step">
            <div className="arch-icon-box">
              <Database size={24} />
            </div>
            <h4>4. MongoDB & Mongoose</h4>
            <p>Queries database collections and returns structured, dynamic college information back to the student.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
