import React from 'react';
import {
  GraduationCap,
  BookOpen,
  DollarSign,
  Briefcase,
  Building,
  Home,
  Phone,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

const SuggestedQuestions = ({ onSelectQuestion, customSuggestions = [] }) => {
  // Section 19 requirement: Popular Enquiries
  const popularCategories = [
    { label: 'Admissions', query: 'How can I apply for admission and what is the process?', icon: GraduationCap },
    { label: 'Courses', query: 'What courses and academic programs are available?', icon: BookOpen },
    { label: 'Fees', query: 'What is the fee structure for courses?', icon: DollarSign },
    { label: 'Placements', query: 'What placement opportunities and packages are available?', icon: Briefcase },
    { label: 'Facilities', query: 'What campus facilities and laboratories are available?', icon: Building },
    { label: 'Hostel', query: 'Is hostel available and what are the hostel fees?', icon: Home },
    { label: 'Contact', query: 'How can I contact the college and where is it located?', icon: Phone },
  ];

  // Default suggested quick questions if no custom suggestions are passed
  const defaultQuestions = [
    'What courses are available?',
    'How can I apply for admission?',
    'What are the eligibility requirements?',
    'What is the fee structure?',
    'What departments are available?',
    'Is hostel available?',
    'What placement information is available?',
    'How can I contact the college?',
  ];

  const questionsToDisplay =
    customSuggestions && customSuggestions.length > 0 ? customSuggestions : defaultQuestions;

  return (
    <div className="enquiries-container">
      {/* 1. Popular Enquiries Section (Section 19) */}
      <div className="popular-enquiries-box">
        <div className="section-title-row">
          <Sparkles size={16} className="title-icon" />
          <span className="section-title">Popular Enquiries</span>
        </div>
        <div className="popular-buttons-grid">
          {popularCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                className="category-pill-btn"
                onClick={() => onSelectQuestion(cat.query)}
                title={`Ask about ${cat.label}`}
              >
                <Icon size={14} className="cat-icon" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Suggested Questions Chips */}
      <div className="suggested-questions-box">
        <div className="section-title-row">
          <HelpCircle size={15} className="title-icon-subtle" />
          <span className="section-subtitle">Suggested Questions:</span>
        </div>
        <div className="suggested-chips-scroll">
          {questionsToDisplay.map((q, idx) => (
            <button
              key={idx}
              className="suggestion-chip"
              onClick={() => onSelectQuestion(q)}
            >
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
