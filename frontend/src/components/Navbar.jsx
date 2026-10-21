import React, { useState } from 'react';
import { Bot, GraduationCap, Menu, X, Sparkles, BookOpen, Building2, PhoneCall, Home } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chatbot', label: 'AI Chatbot', icon: Bot, highlight: true },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'about', label: 'About College', icon: Building2 },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand Logo & Name */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-logo-wrapper">
            <GraduationCap className="brand-icon" size={28} />
            <div className="status-dot"></div>
          </div>
          <div className="brand-text">
            <span className="brand-title">Easwari Engineering College</span>
            <span className="brand-subtitle">AI College Enquiry Assistant</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''} ${item.highlight ? 'nav-link-highlight' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.highlight && <span className="ai-badge"><Sparkles size={12} /> AI</span>}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <button
            className="action-btn"
            onClick={() => handleNavClick('chatbot')}
          >
            <Bot size={18} />
            <span>Ask Chatbot</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.highlight && <span className="ai-badge">AI Assistant</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
