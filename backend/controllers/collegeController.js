const CollegeInfo = require('../models/CollegeInfo');
const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Fee = require('../models/Fee');
const Facility = require('../models/Facility');
const Placement = require('../models/Placement');
const FAQ = require('../models/FAQ');

// GET /api/college
const getCollegeInfo = async (req, res) => {
  try {
    const info = await CollegeInfo.findOne();
    if (!info) {
      return res.status(404).json({ message: 'College information not found' });
    }
    res.json(info);
  } catch (error) {
    console.error('Error fetching college info:', error);
    res.status(500).json({ message: 'Server error while fetching college information' });
  }
};

// GET /api/courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error while fetching courses' });
  }
};

// GET /api/admissions
const getAdmissions = async (req, res) => {
  try {
    const admission = await Admission.findOne();
    if (!admission) {
      return res.status(404).json({ message: 'Admission details not found' });
    }
    res.json(admission);
  } catch (error) {
    console.error('Error fetching admissions:', error);
    res.status(500).json({ message: 'Server error while fetching admissions' });
  }
};

// GET /api/fees
const getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ message: 'Server error while fetching fees' });
  }
};

// GET /api/facilities
const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ message: 'Server error while fetching facilities' });
  }
};

// GET /api/placements
const getPlacements = async (req, res) => {
  try {
    const placement = await Placement.findOne();
    if (!placement) {
      return res.status(404).json({ message: 'Placement details not found' });
    }
    res.json(placement);
  } catch (error) {
    console.error('Error fetching placements:', error);
    res.status(500).json({ message: 'Server error while fetching placements' });
  }
};

// GET /api/faqs
const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ message: 'Server error while fetching FAQs' });
  }
};

module.exports = {
  getCollegeInfo,
  getCourses,
  getAdmissions,
  getFees,
  getFacilities,
  getPlacements,
  getFAQs,
};
