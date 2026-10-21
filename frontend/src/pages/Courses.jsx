import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';
import { BookOpen, Clock, Users, Award, Bot, Sparkles, Filter, AlertCircle, RefreshCw } from 'lucide-react';

const Courses = ({ setActiveTab, onPreloadQuery }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const fetchCoursesList = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Unable to load courses from the backend server. Please verify backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesList();
  }, []);

  const handleAskAboutCourse = (courseName) => {
    if (onPreloadQuery) {
      onPreloadQuery(`Tell me about ${courseName} course details, eligibility and fees.`);
    }
    setActiveTab('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCourses = courses.filter((course) => {
    if (selectedFilter === 'ALL') return true;
    return course.degree.toUpperCase().includes(selectedFilter);
  });

  return (
    <div className="courses-page-container">
      {/* Page Header */}
      <div className="courses-header-section">
        <div className="header-badge">
          <BookOpen size={14} />
          <span>Accredited Academic Programs</span>
        </div>
        <h1 className="courses-title">Undergraduate & Postgraduate Courses</h1>
        <p className="courses-subtitle">
          Industry-aligned curricula designed with modern engineering competencies, AI innovations,
          and management leadership.
        </p>

        {/* Filter Pills */}
        <div className="course-filter-bar">
          <span className="filter-label">
            <Filter size={15} /> Filter By Degree:
          </span>
          {['ALL', 'B.TECH', 'M.TECH', 'MBA'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter === 'ALL' ? 'All Programs' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="courses-loading-state">
          <div className="loading-spinner"></div>
          <p>Retrieving accredited courses from MongoDB database...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="courses-error-box">
          <AlertCircle size={24} className="text-red-500" />
          <p>{error}</p>
          <button onClick={fetchCoursesList} className="retry-btn">
            <RefreshCw size={15} />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Courses Cards Grid */}
      {!loading && !error && (
        <div className="courses-grid">
          {filteredCourses.length === 0 ? (
            <div className="no-courses-found">
              <p>No programs found for the selected filter.</p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div key={course._id || course.courseName} className="course-card">
                <div className="course-card-top">
                  <span className="degree-tag">{course.degree}</span>
                  <span className="seats-tag">
                    <Users size={12} /> {course.intakeSeats} Seats
                  </span>
                </div>

                <h3 className="course-name">{course.courseName}</h3>
                <p className="course-dept">{course.department}</p>

                <p className="course-description">{course.description}</p>

                <div className="course-meta-box">
                  <div className="meta-item">
                    <Clock size={14} className="meta-icon" />
                    <span><strong>Duration:</strong> {course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Award size={14} className="meta-icon" />
                    <span><strong>Eligibility:</strong> {course.eligibility}</span>
                  </div>
                </div>

                <div className="course-card-footer">
                  <button
                    className="ask-course-btn"
                    onClick={() => handleAskAboutCourse(course.courseName)}
                  >
                    <Bot size={16} />
                    <span>Ask AI About This Course</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
